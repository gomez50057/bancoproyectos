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
      // Refresca la lista de proyectos
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
      // Refresca la lista de proyectos
      const response = await axios.get('/ver-proyectos-tabla/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const columns = [
    { name: "id", options: { display: false } },
    { name: "fecha_registro", options: { display: true } },
    { name: "project_name", options: { display: true } },
    { name: "sector", options: { display: true } },
    { name: "tipo_proyecto", options: { display: true } },
    { name: "tipo_entidad", options: { display: true } },
    { name: "dependencia", options: { display: true } },
    { name: "organismo", options: { display: true } },
    { name: "municipioEnd", options: { display: true } },
    { name: "peticion_personal", options: { display: true } },
    { name: "unidad_responsable", options: { display: true } },
    { name: "unidad_presupuestal", options: { display: true } },
    { name: "ramo_presupuestal", options: { display: true } },
    { name: "monto_federal", options: { display: true } },
    { name: "monto_estatal", options: { display: true } },
    { name: "monto_municipal", options: { display: true } },
    { name: "monto_otros", options: { display: true } },
    { name: "inversion_estimada", options: { display: true } },
    { name: "descripcion", options: { display: true } },
    { name: "situacion_sin_proyecto", options: { display: true } },
    { name: "objetivos", options: { display: true } },
    { name: "metas", options: { display: true } },
    { name: "gasto_programable", options: { display: true } },
    { name: "programa_presupuestario", options: { display: true } },
    { name: "beneficiarios", options: { display: true } },
    { name: "alineacion_normativa", options: { display: true } },
    { name: "region", options: { display: true } },
    { name: "municipio", options: { display: true } },
    { name: "municipio_impacto", options: { display: true } },
    { name: "localidad", options: { display: true } },
    { name: "barrio_colonia_ejido", options: { display: true } },
    { name: "latitud", options: { display: true } },
    { name: "longitud", options: { display: true } },
    { name: "plan_nacional", options: { display: true } },
    { name: "plan_estatal", options: { display: true } },
    { name: "plan_municipal", options: { display: true } },
    { name: "ods", options: { display: true } },
    { name: "plan_sectorial", options: { display: true } },
    { name: "indicadores_estrategicos", options: { display: true } },
    { name: "indicadores_tacticos", options: { display: true } },
    { name: "indicadores_desempeno", options: { display: true } },
    { name: "indicadores_rentabilidad", options: { display: true } },
    { name: "estado_inicial", options: { display: true } },
    { name: "estado_con_proyecto", options: { display: true } },
    { name: "estudios_prospectivos", options: { display: false } },
    { name: "estudios_factibilidad", options: { display: false } },
    { name: "analisis_alternativas", options: { display: false } },
    { name: "validacion_normativa", options: { display: false } },
    { name: "liberacion_derecho_via", options: { display: false } },
    { name: "situacion_sin_proyecto_fotografico", options: { display: false } },
    { name: "situacion_con_proyecto_proyeccion", options: { display: false } },
    { name: "analisis_costo_beneficio", options: { display: false } },
    { name: "expediente_tecnico", options: { display: false } },
    { name: "proyecto_ejecutivo", options: { display: false } },
    { name: "manifestacion_impacto_ambiental", options: { display: false } },
    { name: "otros_estudios", options: { display: false } },
    { name: "observaciones", options: { display: true } },
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
          <TextField
            margin="dense"
            label="Nombre del Proyecto"
            type="text"
            fullWidth
            name="project_name"
            value={currentProject.project_name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            name="descripcion"
            value={currentProject.descripcion || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Tipo de Proyecto"
            type="text"
            fullWidth
            name="tipo_proyecto"
            value={currentProject.tipo_proyecto || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Municipio"
            type="text"
            fullWidth
            name="municipio"
            value={currentProject.municipio || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Beneficiarios"
            type="text"
            fullWidth
            name="beneficiarios"
            value={currentProject.beneficiarios || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Fecha de Registro"
            type="text"
            fullWidth
            name="fecha_registro"
            value={currentProject.fecha_registro || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Sector"
            type="text"
            fullWidth
            name="sector"
            value={currentProject.sector || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Tipo de Entidad"
            type="text"
            fullWidth
            name="tipo_entidad"
            value={currentProject.tipo_entidad || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Dependencia"
            type="text"
            fullWidth
            name="dependencia"
            value={currentProject.dependencia || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Organismo"
            type="text"
            fullWidth
            name="organismo"
            value={currentProject.organismo || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Municipio End"
            type="text"
            fullWidth
            name="municipioEnd"
            value={currentProject.municipioEnd || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Petición Personal"
            type="text"
            fullWidth
            name="peticion_personal"
            value={currentProject.peticion_personal || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Unidad Responsable"
            type="text"
            fullWidth
            name="unidad_responsable"
            value={currentProject.unidad_responsable || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Unidad Presupuestal"
            type="text"
            fullWidth
            name="unidad_presupuestal"
            value={currentProject.unidad_presupuestal || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Ramo Presupuestal"
            type="text"
            fullWidth
            name="ramo_presupuestal"
            value={currentProject.ramo_presupuestal || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Monto Federal"
            type="text"
            fullWidth
            name="monto_federal"
            value={currentProject.monto_federal || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Monto Estatal"
            type="text"
            fullWidth
            name="monto_estatal"
            value={currentProject.monto_estatal || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Monto Municipal"
            type="text"
            fullWidth
            name="monto_municipal"
            value={currentProject.monto_municipal || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Monto Otros"
            type="text"
            fullWidth
            name="monto_otros"
            value={currentProject.monto_otros || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Inversión Estimada"
            type="text"
            fullWidth
            name="inversion_estimada"
            value={currentProject.inversion_estimada || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Situación Sin Proyecto"
            type="text"
            fullWidth
            name="situacion_sin_proyecto"
            value={currentProject.situacion_sin_proyecto || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Objetivos"
            type="text"
            fullWidth
            name="objetivos"
            value={currentProject.objetivos || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Metas"
            type="text"
            fullWidth
            name="metas"
            value={currentProject.metas || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Gasto Programable"
            type="text"
            fullWidth
            name="gasto_programable"
            value={currentProject.gasto_programable || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Programa Presupuestario"
            type="text"
            fullWidth
            name="programa_presupuestario"
            value={currentProject.programa_presupuestario || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Alineación Normativa"
            type="text"
            fullWidth
            name="alineacion_normativa"
            value={currentProject.alineacion_normativa || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Región"
            type="text"
            fullWidth
            name="region"
            value={currentProject.region || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Municipio"
            type="text"
            fullWidth
            name="municipio"
            value={currentProject.municipio || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Municipio Impacto"
            type="text"
            fullWidth
            name="municipio_impacto"
            value={currentProject.municipio_impacto || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Localidad"
            type="text"
            fullWidth
            name="localidad"
            value={currentProject.localidad || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Barrio/Colonia/Ejido"
            type="text"
            fullWidth
            name="barrio_colonia_ejido"
            value={currentProject.barrio_colonia_ejido || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Latitud"
            type="text"
            fullWidth
            name="latitud"
            value={currentProject.latitud || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Longitud"
            type="text"
            fullWidth
            name="longitud"
            value={currentProject.longitud || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Plan Nacional"
            type="text"
            fullWidth
            name="plan_nacional"
            value={currentProject.plan_nacional || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Plan Estatal"
            type="text"
            fullWidth
            name="plan_estatal"
            value={currentProject.plan_estatal || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Plan Municipal"
            type="text"
            fullWidth
            name="plan_municipal"
            value={currentProject.plan_municipal || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="ODS"
            type="text"
            fullWidth
            name="ods"
            value={currentProject.ods || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Plan Sectorial"
            type="text"
            fullWidth
            name="plan_sectorial"
            value={currentProject.plan_sectorial || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Indicadores Estratégicos"
            type="text"
            fullWidth
            name="indicadores_estrategicos"
            value={currentProject.indicadores_estrategicos || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Indicadores Tácticos"
            type="text"
            fullWidth
            name="indicadores_tacticos"
            value={currentProject.indicadores_tacticos || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Indicadores de Desempeño"
            type="text"
            fullWidth
            name="indicadores_desempeno"
            value={currentProject.indicadores_desempeno || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Indicadores de Rentabilidad"
            type="text"
            fullWidth
            name="indicadores_rentabilidad"
            value={currentProject.indicadores_rentabilidad || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Estado Inicial"
            type="text"
            fullWidth
            name="estado_inicial"
            value={currentProject.estado_inicial || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Estado con Proyecto"
            type="text"
            fullWidth
            name="estado_con_proyecto"
            value={currentProject.estado_con_proyecto || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Estudios Prospectivos"
            type="text"
            fullWidth
            name="estudios_prospectivos"
            value={currentProject.estudios_prospectivos || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Estudios de Factibilidad"
            type="text"
            fullWidth
            name="estudios_factibilidad"
            value={currentProject.estudios_factibilidad || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Análisis de Alternativas"
            type="text"
            fullWidth
            name="analisis_alternativas"
            value={currentProject.analisis_alternativas || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Validación Normativa"
            type="text"
            fullWidth
            name="validacion_normativa"
            value={currentProject.validacion_normativa || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Liberación de Derecho de Vía"
            type="text"
            fullWidth
            name="liberacion_derecho_via"
            value={currentProject.liberacion_derecho_via || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Situación sin Proyecto Fotográfico"
            type="text"
            fullWidth
            name="situacion_sin_proyecto_fotografico"
            value={currentProject.situacion_sin_proyecto_fotografico || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Situación con Proyecto Proyección"
            type="text"
            fullWidth
            name="situacion_con_proyecto_proyeccion"
            value={currentProject.situacion_con_proyecto_proyeccion || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Análisis Costo Beneficio"
            type="text"
            fullWidth
            name="analisis_costo_beneficio"
            value={currentProject.analisis_costo_beneficio || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Expediente Técnico"
            type="text"
            fullWidth
            name="expediente_tecnico"
            value={currentProject.expediente_tecnico || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Proyecto Ejecutivo"
            type="text"
            fullWidth
            name="proyecto_ejecutivo"
            value={currentProject.proyecto_ejecutivo || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Manifestación de Impacto Ambiental"
            type="text"
            fullWidth
            name="manifestacion_impacto_ambiental"
            value={currentProject.manifestacion_impacto_ambiental || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Otros Estudios"
            type="text"
            fullWidth
            name="otros_estudios"
            value={currentProject.otros_estudios || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Observaciones"
            type="text"
            fullWidth
            name="observaciones"
            value={currentProject.observaciones || ''}
            onChange={handleChange}
          />
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
