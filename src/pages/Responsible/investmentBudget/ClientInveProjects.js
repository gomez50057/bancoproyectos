import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver'; 
import DownloadIcon from '@mui/icons-material/Download'; 
import { useNavigate } from 'react-router-dom';
import urlAnexos from '../../../utils/urlAnexos';

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('cedulas/');
        const data = response.data.map(project => {
          // Filtrar los anexos que pertenecen a este proyecto
          const anexos = urlAnexos.filter(anexo => anexo.projInvestment_id === project.projInvestment_id);
          
          return [
            project.projInvestment_id,
            project.fecha_registro,
            project.nombre_proyecto,
            anexos.length > 0 ? anexos : 'No cuenta con anexos', // Si tiene anexos, los mostramos, si no, mostramos un mensaje
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
            project.expediente_tecnico
          ];
        });
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
      
      "Nombre de la Dependencia": project[4],
      "Área de Adscripción": project[5],
      "Nombre del Registrante": project[6],
      "Apellido Paterno": project[7],
      "Apellido Materno": project[8],
      "Correo Electrónico": project[9],
      "Teléfono": project[10],
      "Extensión": project[11],
      "Ejercicio Fiscal": project[12],
      "Dependencia": project[13],
      "Organismo": project[14],
      "Unidad Responsable": project[15],
      "Unidad Presupuestal": project[16],
      "Descripción del Proyecto": project[17],
      "Situación Actual": project[18],
      "Tipo de Obra": project[19],
      "Calendario de Ejecución (meses)": project[20],
      "Beneficio Social": project[21],
      "Beneficio Económico": project[22],
      "Número de Beneficiarios": project[23],
      "Inversión Presupuestada": project[24],
      "Cobertura": project[25],
      "Regiones": project[26],
      "Municipios": project[27],
      "ODS": project[28],
      "Plan Estatal de Desarrollo": project[29],
      "Objetivo PED": project[30],
      "Estrategia PED": project[31],
      "Línea de Acción PED": project[32],
      "Indicador PED": project[33],
      "Programa Sectorial": project[34],
      "Objetivo del Programa": project[35],
      "Propuesta de Campaña": project[36],
      "¿Cuál Propuesta?": project[37],
      "Prioridad": project[38],
      "¿Cuenta con expediente técnico validado?": project[39],
      "Anexos": Array.isArray(project[3]) 
        ? project[3].map(anexo => `${anexo.tipo_anexo}: https://bibliotecadigitaluplaph.hidalgo.gob.mx${anexo.archivo}`).join('\n') 
        : 'No cuenta con anexos', // Incluimos los anexos en Excel
    })));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Proyectos de Inversión");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'proyectos_inversion.xlsx');
  };

  const columns = [
    { name: "ID del Proyecto", options: { setCellProps: () => ({ style: { fontWeight: 700, textAlign: 'left' } }) } },
    { name: "Fecha de Registro", options: { setCellProps: () => ({ style: { textAlign: 'left' } }) } },
    { name: "Nombre del Proyecto", options: { setCellProps: () => ({ style: { textAlign: 'left' } }) } },
    { 
      name: "Anexos", 
      options: { 
        customBodyRender: (anexos) => {
          // Verifica si "anexos" es un array
          if (!Array.isArray(anexos) || anexos.length === 0) {
            return "No cuenta con anexos"; // Si no hay anexos, mostrar este mensaje
          }

          return (
            <div>
              {anexos.map((anexo, index) => (
                <div key={index}>
                  <a href={`https://bibliotecadigitaluplaph.hidalgo.gob.mx${anexo.archivo}`} target="_blank" rel="noopener noreferrer">
                    {anexo.tipo_anexo}
                  </a>
                </div>
              ))}
            </div>
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
