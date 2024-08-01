// Archivo: src/pages/Responsible/CRUDTable.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import { getCsrfToken } from '../../utils';
import ProjectDialog from './ProjectDialog';
import './CRUDTable.css';
import { useNavigate } from 'react-router-dom';

const CRUDTable = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/ver-proyectos-tabla/');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleOpen = useCallback((project = {}) => {
    setCurrentProject(project);
    setIsEditMode(Boolean(project.project_id));
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCurrentProject({});
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentProject((prevProject) => ({ ...prevProject, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const csrfToken = getCsrfToken();
    try {
      if (isEditMode) {
        await axios.put(`/proyecto/${currentProject.project_id}/`, currentProject, { 
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
      } else {
        await axios.post('/proyecto/', currentProject, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
      }
      const response = await axios.get('/ver-proyectos-tabla/');
      setProjects(response.data);
      handleClose();
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  }, [isEditMode, currentProject, handleClose]);

  const handleGenerateReport = useCallback((project_id) => {
    const reportUrl = `/proyecto/reporte/${project_id}/`;
    window.open(reportUrl, '_blank');
  }, []);

  const handleViewReactReport = useCallback((projectId) => {
    navigate(`/project-report-react/${projectId}`);
  }, [navigate]);

  const renderTruncatedText = (value) => (
    <div className="truncate-text" title={value}>{value}</div>
  );

  const columns = [
    { name: "project_id", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "Id del Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Fecha del Registro", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Nombre del Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Sector", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Tipo de Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Tipo de Entidad", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Dependencia", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Organismo", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Municipio End", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Petición Personal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Unidad Responsable", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Unidad Presupuestal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Ramo Presupuestal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Monto Federal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Monto Estatal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Monto Municipal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Monto Otros", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Inversión Estimada", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Descripción", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Situación Sin Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Objetivos", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Metas", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Gasto Programable", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Programa Presupuestario", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Beneficiarios", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Alineación Normativa", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Región", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Municipio", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Municipio Impacto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Localidad", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Barrio/Colonia/Ejido", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Latitud", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Longitud", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Plan Nacional", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Plan Estatal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Plan Municipal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "ODS", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Plan Sectorial", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Indicadores Estratégicos", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Indicadores Tácticos", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Indicadores de Desempeño", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Indicadores de Rentabilidad", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Estado Inicial", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Estado con Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Observaciones", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Porcentaje Avance", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Estatus", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Situación", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Retroalimentación", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Usuario", options: { display: true, customBodyRender: renderTruncatedText } },
    {
      name: "Acciones",
      options: {
        setCellProps: () => ({ className: 'sticky-column' }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const projectId = tableMeta.rowData[1];
          const project = projects.find(p => p.project_id === projectId);
          return (
            <div className="Acciones-con">
              <button className="crud-button" onClick={() => handleOpen(project)}>Editar</button>
              <button className="crud-button" onClick={() => handleGenerateReport(projectId)}>Reporte</button>
              <button className="crud-button" onClick={() => handleViewReactReport(projectId)}>Ficha</button>
            </div>
          );
        }
      }
    }
  ];

  const options = {
    selectableRows: 'none',
    stickyHeader: true,  // Habilitar stickyHeader
    setRowProps: (row, dataIndex) => ({
      className: dataIndex % 2 === 0 ? 'table_row_even' : 'table_row_odd',
      classNameHover: 'table_row_hover'
    }),
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    }
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              padding: '8px 16px',
              '&:nth-of-type(1)': {
                fontWeight: 600,
                textAlign: 'left',
              },
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              fontWeight: 600,
              backgroundColor: 'none',
              textAlign: 'center',
              '&.sticky-column': { // Fijar la cabecera de la columna de acciones
                position: 'sticky',
                right: 0,
                zIndex: 1,
              },
            },
          },
        },
        MUIDataTableToolbar: {
          styleOverrides: {
            root: {
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '40px',
              background: 'linear-gradient(to left, #A02142, #691B32)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
            },
            icon: {
              color: '#DEC9A3',
            },
          },
        },
        MUIDataTable: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
            },
            paper: {
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              margin: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(5px)',
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              '&:hover': {
                backgroundColor: 'rgba(230, 230, 230) !important',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.9)',
              },
              '& .MUIDataTableBodyCell-root:last-child:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
              '& .sticky-column': { // Fijar la columna de acciones
                position: 'sticky',
                right: 0,
                zIndex: 1,
              },
            },
          },
        },
        MuiTypography: {
          styleOverrides: {
            h3: {
              fontWeight: 600,
              fontSize: '3.25rem',
              color: '#DEC9A3',
              fontFamily: "Montserrat",
              padding: '10px'
            },
          },
        },
      },
    });

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <CssBaseline />
      <div className="table_grid">
        <MUIDataTable
          title={<Typography variant="h3">Proyectos Registrados</Typography>}
          data={projects.map(project => [
            project.id,
            project.project_id,
            project.fecha_registro,
            project.project_name,
            project.sector,
            project.tipo_proyecto,
            project.tipo_entidad,
            project.dependencia,
            project.organismo,
            project.municipioEnd,
            project.peticion_personal,
            project.unidad_responsable,
            project.unidad_presupuestal,
            project.ramo_presupuestal,
            project.monto_federal,
            project.monto_estatal,
            project.monto_municipal,
            project.monto_otros,
            project.inversion_estimada,
            project.descripcion,
            project.situacion_sin_proyecto,
            project.objetivos,
            project.metas,
            project.gasto_programable,
            project.programa_presupuestario,
            project.beneficiarios,
            project.alineacion_normativa,
            project.region,
            project.municipio,
            project.municipio_impacto,
            project.localidad,
            project.barrio_colonia_ejido,
            project.latitud,
            project.longitud,
            project.plan_nacional,
            project.plan_estatal,
            project.plan_municipal,
            project.ods,
            project.plan_sectorial,
            project.indicadores_estrategicos,
            project.indicadores_tacticos,
            project.indicadores_desempeno,
            project.indicadores_rentabilidad,
            project.estado_inicial,
            project.estado_con_proyecto,
            project.observaciones,
            project.porcentaje_avance,
            project.estatus,
            project.situacion,
            project.retroalimentacion,
            project.user__username,
            project.estudios_prospectivos,
            project.estudios_factibilidad,
            project.analisis_alternativas,
            project.validacion_normativa,
            project.liberacion_derecho_via,
            project.situacion_sin_proyecto_fotografico,
            project.situacion_con_proyecto_proyeccion,
            project.analisis_costo_beneficio,
            project.expediente_tecnico,
            project.proyecto_ejecutivo,
            project.manifestacion_impacto_ambiental,
            project.otros_estudios,
          ])}
          columns={columns}
          options={options}
        />
      </div>
      <ProjectDialog
        open={open}
        onClose={handleClose}
        project={currentProject}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
      />
    </ThemeProvider>
  );
};

export default CRUDTable;
