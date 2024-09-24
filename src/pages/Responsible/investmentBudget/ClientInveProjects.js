import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importamos XLSX para trabajar con archivos Excel
import { saveAs } from 'file-saver'; // Importamos file-saver para guardar el archivo
import DownloadIcon from '@mui/icons-material/Download'; // Importamos el ícono de descarga
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
          project.nombre_dependencia,
          project.area_adscripcion,
          project.nombre_registrante,
          project.apellido_paterno,
          project.apellido_materno,
          project.correo,
          project.telefono,
          project.extension,
          project.ejercicio_fiscal,
          project.dependencia,
          project.organismo,
          project.unidad_responsable,
          project.unidad_presupuestal,
          project.descripcion_proyecto,
          project.situacion_actual,
          project.tipo_obra,
          project.calendario_ejecucion,
          project.beneficio_social,
          project.beneficio_economico,
          project.numero_beneficiarios,
          project.inversion_presupuestada,
          project.cobertura,
          project.regiones.join(', '),
          project.municipios.join(', '),
          project.ods,
          project.plan_estatal,
          project.objetivo_ped,
          project.estrategia_ped,
          project.linea_accion_ped,
          project.indicador_ped,
          project.programa_sectorial,
          project.objetivo_programa,
          project.propuesta_campana,
          project.cual_propuesta,
          project.prioridad,
          project.expediente_tecnico,
          `https://bibliotecadigitaluplaph.hidalgo.gob.mx/Documents/investmentform2025/${project.projInvestment_id}` // Enlace a anexos
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

  const exportToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(projects.map(project => ({
      "ID del Proyecto": project[0],
      "Fecha de Registro": project[1],
      "Nombre del Proyecto": project[2],
      "Nombre de la Dependencia": project[3],
      "Área de Adscripción": project[4],
      "Nombre del Registrante": project[5],
      "Apellido Paterno": project[6],
      "Apellido Materno": project[7],
      "Correo Electrónico": project[8],
      "Teléfono": project[9],
      "Extensión": project[10],
      "Ejercicio Fiscal": project[11],
      "Dependencia": project[12],
      "Organismo": project[13],
      "Unidad Responsable": project[14],
      "Unidad Presupuestal": project[15],
      "Descripción del Proyecto": project[16],
      "Situación Actual": project[17],
      "Tipo de Obra": project[18],
      "Calendario de Ejecución (meses)": project[19],
      "Beneficio Social": project[20],
      "Beneficio Económico": project[21],
      "Número de Beneficiarios": project[22],
      "Inversión Presupuestada": project[23],
      "Cobertura": project[24],
      "Regiones": project[25],
      "Municipios": project[26],
      "ODS": project[27],
      "Plan Estatal de Desarrollo": project[28],
      "Objetivo PED": project[29],
      "Estrategia PED": project[30],
      "Línea de Acción PED": project[31],
      "Indicador PED": project[32],
      "Programa Sectorial": project[33],
      "Objetivo del Programa": project[34],
      "Propuesta de Campaña": project[35],
      "¿Cuál Propuesta?": project[36],
      "Prioridad": project[37],
      "¿Cuenta con expediente técnico validado?": project[38],
      "Enlace a Anexos": project[39] // Incluimos el enlace a anexos en el archivo Excel
    })));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Proyectos de Inversión");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'proyectos_inversion.xlsx');
  };

  const columns = [
    { name: "ID del Proyecto", options: { setCellProps: () => ({ style: { fontWeight: 700, textAlign: 'left' } }) } },
    { name: "Fecha de Creación", options: { setCellProps: () => ({ style: { textAlign: 'left' } }) } },
    { name: "Nombre del Proyecto", options: { setCellProps: () => ({ style: { textAlign: 'left' } }) } },
    { 
      name: "Enlace a Anexos", 
      options: { 
        customBodyRender: (value, tableMeta) => {
          const projectId = projects[tableMeta.rowIndex][0]; // Obtenemos el projInvestment_id desde la fila actual
          const anexoUrl = `https://bibliotecadigitaluplaph.hidalgo.gob.mx/Documents/investmentform2025/${projectId}`;
          return (
            <a href={anexoUrl} target="_blank" rel="noopener noreferrer">Ver Anexos</a>
          );
        }
      }
    },
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
    customToolbar: () => (
      <Tooltip title="Descargar XLSX" arrow>
        <IconButton onClick={exportToXLSX}>
          <DownloadIcon />
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
