import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
// import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import CustomTooltip from '../componentsForm/Tooltip';
import SectionTitle from '../componentsForm/SectionTitle';
import { municipiosDeHidalgo, unidadesResponsables, dependencias, organismos, municipiosPorRegion, unidadPresupuestalPorUnidadResponsable, gastoProgramableOptions, programaPresupuestarioOptions, indicadoresEstrategicosOptions, sectorOptions, tipoProyectoOptions, programasSectorialesOptions } from '../../../utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import '../panel/ClientPanel.css';

// import DocumentUploadSection from '../componentsForm/DocumentUploadSection';
import TooltipHelp from '../componentsForm/TooltipHelp';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

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

const EditProject = () => {
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
  const [selectedRegion, setSelectedRegion] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

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
        setSelectedRegion(response.data.region);

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

  const formatCurrency = (value) => {
    return value ? `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '';
  };

  const calculateTotal = (values) => {
    const { inversionFederal, inversionEstatal, inversionMunicipal, inversionOtros } = values;
    const total = (parseFloat(inversionFederal) || 0) + (parseFloat(inversionEstatal) || 0) + (parseFloat(inversionMunicipal) || 0) + (parseFloat(inversionOtros) || 0);
    return formatCurrency(total);
  };

  const handleApplyChange = (field) => {
    setApplies((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // const municipiosOptions = [{ value: 'No Aplica', label: 'No Aplica' }, ...municipiosDeHidalgo.map(mun => ({ value: mun, label: mun }))];

  // const handleMunicipiosImpactoChange = (selectedOptions, setFieldValue) => {
  //   if (selectedOptions.some(option => option.value === 'No Aplica')) {
  //     setFieldValue('municipiosImpacto', [{ value: 'No Aplica', label: 'No Aplica' }]);
  //   } else {
  //     setFieldValue('municipiosImpacto', selectedOptions);
  //   }
  // };

  return (
    <div className="formulario-container">
      <div className="formTitulo">
        <img src={`${imgBasePath}formIco.webp`} alt="img_representativa" />
        <h3>REGISTRO DE PROYECTO</h3>
      </div>
      {project && (
        <Formik
          initialValues={{
            nombreProyecto: project.nombre_proyecto || '',
            sector: project.sector || '',
            tipoProyecto: project.tipo_proyecto || '',
            entityType: project.tipo_entidad || '',
            dependencia: project.dependencia || '',
            organismo: project.organismo || '',
            municipio: project.municipio || '',
            inversionFederal: project.inversion_federal?.toString() || '0',
            inversionEstatal: project.inversion_estatal?.toString() || '0',
            inversionMunicipal: project.inversion_municipal?.toString() || '0',
            inversionOtros: project.inversion_otros?.toString() || '0',
            descripcion: project.descripcion || '',
            situacionSinProyecto: project.situacion_sin_proyecto || '',
            objetivos: project.objetivos || '',
            metas: project.metas || '',
            programaPresupuestario: project.programa_presupuestario || '',
            beneficiarios: project.beneficiarios?.toString() || '',
            tiempo_ejecucion: project.tiempo_ejecucion?.toString() || '',
            modalidad_ejecucion: project.modalidad_ejecucion || '',
            alineacionNormativa: project.alineacion_normativa || '',
            region: project.region || '',
            localidad: project.localidad || '',
            barrio_colonia: project.barrio_colonia || '',
            tipo_localidad: project.tipo_localidad || '',
            latitud: project.latitud?.toString() || '',
            longitud: project.longitud?.toString() || '',
            planNacional: project.plan_nacional || '',
            planEstatal: project.plan_estatal || '',
            planMunicipal: project.plan_municipal || '',
            ods: project.ods || '',
            planSectorial: project.plan_sectorial || '',
            unidadResponsable: project.unidad_responsable || '',
            unidadPresupuestal: project.unidad_presupuestal || '',
            ramoPresupuestal: project.ramo_presupuestal || '',

            // Documentos (arrays de archivos o URLs)
            estudiosProspectivos: project.estudios_prospectivos || [],
            estudiosFactibilidad: project.estudios_factibilidad || [],
            analisisAlternativas: project.analisis_alternativas || [],
            validacionNormativa: project.validacion_normativa || [],
            liberacionDerechoVia: project.liberacion_derecho_via || [],
            situacionSinProyectoFotografico: project.situacion_sin_proyecto_fotografico || [],
            situacionConProyectoProyeccion: project.situacion_con_proyecto_proyeccion || [],
            analisisCostoBeneficio: project.analisis_costo_beneficio || [],
            expedienteTecnico: project.expediente_tecnico || [],
            proyectoEjecutivo: project.proyecto_ejecutivo || [],
            manifestacionImpactoAmbiental: project.manifestacion_impacto_ambiental || [],
            otrosEstudios: project.otros_estudios || [],

            // Archivos individuales
            estadoInicial: project.estado_inicial || null,
            estadoConProyecto: project.estado_con_proyecto || null,

            // Otras observaciones e indicadores
            observaciones: project.observaciones || '',
            gastoProgramable: project.gasto_programable || '',
            indicadoresEstrategicos: project.indicadores_estrategicos || '',
            indicadores_socioeconomicos: project.indicadores_socioeconomicos || '',
            indicadoresDesempeno: project.indicadores_desempeno || '',
            indicadoresRentabilidad: project.indicadores_rentabilidad || '',

          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const formData = new FormData();

              // --- Campos básicos ---
              formData.append('nombre_proyecto', values.nombreProyecto);
              formData.append('sector', values.sector);
              formData.append('tipo_proyecto', values.tipoProyecto);
              formData.append('tipo_entidad', values.entityType);
              formData.append('dependencia', values.dependencia);
              formData.append('organismo', values.organismo);
              formData.append('municipio', values.municipio);

              // --- Fuentes de inversión ---
              formData.append('inversion_federal', parseFloat(values.inversionFederal) || 0);
              formData.append('inversion_estatal', parseFloat(values.inversionEstatal) || 0);
              formData.append('inversion_municipal', parseFloat(values.inversionMunicipal) || 0);
              formData.append('inversion_otros', parseFloat(values.inversionOtros) || 0);

              // --- Descripción y metas ---
              formData.append('descripcion', values.descripcion);
              formData.append('situacion_sin_proyecto', values.situacionSinProyecto);
              formData.append('objetivos', values.objetivos);
              formData.append('metas', values.metas);
              formData.append('programa_presupuestario', values.programaPresupuestario);
              formData.append('beneficiarios', parseInt(values.beneficiarios, 10) || 0);
              formData.append('tiempo_ejecucion', parseInt(values.tiempo_ejecucion, 10) || 0);
              formData.append('modalidad_ejecucion', values.modalidad_ejecucion);
              formData.append('alineacion_normativa', values.alineacionNormativa);

              // --- Ubicación y georreferenciación ---
              formData.append('region', values.region);
              formData.append('localidad', values.localidad);
              formData.append('barrio_colonia', values.barrio_colonia);
              formData.append('tipo_localidad', values.tipo_localidad);
              formData.append('latitud', parseFloat(values.latitud) || 0);
              formData.append('longitud', parseFloat(values.longitud) || 0);

              // --- Alineación estratégica ---
              formData.append('plan_nacional', values.planNacional);
              formData.append('plan_estatal', values.planEstatal);
              formData.append('plan_municipal', values.planMunicipal);
              formData.append('ods', values.ods);
              formData.append('plan_sectorial', values.planSectorial);

              // --- Unidades y ramo presupuestal ---
              formData.append('unidad_responsable', values.unidadResponsable);
              formData.append('unidad_presupuestal', values.unidadPresupuestal);
              formData.append('ramo_presupuestal', values.ramoPresupuestal);

              // --- Municipios de impacto (si aplica) ---
              const impacto = values.municipiosImpacto || [];
              formData.append('municipios_impacto', JSON.stringify(impacto.map(m => m.value)));

              // --- Documentos (archivos) según applies ---
              for (const key in applies) {
                if (applies[key] && Array.isArray(values[key])) {
                  values[key].forEach(file => {
                    if (file instanceof File) {
                      formData.append(key, file);
                    }
                  });
                }
              }

              // --- Archivos individuales ---
              if (values.estadoInicial instanceof File) {
                formData.append('estado_inicial', values.estadoInicial);
              }
              if (values.estadoConProyecto instanceof File) {
                formData.append('estado_con_proyecto', values.estadoConProyecto);
              }

              // --- Observaciones e indicadores ---
              formData.append('observaciones', values.observaciones);
              formData.append('gasto_programable', values.gastoProgramable);
              formData.append('indicadores_estrategicos', values.indicadoresEstrategicos);
              formData.append('indicadores_socioeconomicos', values.indicadores_socioeconomicos);
              formData.append('indicadores_desempeno', values.indicadoresDesempeno);
              formData.append('indicadores_rentabilidad', values.indicadoresRentabilidad);

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
              console.error('Error al actualizar el proyecto:', error.response ? error.response.data : error);
              alert(`Ocurrió un error al actualizar el proyecto: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <SectionTitle title="Generalidades del Proyecto" />
              <div className="form-row">
                <div className="form-group projectDate">
                  <label>Fecha de Registro</label>
                  <Field type="text" name="fechaRegistro" value={new Date().toISOString().split('T')[0]} readOnly />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group entityType">
                  <label>Tipo de Entidad {project.observacion_tipo_entidad && (
                    <CustomTooltip id="observacion_tipo_entidad" text={project.observacion_tipo_entidad} />
                  )}</label>
                  <Field as="select" name="entityType" disabled={project.isBlocked_tipo_entidad}>
                    <option value="">Seleccione</option>
                    <option value="Dependencia">Dependencia</option>
                    <option value="Organismo">Organismo</option>
                    <option value="Ayuntamiento">Ayuntamiento</option>
                  </Field>
                  <ErrorMessage name="entityType" component="div" className="error" />
                </div>

                {values.entityType === 'Dependencia' && (
                  <div className="form-group dependencia">
                    <label>Dependencia {project.observacion_dependencia && (
                      <CustomTooltip id="observacion_dependencia" text={project.observacion_dependencia} />
                    )}</label>
                    <Field as="select" name="dependencia" disabled={project.isBlocked_dependencia} onChange={(e) => {
                      setFieldValue('dependencia', e.target.value);
                      const programaSectorial = programasSectorialesOptions[e.target.value] || 'No Aplica';
                      setFieldValue('planSectorial', programaSectorial);
                    }}>
                      <option value="">Seleccione</option>
                      {dependencias.map((dep) => (
                        <option key={dep} value={dep}>{dep}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="dependencia" component="div" className="error" />
                  </div>
                )}

                {values.entityType === 'Organismo' && (
                  <div className="form-group organismo">
                    <label>Organismo {project.observacion_organismo && (
                      <CustomTooltip id="observacion_organismo" text={project.observacion_organismo} />
                    )}</label>
                    <Field as="select" name="organismo" disabled={project.isBlocked_organismo} onChange={(e) => {
                      setFieldValue('organismo', e.target.value);
                      const programaSectorial = programasSectorialesOptions[e.target.value] || 'No Aplica';
                      setFieldValue('planSectorial', programaSectorial);
                    }}>
                      <option value="">Seleccione</option>
                      {organismos.map((org) => (
                        <option key={org} value={org}>{org}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="organismo" component="div" className="error" />
                  </div>
                )}

                {values.entityType === 'Ayuntamiento' && (
                  <div className="form-group municipio_ayuntamiento">
                    <label>Municipio {project.observacion_municipio_ayuntamiento && (
                      <CustomTooltip id="observacion_municipio_ayuntamiento" text={project.observacion_municipio_ayuntamiento} />
                    )}</label>
                    <Field as="select" name="municipio_ayuntamiento" disabled={project.isBlocked_municipio_ayuntamiento}>
                      <option value="">Seleccione</option>
                      {municipiosDeHidalgo.map((mun) => (
                        <option key={mun} value={mun}>{mun}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="municipio_ayuntamiento" component="div" className="error" />
                  </div>
                )}

                <FieldGroup
                  name="nombreProyecto"
                  label="Nombre del Proyecto"
                  type="text"
                  disabled={project.isBlocked_nombre_proyecto}
                  tooltipHelp="Explicación de este campo"
                  tooltipObservation={project.observacion_nombre_proyecto}
                />
              </div>

              <div className="form-row">
                <div className="form-group region">
                  <label>Región {project.observacion_region && (
                    <CustomTooltip id="observacion_region" text={project.observacion_region} />
                  )}</label>
                  <Field as="select" name="region" disabled={project.isBlocked_region} onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setFieldValue('region', e.target.value);
                    setFieldValue('municipio', '');
                  }}>
                    <option value="">Seleccione</option>
                    {Object.keys(municipiosPorRegion).map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="region" component="div" className="error" />
                </div>
                <div className="form-group municipio">
                  <label>Municipio {project.observacion_municipio && (
                    <CustomTooltip id="observacion_municipio" text={project.observacion_municipio} />
                  )}</label>
                  <Field as="select" name="municipio" disabled={project.isBlocked_municipio}>
                    <option value="">Seleccione</option>
                    {municipiosPorRegion[selectedRegion]?.map((mun) => (
                      <option key={mun} value={mun}>{mun}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="municipio" component="div" className="error" />
                </div>

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
                  tooltipText="Ingresa el barrio o colonia relacionado al proyecto. Máximo 250 caracteres."
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
                  tooltipText="Ingresa la latitud geográfica del proyecto. Debe ser un valor numérico."
                  type="number"
                  step="any"
                  placeholder="Latitud (ej. 20.1234)"
                  tooltipObservation={project.observacion_latitud}
                  disabled={project.isBlocked_latitud}
                />

                <FieldGroup
                  name="longitud"
                  label="Longitud"
                  tooltipText="Ingresa la longitud geográfica del proyecto. Debe ser un valor numérico."
                  type="number"
                  step="any"
                  placeholder="Longitud (ej. -99.5678)"
                  tooltipObservation={project.observacion_longitud}
                  disabled={project.isBlocked_longitud}
                />


                <div className="form-group tipo_localidad">
                  <label>Tipo de Localidad {project.observacion_tipo_localidad && (
                    <CustomTooltip id="observacion_tipo_localidad" text={project.observacion_tipo_localidad} />
                  )}</label>
                  <Field type="text" name="tipo_localidad" disabled={project.isBlocked_tipo_localidado} />
                  <ErrorMessage name="tipo_localidad" component="div" className="error" />
                </div>
              </div>

              <SectionTitle title="Estructura Presupuestal" />
              <div className="form-row">
                <div className="form-group sector">
                  <label>Sector {project.observacion_sector && (
                    <CustomTooltip id="observacion_sector" text={project.observacion_sector} />
                  )}</label>
                  <Field as="select" name="sector" disabled={project.isBlocked_sector} onChange={(e) => {
                    setFieldValue('sector', e.target.value);
                    const tipoProyecto = tipoProyectoOptions[e.target.value] || '';
                    setFieldValue('tipoProyecto', tipoProyecto);
                  }}>
                    <option value="">Seleccione</option>
                    {sectorOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="sector" component="div" className="error" />
                </div>
                <div className="form-group tipoProyecto">
                  <label>Tipo de Proyecto {project.observacion_tipo_proyecto && (
                    <CustomTooltip id="observacion_tipo_proyecto" text={project.observacion_tipo_proyecto} />
                  )}</label>
                  <Field type="text" name="tipoProyecto" readOnly />
                  <ErrorMessage name="tipoProyecto" component="div" className="error" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group unidadResponsable">
                  <label>Unidad Responsable {project.observacion_unidad_responsable && (
                    <CustomTooltip id="observacion_unidad_responsable" text={project.observacion_unidad_responsable} />
                  )}</label>
                  <Field as="select" name="unidadResponsable" disabled={project.isBlocked_unidad_responsable} onChange={(e) => {
                    setFieldValue('unidadResponsable', e.target.value);
                    setFieldValue('unidadPresupuestal', ''); // Reset unidadPresupuestal cuando unidadResponsable changes
                  }}>
                    <option value="">Seleccione</option>
                    {unidadesResponsables.map((unidad) => (
                      <option key={unidad} value={unidad}>{unidad}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="unidadResponsable" component="div" className="error" />
                </div>
                {values.unidadResponsable && (
                  <div className="form-group unidadPresupuestal">
                    <label>Unidad Presupuestal {project.observacion_unidad_presupuestal && (
                      <CustomTooltip id="observacion_unidad_presupuestal" text={project.observacion_unidad_presupuestal} />
                    )}</label>
                    <Field as="select" name="unidadPresupuestal" disabled={project.isBlocked_unidad_presupuestal}>
                      <option value="">Seleccione</option>
                      {unidadPresupuestalPorUnidadResponsable[values.unidadResponsable]?.map((unidad) => (
                        <option key={unidad} value={unidad}>{unidad}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="unidadPresupuestal" component="div" className="error" />
                  </div>
                )}

                <div className="form-group ramoPresupuestal">
                  <label>Ramo Presupuestal {project.observacion_ramo_presupuestal && (
                    <CustomTooltip id="observacion_ramo_presupuestal" text={project.observacion_ramo_presupuestal} />
                  )}</label>
                  <Field as="select" name="ramoPresupuestal" disabled={project.isBlocked_ramo_presupuestal}>
                    <option value="">Seleccione</option>
                    <optgroup label="Ramos Autónomos">
                      <option value="Legislativo">Legislativo</option>
                      <option value="Judicial">Judicial</option>
                      <option value="Electoral">Electoral</option>
                      <option value="Derechos Humanos">Derechos Humanos</option>
                      <option value="Acceso a la Información Pública Gubernamental">Acceso a la Información Pública Gubernamental</option>
                      <option value="Justicia Electoral">Justicia Electoral</option>
                    </optgroup>
                    <optgroup label="Ramos Administrativos">
                      <option value="Despacho del Poder Ejecutivo">Despacho del Poder Ejecutivo</option>
                      <option value="Gobierno">Gobierno</option>
                      <option value="Hacienda Pública">Hacienda Pública</option>
                      <option value="Bienestar e Inclusión Social">Bienestar e Inclusión Social</option>
                      <option value="Infraestructura Pública y Desarrollo Urbano Sostenible">Infraestructura Pública y Desarrollo Urbano Sostenible</option>
                      <option value="Medio Ambiente y Recursos Naturales">Medio Ambiente y Recursos Naturales</option>
                      <option value="Desarrollo Económico">Desarrollo Económico</option>
                      <option value="Agricultura y Desarrollo Rural">Agricultura y Desarrollo Rural</option>
                      <option value="Turismo">Turismo</option>
                      <option value="Contraloría">Contraloría</option>
                      <option value="Educación Pública">Educación Pública</option>
                      <option value="Salud">Salud</option>
                      <option value="Seguridad Pública">Seguridad Pública</option>
                      <option value="Trabajo y Previsión Social">Trabajo y Previsión Social</option>
                      <option value="Movilidad y Transporte">Movilidad y Transporte</option>
                      <option value="Cultura">Cultura</option>
                      <option value="Planeación y Prospectiva">Planeación y Prospectiva</option>
                      <option value="Administración">Administración</option>
                      <option value="Justicia">Justicia</option>
                    </optgroup>
                    <optgroup label="Ramos Generales">
                      <option value="Transferencias">Transferencias</option>
                      <option value="Participaciones a Municipios">Participaciones a Municipios</option>
                      <option value="Contingencias">Contingencias</option>
                      <option value="Provisiones Salariales">Provisiones Salariales</option>
                      <option value="Deuda Pública">Deuda Pública</option>
                      <option value="Adeudos de Ejercicios Fiscales Anteriores">Adeudos de Ejercicios Fiscales Anteriores</option>
                      <option value="Aportaciones a Municipios">Aportaciones a Municipios</option>
                      <option value="Erogaciones para las Operaciones y Programas de Saneamiento Financiero">Erogaciones para las Operaciones y Programas de Saneamiento Financiero</option>
                      <option value="Erogaciones para los Programas de Apoyo a Ahorradores y Deudores de la Banca">Erogaciones para los Programas de Apoyo a Ahorradores y Deudores de la Banca</option>
                      <option value="Inversión en Municipios">Inversión en Municipios</option>
                    </optgroup>
                  </Field>
                  <ErrorMessage name="ramoPresupuestal" component="div" className="error" />
                </div>
              </div>

              <SectionTitle title="Fuentes de Financiamiento" />
              <div className="FuentesFinanciamiento">
                <p>Si no recibes financiamiento de alguna de las siguientes fuentes, por favor, déjalo en cero.</p>
                <div className="form-row">
                  <div className="form-group inversionFederal">
                    <label>Monto Federal {project.observacion_inversion_federal && (
                      <CustomTooltip id="observacion_inversion_federal" text={project.observacion_inversion_federal} />
                    )}</label>
                    <Field type="number" name="inversionFederal" min="0" disabled={project.isBlocked_inversion_federal} onChange={(e) => {
                      setFieldValue('inversionFederal', e.target.value);
                      setFieldValue('inversionTotal', calculateTotal(values));
                    }} />
                    <ErrorMessage name="inversionFederal" component="div" className="error" />
                  </div>
                  <div className="form-group inversionMunicipal">
                    <label>Monto Municipal {project.observacion_inversion_municipal && (
                      <CustomTooltip id="observacion_inversion_municipal" text={project.observacion_inversion_municipal} />
                    )}</label>
                    <Field type="number" name="inversionMunicipal" min="0" disabled={project.isBlocked_inversion_municipal} onChange={(e) => {
                      setFieldValue('inversionMunicipal', e.target.value);
                      setFieldValue('inversionTotal', calculateTotal(values));
                    }} />
                    <ErrorMessage name="inversionMunicipal" component="div" className="error" />
                  </div>
                  <div className="form-group inversionOtros">
                    <label>Otros {project.observacion_inversion_otros && (
                      <CustomTooltip id="observacion_inversion_otros" text={project.observacion_inversion_otros} />
                    )}</label>
                    <Field type="number" name="inversionOtros" min="0" disabled={project.isBlocked_inversion_otros} onChange={(e) => {
                      setFieldValue('inversionOtros', e.target.value);
                      setFieldValue('inversionTotal', calculateTotal(values));
                    }} />
                    <ErrorMessage name="inversionOtros" component="div" className="error" />
                  </div>
                  <div className="form-group inversionEstatal">
                    <label>Monto Estatal {project.observacion_inversion_estatal && (
                      <CustomTooltip id="observacion_inversion_estatal" text={project.observacion_inversion_estatal} />
                    )}</label>
                    <Field type="number" name="inversionEstatal" min="0" disabled={project.isBlocked_inversion_estatal} onChange={(e) => {
                      setFieldValue('inversionEstatal', e.target.value);
                      setFieldValue('inversionTotal', calculateTotal(values));
                    }} />
                    <ErrorMessage name="inversionEstatal" component="div" className="error" />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group inversionTotal">
                  <label>Inversión Total {project.observacion_inversion_total && (
                    <CustomTooltip id="observacion_inversion_total" text={project.observacion_inversion_total} />
                  )}</label>
                  <Field type="text" name="inversionTotal" readOnly disabled={project.isBlocked_inversion_total} value={calculateTotal(values)} />
                </div>
              </div>

              <SectionTitle title="Descripción del Proyecto" />
              <div className="DescripcionProyecto">
                <div className="form-group descripcion">
                  <label>Descripción {project.observacion_descripcion && (
                    <CustomTooltip id="observacion_descripcion" text={project.observacion_descripcion} />
                  )}</label>
                  <Field as="textarea" name="descripcion" maxLength="1000" disabled={project.isBlocked_descripcion} />
                  <ErrorMessage name="descripcion" component="div" className="error" />
                  <div>Máximo 1000 caracteres</div>
                </div>
                <div className="form-group situacionSinProyecto">
                  <label>Situación sin el Programa o Proyecto de Inversión {project.observacion_situacion_sin_proyecto && (
                    <CustomTooltip id="observacion_situacion_sin_proyecto" text={project.observacion_situacion_sin_proyecto} />
                  )}</label>
                  <Field as="textarea" name="situacionSinProyecto" maxLength="1000" disabled={project.isBlocked_situacion_sin_proyecto} />
                  <ErrorMessage name="situacionSinProyecto" component="div" className="error" />
                  <div>Máximo 1000 caracteres</div>
                </div>
                <div className="formTwo">
                  <div className="form-group objetivos">
                    <label>Objetivos {project.observacion_objetivos && (
                      <CustomTooltip id="observacion_objetivos" text={project.observacion_objetivos} />
                    )}</label>
                    <Field as="textarea" name="objetivos" maxLength="500" disabled={project.isBlocked_objetivos} />
                    <ErrorMessage name="objetivos" component="div" className="error" />
                    <div>Máximo 500 caracteres</div>
                  </div>
                  <div className="form-group metas">
                    <label>Metas {project.observacion_metas && (
                      <CustomTooltip id="observacion_metas" text={project.observacion_metas} />
                    )}</label>
                    <Field as="textarea" name="metas" maxLength="500" disabled={project.isBlocked_metas} />
                    <ErrorMessage name="metas" component="div" className="error" />
                    <div>Máximo 500 caracteres</div>
                  </div>
                </div>

                <div className="formTwo">
                  <div className="form-group gastoProgramable">
                    <label>Gasto Programable {project.observacion_gasto_programable && (
                      <CustomTooltip id="observacion_gasto_programable" text={project.observacion_gasto_programable} />
                    )}</label>
                    <Field as="select" name="gastoProgramable" disabled={project.isBlocked_gasto_programable} onChange={(e) => setFieldValue('gastoProgramable', e.target.value)}>
                      <option value="">Seleccione</option>
                      {gastoProgramableOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="gastoProgramable" component="div" className="error" />
                  </div>
                  <div className="form-group programaPresupuestario">
                    <label>Programa Presupuestario {project.observacion_programa_presupuestario && (
                      <CustomTooltip id="observacion_programa_presupuestario" text={project.observacion_programa_presupuestario} />
                    )}</label>
                    <Field as="select" name="programaPresupuestario" disabled={project.isBlocked_programa_presupuestario}>
                      <option value="">Seleccione</option>
                      {programaPresupuestarioOptions[values.gastoProgramable]?.map((prog) => (
                        <option key={prog} value={prog}>{prog}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="programaPresupuestario" component="div" className="error" />
                  </div>
                </div>

                <div className="formTwo">
                  <div className="form-group beneficiarios">
                    <label>Beneficiarios {project.observacion_beneficiarios && (
                      <CustomTooltip id="observacion_beneficiarios" text={project.observacion_beneficiarios} />
                    )}</label>
                    <Field type="number" name="beneficiarios" min="1" disabled={project.isBlocked_beneficiarios} />
                    <ErrorMessage name="beneficiarios" component="div" className="error" />
                  </div>
                  <div className="form-group alineacionNormativa">
                    <label>Leyes Aplicables Vigentes {project.observacion_alineacion_normativa && (
                      <CustomTooltip id="observacion_alineacion_normativa" text={project.observacion_alineacion_normativa} />
                    )}</label>
                    <Field as="textarea" name="alineacionNormativa" maxLength="1500" placeholder="Leyes, Lineamientos, Manuales, Reglamentos , etc., que faciliten la implementación efectiva de los programas y/o proyectos." disabled={project.isBlocked_alineacion_normativa} />
                    <ErrorMessage name="alineacionNormativa" component="div" className="error" />
                    <div>Máximo 200 caracteres</div>
                  </div>
                </div>

                <div className="formTwo">
                  <div className="form-group beneficiarios">
                    <label>Tiempo de Ejecucion {project.observacion_tiempo_ejecucion && (
                      <CustomTooltip id="observacion_tiempo_ejecucion" text={project.observacion_tiempo_ejecucion} />
                    )}</label>
                    <Field type="number" name="tiempo_ejecucion" min="1" disabled={project.isBlocked_tiempo_ejecucion} />
                    <ErrorMessage name="tiempo_ejecucion" component="div" className="error" />
                  </div>
                  <div className="form-group planNacional">
                    <label>Plan Nacional de Desarrollo {project.observacion_modalidad_ejecucion && (
                      <CustomTooltip id="observacion_modalidad_ejecucion" text={project.observacion_modalidad_ejecucion} />
                    )}</label>
                    <Field as="select" name="modalidad_ejecucion" disabled={project.isBlocked_modalidad_ejecucion}>
                      <option value="">Seleccione</option>
                      <option value="Contrato">Contrato</option>
                      <option value="Administración de Obra">Administración de Obra</option>
                    </Field>
                    <ErrorMessage name="modalidad_ejecucion" component="div" className="error" />
                  </div>
                </div>
              </div>

              <SectionTitle title="Territorio y Georreferenciación" />

              <p>COORDENADAS GEOGRÁFICAS:</p>


              <SectionTitle title="Alineación Estratégica" />
              <div className="formTwo">
                <div className="form-group planNacional">
                  <label>Plan Nacional de Desarrollo {project.observacion_plan_nacional && (
                    <CustomTooltip id="observacion_plan_nacional" text={project.observacion_plan_nacional} />
                  )}</label>
                  <Field as="select" name="planNacional" disabled={project.isBlocked_plan_nacional}>
                    <option value="">Seleccione</option>
                    <option value="Justicia y Estado de derecho">Justicia y Estado de derecho</option>
                    <option value="Bienestar">Bienestar</option>
                    <option value="Desarrollo económico">Desarrollo económico</option>
                    <option value="Igualdad de género, no discriminación e inclusión">Igualdad de género, no discriminación e inclusión</option>
                    <option value="Combate a la corrupción y mejora de la gestión pública">Combate a la corrupción y mejora de la gestión pública</option>
                    <option value="Territorio y desarrollo sostenible">Territorio y desarrollo sostenible</option>
                  </Field>
                  <ErrorMessage name="planNacional" component="div" className="error" />
                </div>
                <div className="form-group planEstatal">
                  <label>Plan Estatal de Desarrollo {project.observacion_plan_estatal && (
                    <CustomTooltip id="observacion_plan_estatal" text={project.observacion_plan_estatal} />
                  )}</label>
                  <Field as="select" name="planEstatal" disabled={project.isBlocked_plan_estatal}>
                    <option value="">Seleccione</option>
                    <option value="Acuerdo para un Gobierno Cercano, Justo y Honesto">Acuerdo para un Gobierno Cercano, Justo y Honesto</option>
                    <option value="Acuerdo para el Bienestar del Pueblo">Acuerdo para el Bienestar del Pueblo</option>
                    <option value="Acuerdo para el Desarrollo Económico">Acuerdo para el Desarrollo Económico</option>
                    <option value="Acuerdo para el Desarrollo Sostenible e Infraestructura Transformadora">Acuerdo para el Desarrollo Sostenible e Infraestructura Transformadora</option>
                  </Field>
                  <ErrorMessage name="planEstatal" component="div" className="error" />
                </div>
              </div>

              <div>
                {values.entityType === 'Municipio' && (
                  <div className="form-group planMunicipal">
                    <label>Plan Municipal {project.observacion_plan_municipal && (
                      <CustomTooltip id="observacion_plan_municipal" text={project.observacion_plan_municipal} />
                    )}</label>
                    <Field as="textarea" name="planMunicipal" maxLength="500" disabled={project.isBlocked_plan_municipal} />
                    <ErrorMessage name="planMunicipal" component="div" className="error" />
                    <div>Máximo 500 caracteres</div>
                  </div>
                )}
              </div>

              <div className="formTwo">
                <div className="form-group ods">
                  <label>Objetivos de Desarrollo Sostenible {project.observacion_ods && (
                    <CustomTooltip id="observacion_ods" text={project.observacion_ods} />
                  )}</label>
                  <Field as="select" name="ods" disabled={project.isBlocked_ods}>
                    <option value="">Seleccione</option>
                    <option value="Fin de la pobreza">Fin de la pobreza</option>
                    <option value="Hambre cero">Hambre cero</option>
                    <option value="Salud y bienestar">Salud y bienestar</option>
                    <option value="Educación de calidad">Educación de calidad</option>
                    <option value="Igualdad de género">Igualdad de género</option>
                    <option value="Agua limpia y saneamiento">Agua limpia y saneamiento</option>
                    <option value="Energía asequible y no contaminante">Energía asequible y no contaminante</option>
                    <option value="Trabajo decente y crecimiento económico">Trabajo decente y crecimiento económico</option>
                    <option value="Industria, innovación e infraestructura">Industria, innovación e infraestructura</option>
                    <option value="Reducir las desigualdades">Reducir las desigualdades</option>
                    <option value="Ciudades y comunidades sostenibles">Ciudades y comunidades sostenibles</option>
                    <option value="Producción y consumo responsables">Producción y consumo responsables</option>
                    <option value="Acción por el clima">Acción por el clima</option>
                    <option value="Vida submarina">Vida submarina</option>
                    <option value="Vida de ecosistemas terrestres">Vida de ecosistemas terrestres</option>
                    <option value="Paz, justicia e instituciones sólidas">Paz, justicia e instituciones sólidas</option>
                    <option value="Alianzas para lograr los objetivos">Alianzas para lograr los objetivos</option>
                  </Field>
                  <ErrorMessage name="ods" component="div" className="error" />
                </div>
                <div className="form-group planSectorial">
                  <label>Programa Sectorial/Institucional/Especial {project.observacion_plan_sectorial && (
                    <CustomTooltip id="observacion_plan_sectorial" text={project.observacion_plan_sectorial} />
                  )}</label>
                  <Field type="text" name="planSectorial" readOnly />
                  <ErrorMessage name="planSectorial" component="div" className="error" />
                </div>
              </div>

              <SectionTitle title="Mecanismos de Evaluación y Seguimiento a Proyectos" />
              <div className="formTwo">
                <div className="form-group indicadoresEstrategicos">
                  <label>Indicadores Estratégicos {project.observacion_indicadores_estrategicos && (
                    <CustomTooltip id="observacion_indicadores_estrategicos" text={project.observacion_indicadores_estrategicos} />
                  )}</label>
                  <Field as="select" name="indicadoresEstrategicos" disabled={project.isBlocked_indicadores_estrategicos}>
                    <option value="">Seleccione</option>
                    {indicadoresEstrategicosOptions[values.planEstatal]?.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="indicadoresEstrategicos" component="div" className="error" />
                </div>
                <div className="form-group indicadores_socioeconomicos">
                  <label>indicadores Socioeconomicos {project.observacion_indicadores_socioeconomicos && (
                    <CustomTooltip id="observacion_indicadores_socioeconomicos" text={project.observacion_indicadores_socioeconomicos} />
                  )}</label>
                  <Field type="text" name="indicadores_socioeconomicos" disabled={project.isBlocked_indicadores_socioeconomicoso} />
                  <ErrorMessage name="indicadores_socioeconomicos" component="div" className="error" />
                </div>
              </div>

              <div className="formTwo">
                <div className="form-group indicadoresDesempeno">
                  <label>Indicadores de Desempeño {project.observacion_indicadores_desempeno && (
                    <CustomTooltip id="observacion_indicadores_desempeno" text={project.observacion_indicadores_desempeno} />
                  )}</label>
                  <Field as="textarea" name="indicadoresDesempeno" maxLength="1000" disabled={project.isBlocked_indicadores_desempeno} />
                  <ErrorMessage name="indicadoresDesempeno" component="div" className="error" />
                </div>
                <div className="form-group indicadoresRentabilidad">
                  <label>Indicadores de Rentabilidad {project.observacion_indicadores_rentabilidad && (
                    <CustomTooltip id="observacion_indicadores_rentabilidad" text={project.observacion_indicadores_rentabilidad} />
                  )}</label>
                  <Field as="textarea" name="indicadoresRentabilidad" maxLength="1000" disabled={project.isBlocked_indicadores_rentabilidad} />
                  <ErrorMessage name="indicadoresRentabilidad" component="div" className="error" />
                </div>
              </div>

              <SectionTitle title="Prospectiva del Programa" />
              <div className="formTwo">
                <div className="form-group estadoInicial">
                  <label>Estado Inicial (Fotografía) {project.observacion_estado_inicial && (
                    <CustomTooltip id="observacion_estado_inicial" text={project.observacion_estado_inicial} />
                  )}</label>
                  {project.isBlocked_estado_inicial && values.estadoInicial && typeof values.estadoInicial === 'string' ? (
                    <a href={values.estadoInicial} target="_blank" rel="noopener noreferrer">Ver archivo</a>
                  ) : (
                    <input
                      type="file"
                      name="estadoInicial"
                      onChange={(event) => {
                        setFieldValue("estadoInicial", event.currentTarget.files[0]);
                      }}
                      accept=".jpeg,.jpg,.png"
                      disabled={project.isBlocked_estado_inicial}
                    />
                  )}
                  <ErrorMessage name="estadoInicial" component="div" className="error" />
                </div>
                <div className="form-group estadoConProyecto">
                  <label>Estado con Proyecto (Proyección) {project.observacion_estado_con_proyecto && (
                    <CustomTooltip id="observacion_estado_con_proyecto" text={project.observacion_estado_con_proyecto} />
                  )}</label>
                  {project.isBlocked_estado_con_proyecto && values.estadoConProyecto && typeof values.estadoConProyecto === 'string' ? (
                    <a href={values.estadoConProyecto} target="_blank" rel="noopener noreferrer">Ver archivo</a>
                  ) : (
                    <input
                      type="file"
                      name="estadoConProyecto"
                      onChange={(event) => {
                        setFieldValue("estadoConProyecto", event.currentTarget.files[0]);
                      }}
                      accept=".jpeg,.jpg,.png"
                      disabled={project.isBlocked_estado_con_proyecto}
                    />
                  )}
                  <ErrorMessage name="estadoConProyecto" component="div" className="error" />
                </div>
              </div>

              <SectionTitle title="Rentabilidad / Estudios de Viabilidad Carga de Documentación" />
              <p>Si tienes algún estudio complementario, anéxalo en el campo que más se adecue.</p>
              <div className="RENTABILIDAD">
                {[
                  { label: 'Estudios Prospectivos', field: 'estudiosProspectivos' },
                  { label: 'Estudios de Factibilidad', field: 'estudiosFactibilidad' },
                  { label: 'Análisis de Alternativas', field: 'analisisAlternativas' },
                  { label: 'Validación Normativa', field: 'validacionNormativa' },
                  { label: 'Liberación de Derecho de Vía', field: 'liberacionDerechoVia' },
                  { label: 'Estado Inicial (Complemento)', field: 'situacionSinProyectoFotografico' },
                  { label: 'Estado con Proyecto (Complemento)', field: 'situacionConProyectoProyeccion' },
                  { label: 'Análisis Costo Beneficio (ACB)', field: 'analisisCostoBeneficio' },
                  { label: 'Expediente Técnico', field: 'expedienteTecnico' },
                  { label: 'Proyecto Ejecutivo', field: 'proyectoEjecutivo' },
                  { label: 'Manifestación Impacto Ambiental (MIA)', field: 'manifestacionImpactoAmbiental' },
                  { label: 'Otros Estudios y/o Documentos Que Complementen el Proyecto', field: 'otrosEstudios' },
                ].map(({ label, field }) => (
                  <div key={field} className="form-group CargaDocumentacion">
                    <div className='textAplica'>
                      <label>{label} {project[`observacion_${field}`] && (
                        <CustomTooltip id={`observacion_${field}`} text={project[`observacion_${field}`]} />
                      )}</label>
                      <div className="checkAplica">
                        <label>
                          <Field type="checkbox" name={`applies.${field}`} checked={applies[field]} onChange={() => handleApplyChange(field)} disabled={project[`isBlocked_${field}`]} />
                          Aplica
                        </label>
                        <label>
                          <Field type="checkbox" name={`applies.${field}`} checked={!applies[field]} onChange={() => handleApplyChange(field)} disabled={project[`isBlocked_${field}`]} />
                          No Aplica
                        </label>
                      </div>
                    </div>

                    {applies[field] && (
                      <FieldArray name={field}>
                        {({ push, remove }) => (
                          <div>
                            {values[field].map((file, index) => (
                              <div key={index} className="file-input-group">
                                {typeof file === 'string' ? (
                                  <a href={file} target="_blank" rel="noopener noreferrer">Ver archivo</a>
                                ) : (
                                  <>
                                    <input
                                      type="file"
                                      onChange={(event) => {
                                        const files = Array.from(event.currentTarget.files);
                                        files.forEach(file => setFieldValue(`${field}.${index}`, file));
                                      }}
                                      accept=".pdf,.xlsx,.jpeg,.dwg,.rtv,.mp4"
                                      disabled={project[`isBlocked_${field}`]}
                                    />
                                    <button type="button" onClick={() => remove(index)} disabled={project[`isBlocked_${field}`]}>Eliminar</button>
                                  </>
                                )}
                              </div>
                            ))}
                            <button type="button" onClick={() => push(null)} className="add-file-button" disabled={project[`isBlocked_${field}`]}>Agregar Archivo</button>
                          </div>
                        )}
                      </FieldArray>
                    )}
                    <ErrorMessage name={field} component="div" className="error" />
                  </div>
                ))}
              </div>

              <SectionTitle title="Observaciones y Comentarios" />
              <div className="form-group observaciones">
                <label>Observaciones {project.observacion_observaciones && (
                  <CustomTooltip id="observacion_observaciones" text={project.observacion_observaciones} />
                )}</label>
                <Field as="textarea" name="observaciones" maxLength="1000" disabled={project.isBlocked_observaciones} />
                <ErrorMessage name="observaciones" component="div" className="error" />
                <div>Máximo 1000 caracteres</div>
              </div>

              <button type="submit" disabled={isSubmitting}>
                Actualizar Proyecto
              </button>

            </Form>
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
    </div>
  );
};

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

export default EditProject;