import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
    { name: "id", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "project_id", label: "Project ID", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Fecha Registro", options: { display: true, customBodyRender: renderTruncatedText } },
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
    { name: "Porcentaje Avance", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Estatus", options: { display: true, customBodyRender: renderTruncatedText } },
    { name: "Situación", options: { display: true, customBodyRender: renderTruncatedText } },
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
            project.project_id, // Añadido project_id
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
        <DialogContent style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
          {Object.keys(currentProject).map(key => (
            key !== 'estatus' && key !== 'situacion' ? (
              <TextField
                key={key}
                margin="dense"
                label={key.replace('_', ' ')}
                type="text"
                fullWidth
                name={key}
                value={currentProject[key] || ''}
                onChange={handleChange}
                className={key}
              />
            ) : (
              key === 'estatus' ? (
                <FormControl key={key} fullWidth margin="dense">
                  <InputLabel>Estatus</InputLabel>
                  <Select
                    name="estatus"
                    value={currentProject.estatus || ''}
                    onChange={handleChange}
                  >
                    <MenuItem value="Atendido">Atendido</MenuItem>
                    <MenuItem value="En Proceso">En Proceso</MenuItem>
                    <MenuItem value="Sin Avance">Sin Avance</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl key={key} fullWidth margin="dense">
                  <InputLabel>Situación</InputLabel>
                  <Select
                    name="situacion"
                    value={currentProject.situacion || ''}
                    onChange={handleChange}
                  >
                    <MenuItem value="Vigente">Vigente</MenuItem>
                    <MenuItem value="Antecedente">Antecedente</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                  </Select>
                </FormControl>
              )
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
