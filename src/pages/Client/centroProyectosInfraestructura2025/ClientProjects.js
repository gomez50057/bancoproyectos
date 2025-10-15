// Archivo: src/pages/Client/ClientProjects.js
import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, Tooltip } from '@mui/material';  // Importar Tooltip
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/ver-proyectos-usuario/');
        const data = response.data.map(project => [
          project.project_id,
          project.nombre_proyecto,
          project.estatus,
          project.isBlocked_project, // Asegúrate de que esta línea esté presente
        ]);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleEditClick = (projectId) => {
    navigate(`/editar-proyecto/${projectId}`);
  };

  const columns = [
    { name: "ID del Proyecto", options: { setCellProps: () => ({ style: { fontWeight: 700, textAlign: 'left' } }) } },
    { name: "Nombre del Proyecto", options: { setCellProps: () => ({ style: { textAlign: 'left' } }) } },
    { name: "Estatus", options: { setCellProps: () => ({ style: { textAlign: 'center' } }) } },
    { 
      name: "Acciones", 
      options: { 
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        customBodyRender: (value, tableMeta) => {
          const projectId = projects[tableMeta.rowIndex][0];
          const estatus = projects[tableMeta.rowIndex][2];
          const isBlocked = projects[tableMeta.rowIndex][3]; 

          if (isBlocked) {
            if (estatus === "Atendido") {
              return (
                <Tooltip title="Aceptado">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: 'pointer' }}
                  >
                    <path
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                      fill="currentColor"
                    />
                  </svg>
                </Tooltip>
              );
            } else if (estatus === "Registrado") {
              return (
                <Tooltip title="Pronto estará en Revisión">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: 'pointer' }}
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                      fill="currentColor"
                    />
                  </svg>
                </Tooltip>
              );
            } else if (estatus === "En Proceso") {
              return (
                <Tooltip title="Revisión">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: 'pointer' }}
                  >
                    <path
                      d="M11 2v20c-1.1 0-2-.9-2-2H5c0 1.1-.9 2-2 2V2c1.1 0 2-.9 2-2h4c0 1.1.9 2 2 2zm2 0h4c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2h-4V2z"
                      fill="currentColor"
                    />
                  </svg>
                </Tooltip>
              );
            }
          } else {
            // Mostrar botón "Editar" si el proyecto no está bloqueado
            return (
              <button 
                className="crud-button" 
                onClick={() => handleEditClick(projectId)} 
              >
                Editar
              </button>
            );
          }
        }
      } 
    }
  ];

  const options = {
    selectableRows: 'none',
    download: false,
    print: false,
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
        MuiTypography: {
          styleOverrides: {
            h3: {
              fontWeight: 600,
              fontSize: '2.25rem',
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
      <div className="table_grid_pro">
        <MUIDataTable
          title={<Typography variant="h3">Proyectos Registrados</Typography>}
          data={projects}
          columns={columns}
          options={options}
        />
      </div>
    </ThemeProvider>
  );
}

export default ClientProjects;
