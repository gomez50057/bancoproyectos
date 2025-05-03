import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import CustomTooltip from '../componentsForm/Tooltip';
import SectionTitle from '../componentsForm/SectionTitle';
import { municipiosDeHidalgo, unidadesResponsables, dependencias, organismos, ramoPresupuestalOptions, municipiosPorRegion, unidadPresupuestalPorUnidadResponsable, programaPresupuestarioOptions, indicadoresEstrategicosOptions, aplicaOptions, sectorOptions, tipoProyectoOptions, programasSectorialesOptions, modalidadEjecucionOptions, tipoLocalidadOptions, planNacionalOptions, acuerdosTransversalesOptions, odsOptions } from '../../../utils';
import { fieldLabels } from '../../../utils';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import '../panel/ClientPanel.css';

import DocumentUploadSection from '../componentsForm/DocumentUploadSection';
import TooltipHelp from '../componentsForm/TooltipHelp';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ErrorIcon from '@mui/icons-material/Error';


const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: 50%;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 35px;
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background: #0056b3;
    }
  }
`;

const globalModalStyles = css`
  .ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
`;

const calculateTotalInvestment = (federal, estatal, municipal, otros) => {
  return (
    parseFloat(federal || 0) +
    parseFloat(estatal || 0) +
    parseFloat(municipal || 0) +
    parseFloat(otros || 0)
  ).toFixed(2); // Redondear a 2 decimales
};

const EditProject = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const [project, setProject] = useState(null);
  const [applies, setApplies] = useState({
    estudiosProspectivos: false,
    estudiosFactibilidad: false,
    analisisAlternativas: false,
    validacionNormativa: false,
    liberacionDerechoVia: false,
    situacionSinProyectoFotografico: false,
    situacionConProyectoProyeccion: false,
    analisisCostoBeneficio: false,
    expedienteTecnico: false,
    proyectoEjecutivo: false,
    manifestacionImpactoAmbiental: false,
    otrosEstudios: false,
  });
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [entityType, setEntityType] = useState('');
  const [selectedUnidadResponsable, setSelectedUnidadResponsable] = useState('');
  const [selectedProgramaPresupuestario, setSelectedProgramaPresupuestario] = useState('');
  const [selectedPlanEstatal, setSelectedPlanEstatal] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/proyecto/${projectId}/`);
        setProject({
          ...response.data,
          estudiosProspectivos: [],
          estudiosFactibilidad: [],
          analisisAlternativas: [],
          validacionNormativa: [],
          liberacionDerechoVia: [],
          situacionSinProyectoFotografico: [],
          situacionConProyectoProyeccion: [],
          analisisCostoBeneficio: [],
          expedienteTecnico: [],
          proyectoEjecutivo: [],
          manifestacionImpactoAmbiental: [],
          otrosEstudios: [],
        });
        // Si viene un string, lo metemos en un array; si ya viene array, lo usamos directamente
        const reg = response.data.region;
        setSelectedRegion(Array.isArray(reg) ? reg : (reg ? [reg] : []));

        setApplies({
          estudiosProspectivos: response.data.applies_estudiosProspectivos,
          estudiosFactibilidad: response.data.applies_estudiosFactibilidad,
          analisisAlternativas: response.data.applies_analisisAlternativas,
          validacionNormativa: response.data.applies_validacionNormativa,
          liberacionDerechoVia: response.data.applies_liberacionDerechoVia,
          situacionSinProyectoFotografico: response.data.applies_situacionSinProyectoFotografico,
          situacionConProyectoProyeccion: response.data.applies_situacionConProyectoProyeccion,
          analisisCostoBeneficio: response.data.applies_analisisCostoBeneficio,
          expedienteTecnico: response.data.applies_expedienteTecnico,
          proyectoEjecutivo: response.data.applies_proyectoEjecutivo,
          manifestacionImpactoAmbiental: response.data.applies_manifestacionImpactoAmbiental,
          otrosEstudios: response.data.applies_otrosEstudios,
        });

      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [projectId]);

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/panel-usuario');
  };

  // const formatCurrency = (value) => {
  //   return value ? `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '';
  // };

  const handleApplyChange = (field) => {
    setApplies((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleRegionChange = (selectedOptions, setFieldValue) => {
    const updatedValues = selectedOptions.map(option => option.value);
    setFieldValue('region', updatedValues);
    setSelectedRegion(updatedValues);
    // Reinicia el campo 'municipio' al cambiar las regiones seleccionadas
    setFieldValue('municipio', '');
  };

  const getRegionByMunicipio = (municipio) => {
    for (const region in municipiosPorRegion) {
      if (municipiosPorRegion[region].includes(municipio)) {
        return region;
      }
    }
    return '';
  };

  const handleMunicipioAyuntamientoChange = (option, setFieldValue) => {
    const municipioValue = option.value;
    // Se guarda el municipio en el campo municipio_ayuntamiento
    setFieldValue('municipio_ayuntamiento', municipioValue);
    // Se asigna el valor en formato array para que cumpla con la validación (se envuelve en array)
    setFieldValue('municipio', [municipioValue]);
    // Se determina la región correspondiente al municipio
    const region = getRegionByMunicipio(municipioValue);
    // Se guarda la región en el campo 'region' (en formato de array ya que es un select multi)
    setFieldValue('region', region ? [region] : []);
    // Actualizamos el estado local para 'selectedRegion'
    setSelectedRegion(region ? [region] : []);
  };


  const getMunicipiosOptions = () => {
    if (!selectedRegion || selectedRegion.length === 0) return [];

    // Combina los municipios de cada región seleccionada
    const allMunicipios = selectedRegion.reduce((acc, region) => {
      const municipios = municipiosPorRegion[region] || [];
      return [...acc, ...municipios];
    }, []);

    // Elimina duplicados
    const uniqueMunicipios = [...new Set(allMunicipios)];

    // Mapea los municipios al formato { value, label }
    return uniqueMunicipios.map(mun => ({ value: mun, label: mun }));
  };


  const getProgramasSIEValue = (tipo_entidad, dependencia, organismo) => {
    if (tipo_entidad === 'municipio_ayuntamiento') {
      return 'No Aplica';
    }

    if (tipo_entidad === 'Dependencia') {
      return programasSectorialesOptions[dependencia] || 'No Aplica';
    }

    if (tipo_entidad === 'Organismo') {
      return programasSectorialesOptions[organismo] || 'No Aplica';
    }

    return 'No Aplica';
  };

  const handleEntityTypeChange = (tipo_entidad, setFieldValue) => {
    setEntityType(tipo_entidad);

    if (tipo_entidad === 'Ayuntamiento') {
      // Se marcan como "No Aplica"
      setFieldValue('dependencia', 'No Aplica');
      setFieldValue('organismo', 'No Aplica');
      setFieldValue('programas_SIE', 'No Aplica');
    } else if (tipo_entidad === 'Dependencia') {
      // Si es Dependencia, los otros campos se marcan como "No Aplica"
      setFieldValue('municipio_ayuntamiento', 'No Aplica');
      setFieldValue('organismo', 'No Aplica');
    } else if (tipo_entidad === 'Organismo') {
      // Si es Organismo, los otros campos se marcan como "No Aplica"
      setFieldValue('municipio_ayuntamiento', 'No Aplica');
      setFieldValue('dependencia', 'No Aplica');
    }
  };

  // Extrae solo los encabezados de indicadoresEstrategicosOptions
  const planEstatalOptions = Object.keys(indicadoresEstrategicosOptions).map(key => ({
    value: key,
    label: key,
  }));

  // Maneja los cambios en plan_estatal
  const handlePlanEstatalChange = (selectedOption, setFieldValue) => {
    const selectedValue = selectedOption ? selectedOption.value : '';
    setSelectedPlanEstatal(selectedValue); // Actualiza el estado de plan_estatal
    setFieldValue('plan_estatal', selectedValue);
    setFieldValue('indicadores_estrategicos', ''); // Resetea el campo indicadores_estrategicos al cambiar plan_estatal
  };

  // Obtiene las opciones de indicadores_estrategicos según el plan_estatal seleccionado
  const getIndicadoresEstrategicosOptions = () => {
    return selectedPlanEstatal
      ? indicadoresEstrategicosOptions[selectedPlanEstatal].map(option => ({
        value: option,
        label: option,
      }))
      : [];
  };

  return (
    <div className="formulario-container">
      <div className="formTitulo">
        <img src={`${imgBasePath}formIco.webp`} alt="img_representativa" />
        <h3>REGISTRO DE PROYECTO</h3>
      </div>
      {project && (
        <Formik
          initialValues={{
            // Generalidades del Proyecto
            nombre_proyecto: project.nombre_proyecto || '',
            tipo_entidad: project.tipo_entidad || '',
            dependencia: project.dependencia || '',
            organismo: project.organismo || '',
            municipio_ayuntamiento: project.municipio || '',
            region: Array.isArray(project.region)
              ? project.region
              : (project.region ? [project.region] : []),
            municipio: project.municipio || '',
            localidad: project.localidad || '',
            barrio_colonia: project.barrio_colonia || '',
            latitud: project.latitud?.toString() || '',
            longitud: project.longitud?.toString() || '',
            tipo_localidad: project.tipo_localidad || '',

            // Estructura Presupuestal
            sector: project.sector || '',
            tipo_proyecto: project.tipo_proyecto || '',
            unidad_responsable: project.unidad_responsable || '',
            unidad_presupuestal: project.unidad_presupuestal || '',
            ramo_presupuestal: project.ramo_presupuestal || '',

            // Fuentes de Financiamiento
            inversion_federal: project.inversion_federal?.toString() || '0',
            inversion_estatal: project.inversion_estatal?.toString() || '0',
            inversion_municipal: project.inversion_municipal?.toString() || '0',
            inversion_otros: project.inversion_otros?.toString() || '0',
            inversion_total: project.inversion_total?.toString() || '0',

            // Resumen del Proyecto
            descripcion: project.descripcion || '',
            situacion_sin_proyecto: project.situacion_sin_proyecto || '',
            objetivos: project.objetivos || '',
            metas: project.metas || '',
            tiempo_ejecucion: project.tiempo_ejecucion?.toString() || '',
            modalidad_ejecucion: project.modalidad_ejecucion || '',
            beneficiarios: project.beneficiarios?.toString() || '',
            gasto_programable: project.gasto_programable || '',
            programa_presupuestario: project.programa_presupuestario || '',
            normativa_aplicable: project.normativa_aplicable || '',

            // Alineación Estratégica
            plan_nacional: project.plan_nacional || '',
            plan_estatal: project.plan_estatal || '',
            plan_municipal: project.plan_municipal || '',
            ods: project.ods || '',
            acuerdos_transversales: project.acuerdos_transversales || '',
            programas_SIE: project.programas_SIE || '',

            // Mecanismos de Evaluación y Seguimiento a Proyectos
            indicadores_estrategicos: project.indicadores_estrategicos || '',
            indicadores_socioeconomicos: project.indicadores_socioeconomicos || '',

            // Anexos del proyecto
            // estudios_factibilidad: project.estudios_factibilidad || [],
            // analisis_alternativas: project.analisis_alternativas || [],
            // validacion_normativa: project.validacion_normativa || [],
            // liberacion_derecho_via: project.liberacion_derecho_via || [],
            // analisis_costo_beneficio: project.analisis_costo_beneficio || [],
            // expediente_tecnico_docu: project.expediente_tecnico_docu || [],
            // proyecto_ejecutivo: project.proyecto_ejecutivo || [],
            // manifestacion_impacto_ambiental: project.manifestacion_impacto_ambiental || [],
            // fotografia_render_proyecto: project.fotografia_render_proyecto || [],
            // otros_estudios: project.otros_estudios || [],

            estudios_factibilidad: [],
            analisis_alternativas: [],
            validacion_normativa: [],
            liberacion_derecho_via: [],
            analisis_costo_beneficio: [],
            expediente_tecnico_docu: [],
            proyecto_ejecutivo: [],
            manifestacion_impacto_ambiental: [],
            fotografia_render_proyecto: [],
            otros_estudios: [],

            // Observaciones y Comentarios
            observaciones: project.observaciones || '',
            retroalimentacion: project.retroalimentacion || '',
          }}
          onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
              const formData = new FormData();

              // --- Generalidades del Proyecto ---
              formData.append('nombre_proyecto', values.nombre_proyecto);
              formData.append('tipo_entidad', values.tipo_entidad);
              formData.append('dependencia', values.dependencia);
              formData.append('organismo', values.organismo);
              formData.append('municipio_ayuntamiento', values.municipio_ayuntamiento);
              formData.append('region', JSON.stringify(values.region));
              formData.append('municipio', JSON.stringify(values.municipio));
              formData.append('localidad', values.localidad);
              formData.append('barrio_colonia', values.barrio_colonia);
              formData.append('latitud', parseFloat(values.latitud) || 0);
              formData.append('longitud', parseFloat(values.longitud) || 0);
              formData.append('tipo_localidad', values.tipo_localidad);

              // --- Estructura Presupuestal ---
              formData.append('sector', values.sector);
              formData.append('tipo_proyecto', values.tipo_proyecto);
              formData.append('unidad_responsable', values.unidad_responsable);
              formData.append('unidad_presupuestal', values.unidad_presupuestal);
              formData.append('ramo_presupuestal', values.ramo_presupuestal);

              // --- Fuentes de Financiamiento ---
              formData.append('inversion_federal', parseFloat(values.inversion_federal) || 0);
              formData.append('inversion_estatal', parseFloat(values.inversion_estatal) || 0);
              formData.append('inversion_municipal', parseFloat(values.inversion_municipal) || 0);
              formData.append('inversion_otros', parseFloat(values.inversion_otros) || 0);
              formData.append('inversion_total', parseFloat(values.inversion_total) || 0);

              // --- Resumen del Proyecto ---
              formData.append('descripcion', values.descripcion);
              formData.append('situacion_sin_proyecto', values.situacion_sin_proyecto);
              formData.append('objetivos', values.objetivos);
              formData.append('metas', values.metas);
              formData.append('tiempo_ejecucion', parseInt(values.tiempo_ejecucion, 10) || 0);
              formData.append('modalidad_ejecucion', values.modalidad_ejecucion);
              formData.append('beneficiarios', parseInt(values.beneficiarios, 10) || 0);
              formData.append('gasto_programable', values.gasto_programable);
              formData.append('programa_presupuestario', values.programa_presupuestario);
              formData.append('normativa_aplicable', values.normativa_aplicable);

              // --- Alineación Estratégica ---
              formData.append('plan_nacional', values.plan_nacional);
              formData.append('plan_estatal', values.plan_estatal);
              formData.append('plan_municipal', values.plan_municipal);
              formData.append('ods', values.ods);
              formData.append('acuerdos_transversales', values.acuerdos_transversales);
              formData.append('programas_SIE', values.programas_SIE);

              // --- Mecanismos de Evaluación y Seguimiento a Proyectos ---
              formData.append('indicadores_estrategicos', values.indicadores_estrategicos);
              formData.append('indicadores_socioeconomicos', values.indicadores_socioeconomicos);

              // --- Anexos del proyecto (archivos) ---
              const anexos = [
                'estudios_factibilidad',
                'analisis_alternativas',
                'validacion_normativa',
                'liberacion_derecho_via',
                'analisis_costo_beneficio',
                'expediente_tecnico_docu',
                'proyecto_ejecutivo',
                'manifestacion_impacto_ambiental',
                'fotografia_render_proyecto',
                'otros_estudios'
              ];
              anexos.forEach(key => {
                if (Array.isArray(values[key])) {
                  values[key].forEach(file => {
                    if (file instanceof File) {
                      formData.append(key, file);
                    }
                  });
                }
              });

              // --- Observaciones y Comentarios ---
              formData.append('observaciones', values.observaciones);
              formData.append('retroalimentacion', values.retroalimentacion);

              const csrfToken = Cookies.get('csrftoken');
              await axios.put(`/update-project/${projectId}/`, formData, {
                headers: {
                  'X-CSRFToken': csrfToken,
                  'Content-Type': 'multipart/form-data'
                }
              });

              setModalIsOpen(true);
              resetForm();
              setSubmitting(false);
            } catch (error) {
              // Determinamos si hay respuesta del servidor y capturamos el mensaje de error
              let errorMsg = 'Formulario no enviado. Valida que todos los campos estén llenos y tu conexión a internet.';
              if (error.response) {
                if (error.response.data && typeof error.response.data === 'object') {
                  // Si es un objeto, mostramos los errores del servidor detalladamente
                  errorMsg = `Error al enviar el formulario: ${JSON.stringify(error.response.data)}`;
                } else {
                  // Si es un string, lo mostramos directamente
                  errorMsg = `Error al enviar el formulario: ${error.response.data}`;
                }
              } else {
                errorMsg = `Error al enviar el formulario: ${error.message}`;
              }
              // Mostramos el mensaje de error al usuario
              setErrorMessage(errorMsg);

              setErrors({
                general: (
                  <div>
                    <ErrorIcon style={{ color: 'red', marginRight: '5px' }} />
                    {errorMsg}
                  </div>
                ),
              });
            } finally {
              console.log('Finalizando handleSubmit');
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values, errors, isValid, touched }) => (
            <div>
              <Form>
                <SectionTitle title="Generalidades del Proyecto" />
                <div className="form-row">
                  <div className="form-group projectDate">
                    <label>Fecha de Registro</label>
                    <Field type="text" name="fechaRegistro" value={new Date().toISOString().split('T')[0]} readOnly />
                  </div>
                </div>

                <div className="form-row">
                  <CustomSelectField
                    name="tipo_entidad"
                    label="Tipo de Entidad"
                    options={[
                      { value: 'Dependencia', label: 'Dependencia' },
                      { value: 'Organismo', label: 'Organismo' },
                      { value: 'Ayuntamiento', label: 'Ayuntamiento' },
                    ]}
                    placeholder="Selecciona una opción"
                    tooltipHelp="Selecciona el tipo de entidad para el proyecto."
                    tooltipObservation={project.observacion_tipo_entidad}
                    disabled={project.isBlocked_tipo_entidad}
                    onChange={(option) => {
                      setFieldValue('tipo_entidad', option.value);
                      handleEntityTypeChange(option.value, setFieldValue);
                    }}
                  />

                  {entityType === 'Dependencia' && (
                    <CustomSelectField
                      name="dependencia"
                      label="Dependencia"
                      options={dependencias.map(dep => ({ value: dep, label: dep }))}
                      placeholder="Selecciona una opción"
                      tooltipHelp="Selecciona la dependencia que gestiona el proyecto."
                      tooltipObservation={project.observacion_dependencia}
                      disabled={project.isBlocked_dependencia}
                      onChange={(option) => {
                        setFieldValue('dependencia', option.value);
                        setFieldValue('programas_SIE', getProgramasSIEValue('Dependencia', option.value, values.organismo));
                      }}
                    />
                  )}

                  {entityType === 'Organismo' && (
                    <CustomSelectField
                      name="organismo"
                      label="Organismo"
                      options={organismos.map(org => ({ value: org, label: org }))}
                      placeholder="Selecciona una opción"
                      tooltipHelp="Selecciona el organismo encargado del proyecto."
                      tooltipObservation={project.observacion_organismo}
                      disabled={project.isBlocked_organismo}
                      onChange={(option) => {
                        setFieldValue('organismo', option.value);
                        setFieldValue('programas_SIE', getProgramasSIEValue('Organismo', values.dependencia, option.value));
                      }}
                    />
                  )}

                  {entityType === 'Ayuntamiento' && (
                    <CustomSelectField
                      name="municipio_ayuntamiento"
                      label="Ayuntamiento"
                      options={municipiosDeHidalgo.map(mun => ({ value: mun, label: mun }))}
                      placeholder="Selecciona una opción"
                      tooltipHelp="Selecciona el municipio que gestionará el proyecto."
                      tooltipObservation={project.observacion_municipio_ayuntamiento}
                      disabled={project.isBlocked_municipio_ayuntamiento}
                      onChange={(option) => handleMunicipioAyuntamientoChange(option, setFieldValue)}
                    />
                  )}
                  <FieldGroup
                    name="nombre_proyecto"
                    label="Nombre del Proyecto"
                    tooltipHelp="Indica el nombre del proyecto."
                    tooltipObservation={project.observacion_municipio_ayuntamiento}
                    disabled={project.isBlocked_municipio_ayuntamiento}
                  />
                </div>

                <div className="form-row">
                  <CustomSelectField
                    name="region"
                    label="Región"
                    options={Object.keys(municipiosPorRegion).map((region) => ({
                      value: region,
                      label: region,
                    }))}
                    isMulti
                    placeholder="Seleccione una o más regiones"
                    tooltipText="Selecciona la(s) región(es) donde se encuentra el proyecto."
                    tooltipObservation={project.observacion_region}
                    disabled={project.isBlocked_region}
                    onChange={(selectedOptions) => handleRegionChange(selectedOptions, setFieldValue)}
                    isDisabled={entityType === 'Ayuntamiento'}
                  />

                  <CustomSelectField
                    name="municipio"
                    label="Municipio"
                    options={
                      entityType === 'Ayuntamiento'
                        ? (values.municipio ? [{ value: values.municipio, label: values.municipio }] : [])
                        : getMunicipiosOptions()
                    }
                    placeholder="Seleccione uno o más municipios"
                    tooltipText="Selecciona el/los municipio(s) correspondientes a la(s) región(es) seleccionada(s)."
                    tooltipObservation={project.observacion_municipio}
                    disabled={project.isBlocked_municipio}
                    isDisabled={entityType === 'Ayuntamiento' || (!selectedRegion || selectedRegion.length === 0)}
                    isMulti={entityType !== 'Ayuntamiento'}
                  />

                  <FieldGroup
                    name="localidad"
                    label="Localidad"
                    tooltipHelp="Ingresa la localidad donde se llevará a cabo el proyecto. Máximo 250 caracteres."
                    tooltipObservation={project.observacion_localidad}
                    type="text"
                    maxLength="250"
                    placeholder="Localidad (máximo 250 caracteres)"
                    disabled={project.isBlocked_localidad}
                  />

                  <FieldGroup
                    name="barrio_colonia"
                    label="Barrio/Colonia"
                    tooltipHelp="Ingresa el barrio o colonia relacionado al proyecto. Máximo 250 caracteres."
                    tooltipObservation={project.observacion_barrio_colonia}
                    type="text"
                    maxLength="250"
                    placeholder="Barrio/Colonia (máximo 250 caracteres)"
                    disabled={project.isBlocked_barrio_colonia}
                  />
                </div>

                <div className="form-row">
                  <FieldGroup
                    name="latitud"
                    label="Latitud"
                    tooltipHelp="Ingresa la latitud geográfica del proyecto. Debe ser un valor numérico."
                    type="number"
                    step="any"
                    placeholder="Latitud (ej. 20.1234)"
                    tooltipObservation={project.observacion_latitud}
                    disabled={project.isBlocked_latitud}
                  />

                  <FieldGroup
                    name="longitud"
                    label="Longitud"
                    tooltipHelp="Ingresa la longitud geográfica del proyecto. Debe ser un valor numérico."
                    type="number"
                    step="any"
                    placeholder="Longitud (ej. -99.5678)"
                    tooltipObservation={project.observacion_longitud}
                    disabled={project.isBlocked_longitud}
                  />

                  <CustomSelectField
                    name="tipo_localidad"
                    label="Tipo de Localidad"
                    options={tipoLocalidadOptions}
                    placeholder="Selecciona una opción"
                    tooltipHelp="Ingresa el tipo de localidad(es) según corresponda"
                    tooltipObservation={project.observacion_tipo_localidad}
                    disabled={project.isBlocked_tipo_localidad}
                  />
                </div>

                <SectionTitle title="Estructura Presupuestal" />
                <div className="form-row">
                  <CustomSelectField
                    name="sector"
                    label="Sector"
                    options={sectorOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                    placeholder="Selecciona una opción"
                    tooltipHelp="Selecciona el sector correspondiente."
                    tooltipObservation={project.observacion_sector}
                    disabled={project.isBlocked_sector}
                    onChange={(option) => {
                      setFieldValue('sector', option.value);
                      const tipo_proyecto = tipoProyectoOptions[option.value] || '';
                      setFieldValue('tipo_proyecto', tipo_proyecto);
                    }}
                  />
                  <FieldGroup
                    name="tipo_proyecto"
                    label="Tipo de Proyecto"
                    tooltipHelp="Este campo se llena automáticamente en base al sector seleccionado."
                    tooltipObservation={project.observacion_tipo_proyecto}
                    disabled={project.isBlocked_tipo_proyecto}
                    readOnly
                  />
                </div>

                <div className="form-row">
                  <CustomSelectField
                    name="unidad_responsable"
                    label="Unidad Responsable"
                    options={unidadesResponsables.map(unidad => ({ value: unidad, label: unidad }))}
                    placeholder="Selecciona una opción"
                    tooltipHelp="Selecciona la unidad responsable del proyecto."
                    tooltipObservation={project.observacion_unidad_responsable}
                    disabled={project.isBlocked_unidad_responsable}
                    onChange={(option) => {
                      setFieldValue('unidad_responsable', option.value);
                      setSelectedUnidadResponsable(option.value);
                      setFieldValue('unidad_presupuestal', ''); // Resetea el campo unidad_presupuestal al cambiar la unidad_responsable
                    }}
                  />

                  {selectedUnidadResponsable && (
                    <CustomSelectField
                      name="unidad_presupuestal"
                      label="Unidad Presupuestal"
                      options={unidadPresupuestalPorUnidadResponsable[selectedUnidadResponsable]?.map(unidad => ({ value: unidad, label: unidad })) || []}
                      placeholder="Selecciona una opción"
                      tooltipHelp="Selecciona la unidad presupuestal correspondiente."
                      tooltipObservation={project.observacion_unidad_presupuestal}
                      disabled={project.isBlocked_unidad_presupuestal}
                      isDisabled={!selectedUnidadResponsable}
                    />
                  )}

                  <CustomSelectFieldGrouped
                    name="ramo_presupuestal"
                    label="Ramo Presupuestal"
                    options={ramoPresupuestalOptions}
                    placeholder="Seleccione una opción"
                    tooltipHelp="Selecciona el ramo presupuestal correspondiente."
                    tooltipObservation={project.observacion_ramo_presupuestal}
                    disabled={project.isBlocked_ramo_presupuestal}
                  />
                </div>

                <SectionTitle title="Fuentes de Financiamiento" />
                <div className="FuentesFinanciamiento">
                  <p>Si no recibes financiamiento de alguna de las siguientes fuentes, por favor, déjalo en cero.</p>
                </div>
                <div className="form-row">
                  <FieldGroup
                    name="inversion_federal"
                    label="Inversión Federal"
                    type="number"
                    tooltipHelp="Indica la inversión de financiamiento federal."
                    tooltipObservation={project.observacion_inversion_federal}
                    disabled={project.isBlocked_inversion_federal}
                    onChange={(e) => {
                      const federalValue = e.target.value;
                      setFieldValue('inversion_federal', federalValue);
                      const total = calculateTotalInvestment(federalValue, values.inversion_estatal, values.inversion_municipal, values.inversion_otros);
                      setFieldValue('inversion_total', total);
                    }}
                  />
                  <FieldGroup
                    name="inversion_estatal"
                    label="Inversión Estatal"
                    type="number"
                    tooltipHelp="Indica la inversión de financiamiento estatal."
                    tooltipObservation={project.observacion_inversion_estatal}
                    disabled={project.isBlocked_inversion_estatal}
                    onChange={(e) => {
                      const estatalValue = e.target.value;
                      setFieldValue('inversion_estatal', estatalValue);
                      const total = calculateTotalInvestment(values.inversion_federal, estatalValue, values.inversion_municipal, values.inversion_otros);
                      setFieldValue('inversion_total', total);
                    }}
                  />
                  <FieldGroup
                    name="inversion_municipal"
                    label="Inversión Municipal"
                    type="number"
                    tooltipHelp="Indica la inversión de financiamiento municipal."
                    tooltipObservation={project.observacion_inversion_municipal}
                    disabled={project.isBlocked_inversion_municipal}
                    onChange={(e) => {
                      const municipalValue = e.target.value;
                      setFieldValue('inversion_municipal', municipalValue);
                      const total = calculateTotalInvestment(values.inversion_federal, values.inversion_estatal, municipalValue, values.inversion_otros);
                      setFieldValue('inversion_total', total);
                    }}
                  />
                  <FieldGroup
                    name="inversion_otros"
                    label="Otras Inversiones"
                    type="number"
                    tooltipHelp="Indica cualquier otro tipo de financiamiento."
                    tooltipObservation={project.observacion_inversion_otros}
                    disabled={project.isBlocked_inversion_otros}
                    onChange={(e) => {
                      const otrosValue = e.target.value;
                      setFieldValue('inversion_otros', otrosValue);
                      const total = calculateTotalInvestment(values.inversion_federal, values.inversion_estatal, values.inversion_municipal, otrosValue);
                      setFieldValue('inversion_total', total);
                    }}
                  />
                </div>

                <div className="form-row">
                  <FieldGroup
                    name="inversion_total"
                    label="Inversión Total"
                    tooltipHelp="Este campo se calcula automáticamente sumando las fuentes de financiamiento."
                    tooltipObservation={project.observacion_inversion_total}
                    disabled={project.isBlocked_inversion_total}
                    readOnly
                  />
                </div>

                <SectionTitle title="Descripción del Proyecto" />
                <div className="form-row">
                  <FieldGroup
                    name="descripcion"
                    label="Descripción"
                    as="textarea"
                    maxLength="1000"
                    tooltipHelp="Describe el proyecto. Máximo 1000 caracteres."
                    tooltipObservation={project.observacion_descripcion}
                    disabled={project.isBlocked_descripcion}
                    note="Máximo 1000 caracteres."
                  />
                </div>

                <div className="form-row">
                  <FieldGroup
                    name="situacion_sin_proyecto"
                    label="Situación Sin Proyecto"
                    as="textarea"
                    maxLength="1000"
                    tooltipHelp="Describe la situación actual sin el proyecto. Máximo 1000 caracteres."
                    tooltipObservation={project.observacion_situacion_sin_proyecto}
                    disabled={project.isBlocked_situacion_sin_proyecto}
                    note="Máximo 1000 caracteres."
                  />
                </div>

                <div className="form-row">
                  <FieldGroup
                    name="objetivos"
                    label="Objetivos"
                    as="textarea"
                    maxLength="500"
                    tooltipHelp="Describe los objetivos del proyecto. Máximo 500 caracteres."
                    tooltipObservation={project.observacion_objetivos}
                    disabled={project.isBlocked_objetivos}
                    note="Máximo 500 caracteres."
                  />
                  <FieldGroup
                    name="metas"
                    label="Metas Fisicas"
                    as="textarea"
                    maxLength="500"
                    tooltipHelp="Indica las metas del proyecto. Máximo 500 caracteres."
                    tooltipObservation={project.observacion_metas}
                    disabled={project.isBlocked_metas}
                    note="Máximo 500 caracteres."
                  />
                </div>

                <div className="form-row">
                  <FieldGroup
                    name="tiempo_ejecucion"
                    label="Tiempo Ejecución"
                    type="number"
                    tooltipHelp="Ingresa el tiempo estimado en meses que tomará la obra, incluyendo ejecución y entrega."
                    tooltipObservation={project.observacion_tiempo_ejecucion}
                    disabled={project.isBlocked_tiempo_ejecucion}
                    note="Tiempo estimado en meses."
                  />
                  <CustomSelectField
                    name="modalidad_ejecucion"
                    label="Modalidad Ejecución"
                    options={modalidadEjecucionOptions}
                    placeholder="Selecciona una opción"
                    tooltipHelp="Ingresa el tiempo estimado en meses que tomará la obra, incluyendo ejecución y entrega."
                    tooltipObservation={project.observacion_modalidad_ejecucion}
                    disabled={project.isBlocked_modalidad_ejecucion}
                    note="Tiempo estimado en meses."
                  />
                </div>

                <div className="form-row">
                  <FieldGroup
                    name="beneficiarios"
                    label="Número de Beneficiarios"
                    type="number"
                    tooltipHelp="Indica el número de beneficiarios del proyecto."
                    tooltipObservation={project.observacion_beneficiarios}
                    disabled={project.isBlocked_beneficiarios}
                  />
                  <CustomSelectField
                    name="gasto_programable"
                    label="Gasto Programable"
                    options={Object.keys(programaPresupuestarioOptions).map(opt => ({ value: opt, label: opt }))}
                    placeholder="Selecciona una opción"
                    tooltipHelp="Selecciona el gasto programable."
                    tooltipObservation={project.observacion_gasto_programable}
                    disabled={project.isBlocked_gasto_programable}
                    onChange={(option) => {
                      setFieldValue('gasto_programable', option.value);
                      setSelectedProgramaPresupuestario(option.value);
                    }}
                  />
                  {selectedProgramaPresupuestario && (
                    selectedProgramaPresupuestario === "23.Municipios" ? (
                      // Campo de texto libre
                      <FieldGroup
                        name="programa_presupuestario"
                        label="Programa Presupuestario"
                        type="text"
                        placeholder="Ingresa el programa presupuestario"
                        tooltipHelp="Ingresa el programa presupuestario de forma libre"
                        tooltipObservation={project.observacion_programa_presupuestario}
                        disabled={project.isBlocked_programa_presupuestario}
                      />
                    ) : (
                      // Campo select con opciones predeterminadas
                      <CustomSelectField
                        name="programa_presupuestario"
                        label="Programa Presupuestario"
                        options={programaPresupuestarioOptions[selectedProgramaPresupuestario] ? programaPresupuestarioOptions[selectedProgramaPresupuestario].map(opt => ({ value: opt, label: opt })) : []}
                        placeholder="Selecciona una opción"
                        tooltipHelp="Selecciona el programa presupuestario."
                        tooltipObservation={project.observacion_programa_presupuestario}
                        disabled={project.isBlocked_programa_presupuestario}
                        isDisabled={!selectedProgramaPresupuestario}
                      // options={programaPresupuestarioOptions[selectedProgramaPresupuestario]?.map(opt => ({ value: opt, label: opt })) || []}
                      // placeholder="Selecciona una opción"
                      // tooltipHelp="Selecciona el programa presupuestario."
                      // isDisabled={!selectedProgramaPresupuestario}
                      />
                    )
                  )}
                </div>

                <div className="form-row">
                  <FieldGroup
                    name="normativa_aplicable"
                    label="Normativa Aplicable Vigente"
                    as="textarea"
                    maxLength="1500"
                    tooltipHelp="Describe la normativa aplicable vigente. Máximo 1500 caracteres."
                    tooltipObservation={project.observacion_normativa_aplicable}
                    disabled={project.isBlocked_normativa_aplicable}
                    note="Máximo 1500 caracteres."
                  />
                </div>

                <SectionTitle title="Alineación Estratégica" />
                <div className="form-row">
                  <CustomSelectField
                    name="plan_nacional"
                    label="Plan Nacional de Desarrollo"
                    options={planNacionalOptions.map(opt => ({ value: opt, label: opt }))}
                    placeholder="Selecciona el plan nacional"
                    tooltipHelp="Selecciona el plan nacional de desarrollo al que se alinea el proyecto."
                    tooltipObservation={project.observacion_plan_nacional}
                    disabled={project.isBlocked_plan_nacional}
                  />

                  <CustomSelectField
                    name="plan_estatal"
                    label="Plan Estatal de Desarrollo"
                    options={planEstatalOptions}
                    placeholder="Selecciona el plan estatal"
                    tooltipHelp="Selecciona el plan estatal de desarrollo al que se alinea el proyecto."
                    tooltipObservation={project.observacion_plan_estatal}
                    disabled={project.isBlocked_plan_estatal}
                    onChange={(option) => handlePlanEstatalChange(option, setFieldValue)}
                  />
                </div>

                {entityType === 'Ayuntamiento' ? (
                  <FieldGroup
                    name="plan_municipal"
                    label="Plan Municipal"
                    tooltipHelp="Ingresa el plan municipal de desarrollo."
                    as="textarea"
                    maxLength="500"
                    placeholder="Máximo 500 caracteres"
                    tooltipObservation={project.observacion_plan_municipal}
                    disabled={project.isBlocked_plan_municipal}
                  />
                ) : (
                  <Field
                    type="hidden"
                    name="plan_municipal"
                    value="No Aplica"
                    tooltipObservation={project.observacion_plan_municipal}
                    disabled={project.isBlocked_plan_municipal}
                  />
                )}

                <div className="form-row">
                  <CustomSelectField
                    name="ods"
                    label="Objetivos de Desarrollo Sostenible (ODS)"
                    options={odsOptions.map(opt => ({ value: opt, label: opt }))}
                    placeholder="Selecciona un objetivo de desarrollo sostenible"
                    tooltipHelp="Selecciona los ODS al que se alinea el proyecto."
                    tooltipObservation={project.observacion_ods}
                    disabled={project.isBlocked_ods}
                  />
                  <CustomSelectField
                    name="acuerdos_transversales"
                    label="Acuerdos Transversales"
                    options={acuerdosTransversalesOptions.map(opt => ({ value: opt, label: opt }))}
                    placeholder="Selecciona un acuerdo transversal"
                    tooltipHelp="Selecciona los acuerdos transversales relacionados con el proyecto."
                    tooltipObservation={project.observacion_acuerdos_transversales}
                    disabled={project.isBlocked_acuerdos_transversales}
                  />
                </div>

                {entityType !== 'Ayuntamiento' && (
                  <div className="form-row">
                    <FieldGroup
                      name="programas_SIE"
                      label="Programas Sectoriales-Institucionales-Especiales"
                      tooltipHelp="Este campo se llena automáticamente en base al tipo de entidad seleccionado."
                      tooltipObservation={project.observacion_programas_SIE}
                      disabled={project.isBlocked_programas_SIE}
                      readOnly
                      value={values.programas_SIE}
                    />
                  </div>
                )}

                <SectionTitle title="Mecanismos de Evaluación y Seguimiento a Proyectos " />
                <div className="form-row">
                  <CustomSelectField
                    name="indicadores_estrategicos"
                    label="Indicadores Estratégicos"
                    options={getIndicadoresEstrategicosOptions()}
                    placeholder="Selecciona un indicador estratégico"
                    tooltipHelp="Selecciona el indicador estratégico correspondiente al plan estatal seleccionado."
                    tooltipObservation={project.observacion_indicadores_estrategicos}
                    disabled={project.isBlocked_indicadores_estrategicos}
                    isDisabled={!selectedPlanEstatal}
                    onChange={(option) => setFieldValue('indicadores_estrategicos', option.value)}
                  />
                  <CustomSelectField
                    name="indicadores_socioeconomicos"
                    label="Indicadores Socioeconomicos"
                    options={aplicaOptions}
                    placeholder="Selecciona una opción"
                    tooltipHelp="Elige Si en caso de aplicar en caso contrario elegir No"
                    tooltipObservation={project.observacion_indicadores_socioeconomicos}
                    disabled={project.isBlocked_indicadores_socioeconomicos}
                  />
                </div>

                <SectionTitle title="Anexos del proyecto" />
                <DocumentUploadSection applies={applies} handleApplyChange={handleApplyChange} values={values} setFieldValue={setFieldValue} />

                <SectionTitle title="Observaciones y Comentarios" />
                <div className="form-row">
                  <FieldGroup
                    name="observaciones"
                    label="Observaciones"
                    as="textarea"
                    maxLength="1000"
                    tooltipHelp="Agrega información o aclaraciones importantes para complementar este registro. Máximo 1000 caracteres."
                    note="Máximo 1000 caracteres."
                    tooltipObservation={project.observacion_observaciones}
                    disabled={project.isBlocked_observaciones}
                  />
                </div>

                <div className="form-row">
                  <FieldGroup
                    name="retroalimentacion"
                    label="Retroalimentacion"
                    as="textarea"
                    maxLength="1000"
                    tooltipHelp="Estas son las solvencias que se han determinado; por favor, sube lo solicitado."
                    tooltipObservation={project.observacion_retroalimentacion}
                    disabled={project.isBlocked_retroalimentacion}
                  />
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Actualizar Proyecto
                </button>

              </Form>

              {/* Bloque para mostrar errores generales */}
              {Object.keys(errors).length > 0 && touched && !isValid && (
                <div className="error-summary">
                  <ErrorIcon style={{ color: 'red', marginRight: '5px' }} />
                  <p>Por favor, revisa el formulario. Los siguientes campos tienen errores:</p>
                  <ul>
                    {Object.keys(errors).map((field) => (
                      <li key={field} className="error-item">
                        {fieldLabels[field] || field}: {errors[field]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mostrar errores generales si existen */}
              {errors.general && (
                <div className="error-message">
                  <ErrorIcon style={{ color: 'red', marginRight: '5px' }} />
                  {errors.general}
                </div>
              )}
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>

          )}
        </Formik>
      )}

      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="Proyecto Actualizado"
        css={globalModalStyles}
      >
        <h2>Proyecto actualizado exitosamente</h2>
        <button onClick={closeModal}>He finalizado</button>
      </StyledModal>
    </div >
  );
};

/// Componente FieldGroup para simplificar la creación de campos, ahora con soporte para Tooltip y notas
const FieldGroup = ({ label, name, note, tooltipHelp, tooltipObservation, children, disabled, ...props }) => (
  <div className="form-group">
    <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
      {label}
      <div className="tooltip-icon-container">
        {tooltipHelp && (
          <div className="tooltip-icon-support">
            <ContactSupportIcon style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--doradoOsc)' }} />
            <TooltipHelp id={`${name}-help`} text={tooltipHelp} />
          </div>
        )}
        {tooltipObservation && (
          <div className="tooltip-icon-support">
            <CustomTooltip id={`observacion_${name}`} text={tooltipObservation} />
          </div>
        )}
      </div>
    </label>

    {/* Renderiza children si existe, de lo contrario un Field de Formik */}
    {children ? (children) : (<Field id={name} name={name} disabled={disabled} {...props} />)}
    {note && <p className="field-note">{note}</p>}
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

// CustomSelectField ahora admite dos estados de deshabilitado y dos tooltips
const CustomSelectField = ({
  label,
  options,
  name,
  placeholder,
  disabled = false,
  isDisabled = false,
  tooltipHelp = '',
  tooltipObservation = '',
  isMulti = false,
  onChange,
}) => {
  const [field, , helpers] = useField(name);

  // Determina si el componente está deshabilitado
  const finalDisabled = disabled || isDisabled;

  const handleChange = selectedOptions => {
    if (isMulti) {
      const selectedValues = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
      helpers.setValue(selectedValues);
    } else {
      helpers.setValue(selectedOptions ? selectedOptions.value : '');
    }
    if (onChange) onChange(selectedOptions);
  };

  const selectedOption = React.useMemo(() => {
    if (!options) return isMulti ? [] : null;
    return isMulti
      ? options.filter(opt => field.value.includes(opt.value))
      : options.find(opt => opt.value === field.value) || null;
  }, [field.value, options, isMulti]);

  return (
    <div className="form-group" style={{ borderRadius: '15px' }}>
      <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
        {label}
        <div className="tooltip-icon-container">
          {tooltipHelp && (
            <div className="tooltip-icon-support">
              <ContactSupportIcon style={{ marginLeft: 5, cursor: 'pointer', color: 'var(--doradoOsc)' }} />
              <TooltipHelp id={`${name}-help`} text={tooltipHelp} />
            </div>
          )}
          {tooltipObservation && (
            <div className="tooltip-icon-support">
              <CustomTooltip id={`observacion_${name}`} text={tooltipObservation} />
            </div>
          )}
        </div>
      </label>

      <Select
        className="form-select"
        id={name}
        options={options}
        name={name}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={finalDisabled}
        isMulti={isMulti}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }),
          control: base => ({ ...base, borderRadius: 15 }),
        }}
        menuPlacement="auto"
      />

      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

// Implementación del Select con optgroup
const CustomSelectFieldGrouped = ({
  label,
  options,
  name,
  placeholder,
  disabled = false,
  isDisabled = false,
  tooltipHelp = '',
  tooltipObservation = '',
  onChange,
}) => {
  const [field, , helpers] = useField(name);
  const finalDisabled = disabled || isDisabled;

  const handleChange = selectedOption => {
    helpers.setValue(selectedOption ? selectedOption.value : '');
    if (onChange) onChange(selectedOption);
  };

  const selectedOption = React.useMemo(() => {
    if (!options) return null;
    for (const group of options) {
      const found = group.options.find(opt => opt.value === field.value);
      if (found) return found;
    }
    return null;
  }, [field.value, options]);

  return (
    <div className="form-group" style={{ borderRadius: '15px' }}>
      <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
        {label}
        <div className="tooltip-icon-container">
          {tooltipHelp && (
            <div className="tooltip-icon-support">
              <ContactSupportIcon style={{ marginLeft: 5, cursor: 'pointer', color: 'var(--doradoOsc)' }} />
              <TooltipHelp id={`${name}-help`} text={tooltipHelp} />
            </div>
          )}
          {tooltipObservation && (
            <div className="tooltip-icon-support">
              <CustomTooltip id={`observacion_${name}`} text={tooltipObservation} />
            </div>
          )}
        </div>
      </label>

      <Select
        className="form-select"
        id={name}
        options={options}
        name={name}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={finalDisabled}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }),
          control: base => ({ ...base, borderRadius: 15 }),
        }}
        menuPlacement="auto"
      />

      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default EditProject;