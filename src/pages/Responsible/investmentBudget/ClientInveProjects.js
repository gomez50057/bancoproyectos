import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('cedulas/');
        const data = response.data.map(project => [
          project.projInvestment_id,
          project.fecha_registro,
          project.nombre_proyecto,
        ]);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleEditClick = (projectId) => {
    navigate(`/editar-proyecto-inversion/${projectId}`);
  };

  const handleFichaClick = (projectId) => {
    navigate(`/reporte-inversion/${projectId}`);
  };

  const columns = [
    { name: "ID del Proyecto", options: { setCellProps: () => ({ style: { fontWeight: 700, textAlign: 'left' } }) } },
    { name: "Fecha de Creación", options: { setCellProps: () => ({ style: { textAlign: 'left' } }) } },
    { name: "Nombre del Proyecto", options: { setCellProps: () => ({ style: { textAlign: 'left' } }) } },
    {
      name: "Acciones",
      options: {
        setCellProps: () => ({ className: 'sticky-column' }),
        customBodyRender: (value, tableMeta) => {
          const projectId = projects[tableMeta.rowIndex][0];

          return (
            <div className="Acciones-con">
              <button className="crud-button" onClick={() => handleEditClick(projectId)}>Editar</button>
              <button className="crud-button" onClick={() => handleFichaClick(projectId)}>Ficha</button>
            </div>
          );
        }
      }
    }
  ];

  const options = {
    selectableRows: 'none',
    stickyHeader: true,
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
          title={<Typography variant="h3">Proyectos de Inversión Registrados Admin</Typography>}
          data={projects}
          columns={columns}
          options={options}
        />
      </div>
    </ThemeProvider>
  );
}

export default ClientProjects;
