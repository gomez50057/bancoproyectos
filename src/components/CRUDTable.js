import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getCsrfToken } from '../utils'; 
import './CRUDTable.css'; 

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

  const renderTruncatedText = (value) => (
    <Tooltip title={value} placement="top">
      <span className="truncate-text">{value}</span>
    </Tooltip>
  );

  const columns = [
    { name: "id", label: "ID", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "fecha_registro", label: "Fecha Registro", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "project_name", label: "Nombre del Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "sector", label: "Sector", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "tipo_proyecto", label: "Tipo de Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "tipo_entidad", label: "Tipo de Entidad", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "dependencia", label: "Dependencia", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "organismo", label: "Organismo", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "municipioEnd", label: "Municipio End", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "peticion_personal", label: "Petición Personal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "unidad_responsable", label: "Unidad Responsable", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "unidad_presupuestal", label: "Unidad Presupuestal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "ramo_presupuestal", label: "Ramo Presupuestal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "monto_federal", label: "Monto Federal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "monto_estatal", label: "Monto Estatal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "monto_municipal", label: "Monto Municipal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "monto_otros", label: "Monto Otros", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "inversion_estimada", label: "Inversión Estimada", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "descripcion", label: "Descripción", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "situacion_sin_proyecto", label: "Situación Sin Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "objetivos", label: "Objetivos", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "metas", label: "Metas", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "gasto_programable", label: "Gasto Programable", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "programa_presupuestario", label: "Programa Presupuestario", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "beneficiarios", label: "Beneficiarios", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "alineacion_normativa", label: "Alineación Normativa", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "region", label: "Región", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "municipio", label: "Municipio", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "municipio_impacto", label: "Municipio Impacto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "localidad", label: "Localidad", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "barrio_colonia_ejido", label: "Barrio/Colonia/Ejido", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "latitud", label: "Latitud", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "longitud", label: "Longitud", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "plan_nacional", label: "Plan Nacional", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "plan_estatal", label: "Plan Estatal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "plan_municipal", label: "Plan Municipal", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "ods", label: "ODS", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "plan_sectorial", label: "Plan Sectorial", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "indicadores_estrategicos", label: "Indicadores Estratégicos", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "indicadores_tacticos", label: "Indicadores Tácticos", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "indicadores_desempeno", label: "Indicadores de Desempeño", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "indicadores_rentabilidad", label: "Indicadores de Rentabilidad", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "estado_inicial", label: "Estado Inicial", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "estado_con_proyecto", label: "Estado con Proyecto", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "estudios_prospectivos", label: "Estudios Prospectivos", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "estudios_factibilidad", label: "Estudios de Factibilidad", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "analisis_alternativas", label: "Análisis de Alternativas", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "validacion_normativa", label: "Validación Normativa", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "liberacion_derecho_via", label: "Liberación de Derecho de Vía", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "situacion_sin_proyecto_fotografico", label: "Situación sin Proyecto Fotográfico", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "situacion_con_proyecto_proyeccion", label: "Situación con Proyecto Proyección", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "analisis_costo_beneficio", label: "Análisis Costo Beneficio", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "expediente_tecnico", label: "Expediente Técnico", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "proyecto_ejecutivo", label: "Proyecto Ejecutivo", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "manifestacion_impacto_ambiental", label: "Manifestación de Impacto Ambiental", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "otros_estudios", label: "Otros Estudios", options: { display: false, customBodyRender: renderTruncatedText } },
    { name: "observaciones", label: "Observaciones", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "porcentaje_avance", label: "Porcentaje Avance", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "estatus", label: "Estatus", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "situacion", label: "Situación", options: { display: true, customBodyRender: renderTruncatedText } },
    {
      name: "acciones",
      label: "Acciones",
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
            project.porcentaje_avance,
            project.estatus,
            project.situacion,
          ])}
          columns={columns}
          options={options}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode ? 'Editar Proyecto' : 'Agregar Proyecto'}</DialogTitle>
        <DialogContent>
          {Object.keys(currentProject).map(key => (
            key === "estatus" || key === "situacion" ? (
              <FormControl key={key} margin="dense" fullWidth>
                <InputLabel>{key.replace('_', ' ')}</InputLabel>
                <Select
                  name={key}
                  value={currentProject[key] || ''}
                  onChange={handleChange}
                >
                  {key === "estatus" ? (
                    <>
                      <MenuItem value="Atendido">Atendido</MenuItem>
                      <MenuItem value="En Proceso">En Proceso</MenuItem>
                      <MenuItem value="Sin Avance">Sin Avance</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem value="Vigente">Vigente</MenuItem>
                      <MenuItem value="Antecedente">Antecedente</MenuItem>
                      <MenuItem value="Cancelado">Cancelado</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            ) : (
              <TextField
                key={key}
                margin="dense"
                label={key.replace('_', ' ')}
                type="text"
                fullWidth
                name={key}
                value={currentProject[key] || ''}
                onChange={handleChange}
                className="truncate-text"
              />
            )
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
