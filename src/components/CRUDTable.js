// CRUDTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { getCsrfToken } from '../utils'; // Importa la función desde utils.js

const CRUDTable = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleOpen = (project = {}) => {
    setCurrentProject(project);
    setIsEditMode(Boolean(project.id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProject({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const handleSubmit = async () => {
    const csrfToken = getCsrfToken();
    try {
      if (isEditMode) {
        await axios.put(`/proyecto/${currentProject.id}/`, currentProject, {
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
  };

  const handleDelete = async (id) => {
    const csrfToken = getCsrfToken();
    try {
      await axios.delete(`/proyecto/${id}/`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const response = await axios.get('/ver-proyectos-tabla/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const columns = [
    { name: "Fecha Registro", options: { display: true } },
    { name: "Nombre del Proyecto", options: { display: true } },
    { name: "Sector", options: { display: true } },
    { name: "Tipo de Proyecto", options: { display: true } },
    { name: "Tipo de Entidad", options: { display: true } },
    { name: "Dependencia", options: { display: true } },
    { name: "Organismo", options: { display: true } },
    { name: "Municipio End", options: { display: true } },
    { name: "Petición Personal", options: { display: true } },
    { name: "Unidad Responsable", options: { display: true } },
    { name: "Unidad Presupuestal", options: { display: true } },
    { name: "Ramo Presupuestal", options: { display: true } },
    { name: "Monto Federal", options: { display: true } },
    { name: "Monto Estatal", options: { display: true } },
    { name: "Monto Municipal", options: { display: true } },
    { name: "Monto Otros", options: { display: true } },
    { name: "Inversión Estimada", options: { display: true } },
    { name: "Descripción", options: { display: true } },
    { name: "Situación Sin Proyecto", options: { display: true } },
    { name: "Objetivos", options: { display: true } },
    { name: "Metas", options: { display: true } },
    { name: "Gasto Programable", options: { display: true } },
    { name: "Programa Presupuestario", options: { display: true } },
    { name: "Beneficiarios", options: { display: true } },
    { name: "Alineación Normativa", options: { display: true } },
    { name: "Región", options: { display: true } },
    { name: "Municipio", options: { display: true } },
    { name: "Municipio Impacto", options: { display: true } },
    { name: "Localidad", options: { display: true } },
    { name: "Barrio/Colonia/Ejido", options: { display: true } },
    { name: "Latitud", options: { display: true } },
    { name: "Longitud", options: { display: true } },
    { name: "Plan Nacional", options: { display: true } },
    { name: "Plan Estatal", options: { display: true } },
    { name: "Plan Municipal", options: { display: true } },
    { name: "ODS", options: { display: true } },
    { name: "Plan Sectorial", options: { display: true } },
    { name: "Indicadores Estratégicos", options: { display: true } },
    { name: "Indicadores Tácticos", options: { display: true } },
    { name: "Indicadores de Desempeño", options: { display: true } },
    { name: "Indicadores de Rentabilidad", options: { display: true } },
    { name: "Estado Inicial", options: { display: true } },
    { name: "Estado con Proyecto", options: { display: true } },
    { name: "Estudios Prospectivos", options: { display: false } },
    { name: "Estudios de Factibilidad", options: { display: false } },
    { name: "Análisis de Alternativas", options: { display: false } },
    { name: "Validación Normativa", options: { display: false } },
    { name: "Liberación de Derecho de Vía", options: { display: false } },
    { name: "Situación sin Proyecto Fotográfico", options: { display: false } },
    { name: "Situación con Proyecto Proyección", options: { display: false } },
    { name: "Análisis Costo Beneficio", options: { display: false } },
    { name: "Expediente Técnico", options: { display: false } },
    { name: "Proyecto Ejecutivo", options: { display: false } },
    { name: "Manifestación de Impacto Ambiental", options: { display: false } },
    { name: "Otros Estudios", options: { display: false } },
    { name: "Observaciones", options: { display: true } },
    {
      name: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const projectId = tableMeta.rowData[0];
          return (
            <>
              <Button onClick={() => handleOpen(projects.find(p => p.id === projectId))}>Editar</Button>
              <Button onClick={() => handleDelete(projectId)}>Eliminar</Button>
            </>
          );
        }
      }
    }
  ];

  const options = {
    selectableRows: false,
    setRowProps: (row, dataIndex) => ({
      style: {
        backgroundColor: dataIndex % 2 === 0 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(240, 240, 240, 0.8)',
        backdropFilter: 'blur(5px)',
        margin: '5px 0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: dataIndex % 2 === 0 ? 'rgba(230, 230, 230, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        },
      },
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
              backgroundColor: '#f2f2f2',
              textAlign: 'center',
            },
          },
        },
        MUIDataTableToolbar: {
          styleOverrides: {
            root: {
              marginBottom: '10px',
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
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
              },
            },
          },
        },
      },
    });

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <CssBaseline />
      <div className="table_grid">
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Agregar Proyecto
        </Button>
        <MUIDataTable
          title={"Lista de proyectos"}
          data={projects.map(project => [
            project.id,
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
            project.observaciones,
          ])}
          columns={columns}
          options={options}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode ? 'Editar Proyecto' : 'Agregar Proyecto'}</DialogTitle>
        <DialogContent>
          {Object.keys(currentProject).map(key => (
            <TextField
              key={key}
              margin="dense"
              label={key.replace('_', ' ')}
              type="text"
              fullWidth
              name={key}
              value={currentProject[key] || ''}
              onChange={handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditMode ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CRUDTable;
