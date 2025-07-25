import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import axios from 'axios';

const TableComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/ver-proyectos-tabla/');
        // const filteredData = response.data.filter(
        //   ({ isBlocked_project, situacion }) =>
        //     isBlocked_project &&
        //     situacion === 'Vigente'
        // );
        const extraIds = [
          '0191b2025562',
          '0193d2025553',
          '0191b2025547',
          '0191b2025530',
          '0191b2025512',
          '0191b2025499',
          '0191b2025490',
          '0191b2025485',
          '0191b2025478',
          '0191b2025469'
        ];

        const filteredData = response.data.filter(
          ({ project_id }) =>
            // Si project_id viene como número, conviértelo a string:
            extraIds.includes(project_id.toString())
        );
        const data = filteredData.map(project => [
          project.nombre_proyecto,
          project.descripcion,
          project.tipo_proyecto,
          project.municipio,
          project.beneficiarios,
          project.estatus,
          project.isBlocked_project,
          project.situacion,
        ]);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const columns = [
    { name: "Nombre del Proyecto", options: { setCellProps: () => ({ style: { fontWeight: 700, textAlign: 'left' } }) } },
    { name: "Descripción", options: { setCellProps: () => ({ style: { textAlign: 'justify' } }) } },
    "Tipo de Proyecto",
    { name: "Municipio", options: { setCellProps: () => ({ style: { textAlign: 'center' } }) } },
    { name: "Beneficiarios", options: { setCellProps: () => ({ style: { textAlign: 'center' } }) } },
    // { name: "Estatus", options: { setCellProps: () => ({ style: { textAlign: 'center' } }) } }
  ];

  const options = {
    selectableRows: 'none', // Updated to use string 'none'
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
      <div className="table_grid_pro_publica">
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

export default TableComponent;
