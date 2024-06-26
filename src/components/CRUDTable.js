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
    { name: "Nombre del Proyecto", options: { setCellProps: () => ({ style: { fontWeight: 700, textAlign: 'left' } }) } },
    { name: "Descripción", options: { setCellProps: () => ({ style: { textAlign: 'justify' } }) } },
    "Tipo de Proyecto",
    { name: "Municipio", options: { setCellProps: () => ({ style: { textAlign: 'center' } }) } },
    { name: "Beneficiarios", options: { setCellProps: () => ({ style: { textAlign: 'center' } }) } },
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
            project.project_name,
            project.descripcion,
            project.tipo_proyecto,
            project.municipio,
            project.beneficiarios
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
