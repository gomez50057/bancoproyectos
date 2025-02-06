// Archivo: src/pages/Responsible/CRUDTable.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Tooltip } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import { getCsrfToken } from '../../../utils';
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
        alert("No se pudieron cargar los proyectos. Intenta nuevamente.");
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
    const newTab = window.open(reportUrl, '_blank');

    if (!newTab) {
      alert("El reporte no pudo abrirse. Habilita las ventanas emergentes.");
    }
  }, []);

  const handleViewReactReport = useCallback((projectId) => {
    if (!projectId) {
      alert("Error: ID del proyecto no encontrado.");
      return;
    }
    navigate(`/project-report-react/${projectId}`);
  }, [navigate]);


  const renderTruncatedText = (value) => (
    <div className="truncate-text" title={value || "N/A"}>{value || "N/A"}</div>
  );

  const exportToXLSX = () => {
    if (projects.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }
  
    // Mapeamos los datos para exportar solo las columnas necesarias
    const ws = XLSX.utils.json_to_sheet(projects.map(project => ({
      "Usuario": project.user || "N/A",
      "ID del Proyecto": project.project_id || "N/A",
      
      "Área de Adscripción": project.area_adscripcion || "N/A",
      "Nombre del Registrante": project.nombre_registrante || "N/A",
      "Apellido Paterno": project.apellido_paterno || "N/A",
      "Apellido Materno": project.apellido_materno || "N/A",
      "Correo Electrónico": project.correo || "N/A",
      "Teléfono": project.telefono || "N/A",
      "Extensión Telefónica": project.telefono_ext || "N/A",
  
      "Fecha de Registro": project.fecha_registro || "N/A",
      "Nombre del Proyecto": project.nombre_proyecto || "N/A",
      "Sector": project.sector || "N/A",
      "Tipo de Proyecto": project.tipo_proyecto || "N/A",
      "Tipo de Entidad": project.tipo_entidad || "N/A",
      "Dependencia": project.dependencia || "N/A",
      "Organismo": project.organismo || "N/A",
      "Municipio o Ayuntamiento": project.municipio_ayuntamiento || "N/A",
      "Unidad Responsable": project.unidad_responsable || "N/A",
      "Unidad Presupuestal": project.unidad_presupuestal || "N/A",
      
      "Inversión Federal": project.inversion_federal || "N/A",
      "Inversión Estatal": project.inversion_estatal || "N/A",
      "Inversión Municipal": project.inversion_municipal || "N/A",
      "Inversión de Otros": project.inversion_otros || "N/A",
      "Inversión Total": project.inversion_total || "N/A",
      
      "Ramo Presupuestal": project.ramo_presupuestal || "N/A",
      "Descripción": project.descripcion || "N/A",
      "Situación Sin Proyecto": project.situacion_sin_proyecto || "N/A",
      "Objetivos": project.objetivos || "N/A",
      "Metas": project.metas || "N/A",
      "Gasto Programable": project.gasto_programable || "N/A",
      "Tiempo de Ejecución (meses)": project.tiempo_ejecucion || "N/A",
      "Modalidad de Ejecución": project.modalidad_ejecucion || "N/A",
      "Programa Presupuestario": project.programa_presupuestario || "N/A",
      "Beneficiarios": project.beneficiarios || "N/A",
      "Normativa Aplicable": project.normativa_aplicable || "N/A",
      
      "Región": project.region || "N/A",
      "Municipio": project.municipio || "N/A",
      "Localidad": project.localidad || "N/A",
      "Barrio o Colonia": project.barrio_colonia || "N/A",
      "Latitud": project.latitud || "N/A",
      "Longitud": project.longitud || "N/A",
      "Municipio de Impacto": project.municipio_impacto || "N/A",
      
      "Plan Nacional": project.plan_nacional || "N/A",
      "Plan Estatal": project.plan_estatal || "N/A",
      "Plan Municipal": project.plan_municipal || "N/A",
      "Acuerdos Transversales": project.acuerdos_transversales || "N/A",
      "Objetivos de Desarrollo Sostenible (ODS)": project.ods || "N/A",
      "Programas SIE": project.programas_SIE || "N/A",
      "Indicadores Estratégicos": project.indicadores_estrategicos || "N/A",
      
      "Situación Actual": project.situacion_actual || "N/A",
      "Expediente Técnico": project.expediente_tecnico || "N/A",
      "Estudios de Factibilidad": project.estudios_factibilidad || "N/A",
      "Análisis de Alternativas": project.analisis_alternativas || "N/A",
      "Validación Normativa": project.validacion_normativa || "N/A",
      "Liberación de Derecho de Vía": project.liberacion_derecho_via || "N/A",
      "Análisis Costo-Beneficio": project.analisis_costo_beneficio || "N/A",
      "Proyecto Ejecutivo": project.proyecto_ejecutivo || "N/A",
      "Manifestación de Impacto Ambiental": project.manifestacion_impacto_ambiental || "N/A",
      "Render": project.render || "N/A",
      "Otros Estudios": project.otros_estudios || "N/A",
      
      "Observaciones": project.observaciones || "N/A",
      "Porcentaje de Avance": project.porcentaje_avance || "N/A",
      "Estatus": project.estatus || "N/A",
      "Situación": project.situacion || "N/A",
      "Retroalimentación": project.retroalimentacion || "N/A"
  })));
  
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Proyectos");
  
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'proyectos.xlsx');
  };
  

  const columns = [
    { name: "project_id", options: { display: false } },
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
    { name: "Inversion Federal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Inversion Estatal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Inversion Municipal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Inversion Otros", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Inversión Total", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Descripción", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Situación Sin Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Objetivos", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Tiempo de Ejecución", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Modalidad de Ejecución", options: { display: true, customBodyRender: renderTruncatedText } },
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
          if (!tableMeta.rowData || tableMeta.rowData.length < 2) return <span>Error</span>;

          const projectId = tableMeta.rowData[1] || "N/A";
          const project = projects.find(p => p.project_id === projectId);

          return (
            <div className="Acciones-con">
              <button className="crud-button" onClick={() => handleOpen(project)}>Editar</button>
              {/* <button className="crud-button" onClick={() => handleGenerateReport(projectId)}>Reporte</button> */}
              <button className="crud-button" onClick={() => handleViewReactReport(projectId)}>Ficha</button>
            </div>
          );
        }
      }
    }
  ];

  const options = {
    download: false,
    selectableRows: 'none',
    stickyHeader: true,
    customToolbar: () => (
      <Tooltip title="Descargar XLSX" arrow>
        <IconButton onClick={exportToXLSX}>
        <DownloadIcon sx={{ color: '#dec9a3' }} />
        </IconButton>
      </Tooltip>
    ),
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
        // downloadCsv: "Descargar CSV",
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
  }  

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
        {projects.length > 0 ? (  // ✅ Asegura que haya datos antes de renderizar la tabla
          <MUIDataTable
            title={<Typography variant="h3">Proyectos Registrados</Typography>}
            data={projects.map(project => [
              project.id || "N/A",
              project.project_id || "N/A",
              project.fecha_registro || "N/A",
              project.nombre_proyecto || "N/A",
              project.sector || "N/A",
              project.tipo_proyecto || "N/A",
            ])}
            columns={columns}
            options={options}
          />
        ) : (
          <Typography variant="h6" align="center">Cargando proyectos...</Typography>
        )}
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
