// EditProject.js
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import CustomTooltip from './Tooltip'; 
import {
  municipiosDeHidalgo,
  unidadesResponsables,
  dependencias,
  organismos,
  municipiosPorRegion,
  unidadPresupuestalPorUnidadResponsable,
  gastoProgramableOptions,
  programaPresupuestarioOptions,
  indicadoresEstrategicosOptions,
  indicadoresTacticosOptions,
  sectorOptions,
  tipoProyectoOptions,
  programasSectorialesOptions
} from '../../utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import './ClientPanel.css'; // Importar estilos

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

const validationSchemaStep2 = Yup.object().shape({
  projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
  sector: Yup.string().required('El sector es obligatorio'),
  tipoProyecto: Yup.string().required('El tipo de proyecto es obligatorio'),
  dependencia: Yup.string().when('entityType', {
    is: 'Dependencia',
    then: Yup.string().required('La dependencia es obligatoria'),
  }),
  organismo: Yup.string().when('entityType', {
    is: 'Organismo',
    then: Yup.string().required('El organismo es obligatorio'),
  }),
  municipio: Yup.string().when('entityType', {
    is: 'Municipio',
    then: Yup.string().required('El municipio es obligatorio'),
  }),
  PeticionPersonal: Yup.string().when('entityType', {
    is: 'Petición Personal',
    then: Yup.string().required('El sector privado es obligatorio'),
  }),
  montoFederal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
  montoEstatal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
  montoMunicipal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
  montoOtros: Yup.number().min(0, 'El monto no puede ser negativo').nullable().default('N/A'),
  descripcion: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La descripción es obligatoria'),
  situacionSinProyecto: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La situación sin el proyecto es obligatoria'),
  objetivos: Yup.string().max(500, 'Máximo 500 caracteres').required('Los objetivos son obligatorios'),
  metas: Yup.string().max(500, 'Máximo 500 caracteres').required('Las metas son obligatorias'),
  programaPresupuestario: Yup.string().required('El programa presupuestario es obligatorio'),
  beneficiarios: Yup.number().min(1, 'El número de beneficiarios es obligatorio').nullable(),
  alineacionNormativa: Yup.string().max(200, 'Máximo 200 caracteres').required('La alineación normativa es obligatoria'),
  region: Yup.string().required('La región es obligatoria'),
  latitud: Yup.number().required('La latitud es obligatoria'),
  longitud: Yup.number().required('La longitud es obligatoria'),
  planNacional: Yup.string().required('El plan nacional de desarrollo es obligatorio'),
  planEstatal: Yup.string().required('El plan estatal de desarrollo es obligatorio'),
  planMunicipal: Yup.string().when('entityType', {
    is: 'Municipio',
    then: Yup.string().max(500, 'Máximo 500 caracteres').required('El plan municipal es obligatorio'),
  }),
  ods: Yup.string().required('Los objetivos de desarrollo sostenible son obligatorios'),
  planSectorial: Yup.string().required('El plan sectorial institucional es obligatorio'),
  unidadResponsable: Yup.string().required('La unidad responsable es obligatoria'),
  unidadPresupuestal: Yup.string().required('La unidad presupuestal es obligatoria'),
  ramoPresupuestal: Yup.string().required('El ramo presupuestal es obligatorio'),
  municipiosImpacto: Yup.array().nullable(),
  observaciones: Yup.string().max(1000, 'Máximo 1000 caracteres'),
  gastoProgramable: Yup.string().required('El gasto programable es obligatorio'),
  indicadoresEstrategicos: Yup.string().required('Los indicadores estratégicos son obligatorios'),
  indicadoresTacticos: Yup.string().test('indicadoresTacticos', 'Los indicadores tácticos son obligatorios', function (value) {
    const { entityType, dependencia } = this.parent;
    if (entityType === 'Dependencia' && dependencia !== 'Secretaría del Despacho del Gobernador') {
      return value === 'No Aplica' || Boolean(value);
    }
    return true;
  }),
  indicadoresDesempeno: Yup.string().required('Los indicadores de desempeño son obligatorios'),
  indicadoresRentabilidad: Yup.string().required('Los indicadores de rentabilidad son obligatorios'),
  estadoInicial: Yup.mixed().required('La foto del estado inicial es obligatoria'),
  estadoConProyecto: Yup.mixed().required('La foto del estado con proyecto es obligatoria'),
});

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
  const [generatedId, setGeneratedId] = useState('');
  const { projectId  } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/proyecto/${projectId}/`);
        setProject(response.data);
        setSelectedRegion(response.data.region);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('project_name', values.projectName);
      formData.append('sector', values.sector);
      formData.append('tipo_proyecto', values.tipoProyecto);
      formData.append('tipo_entidad', values.entityType);
      formData.append('dependencia', values.dependencia || 'No Aplica');
      formData.append('organismo', values.organismo || 'No Aplica');
      formData.append('municipio', values.municipio || 'No Aplica');
      formData.append('municipioEnd', values.municipioEnd || 'No Aplica');
      formData.append('peticion_personal', values.PeticionPersonal || 'No Aplica');
      formData.append('monto_federal', parseFloat(values.montoFederal) || 0);
      formData.append('monto_estatal', parseFloat(values.montoEstatal) || 0);
      formData.append('monto_municipal', parseFloat(values.montoMunicipal) || 0);
      formData.append('monto_otros', parseFloat(values.montoOtros) || 0);
      formData.append('inversion_estimada', parseFloat(values.inversionEstimada) || 0);
      formData.append('descripcion', values.descripcion);
      formData.append('situacion_sin_proyecto', values.situacionSinProyecto);
      formData.append('objetivos', values.objetivos);
      formData.append('metas', values.metas);
      formData.append('programa_presupuestario', values.programaPresupuestario);
      formData.append('beneficiarios', values.beneficiarios || 0);
      formData.append('alineacion_normativa', values.alineacionNormativa);
      formData.append('region', values.region);
      formData.append('latitud', parseFloat(values.latitud));
      formData.append('longitud', parseFloat(values.longitud));
      formData.append('plan_nacional', values.planNacional);
      formData.append('plan_estatal', values.planEstatal);
      formData.append('plan_municipal', values.planMunicipal || 'No Aplica');
      formData.append('ods', values.ods);
      formData.append('plan_sectorial', values.planSectorial || 'No Aplica');
      formData.append('unidad_responsable', values.unidadResponsable);
      formData.append('unidad_presupuestal', values.unidadPresupuestal);
      formData.append('ramo_presupuestal', values.ramoPresupuestal);

      if (values.municipiosImpacto && values.municipiosImpacto.length > 0) {
        const municipiosImpactoJson = JSON.stringify(values.municipiosImpacto.map(mun => mun.value));
        formData.append('municipios_impacto', municipiosImpactoJson);
      } else {
        formData.append('municipios_impacto', '[]');
      }

      formData.append('localidad', values.localidad || 'No Aplica');
      formData.append('barrio_colonia_ejido', values.barrio_colonia_ejido || 'No Aplica');
      formData.append('observaciones', values.observaciones || 'No Aplica');
      formData.append('gasto_programable', values.gastoProgramable);
      formData.append('indicadores_estrategicos', values.indicadoresEstrategicos);
      formData.append('indicadores_tacticos', values.indicadoresTacticos || 'No Aplica');
      formData.append('indicadores_desempeno', values.indicadoresDesempeno || 'No Aplica');
      formData.append('indicadores_rentabilidad', values.indicadoresRentabilidad || 'No Aplica');
      formData.append('estado_inicial', values.estadoInicial);
      formData.append('estado_con_proyecto', values.estadoConProyecto);

      for (const key in applies) {
        if (applies[key]) {
          for (const file of values[key]) {
            formData.append(key, file);
          }
        }
      }

      const csrfToken = Cookies.get('csrftoken');

      await axios.put(`/proyecto/${projectId}/`, formData, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'multipart/form-data'
        }
      });

      setGeneratedId(values.projectName);
      setModalIsOpen(true);

      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error.response ? error.response.data : error);
      alert(`Ocurrió un error al actualizar el proyecto: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/panel-usuario'); // Redirigir a otra página después de cerrar el modal
  };

  const formatCurrency = (value) => {
    return value ? `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '';
  };

  const calculateTotal = (values) => {
    const { montoFederal, montoEstatal, montoMunicipal, montoOtros } = values;
    const total = (parseFloat(montoFederal) || 0) + (parseFloat(montoEstatal) || 0) + (parseFloat(montoMunicipal) || 0) + (parseFloat(montoOtros) || 0);
    return formatCurrency(total);
  };

  const handleApplyChange = (field) => {
    setApplies((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const municipiosOptions = [{ value: 'No Aplica', label: 'No Aplica' }, ...municipiosDeHidalgo.map(mun => ({ value: mun, label: mun }))];

  const handleMunicipiosImpactoChange = (selectedOptions, setFieldValue) => {
    if (selectedOptions.some(option => option.value === 'No Aplica')) {
      setFieldValue('municipiosImpacto', [{ value: 'No Aplica', label: 'No Aplica' }]);
    } else {
      setFieldValue('municipiosImpacto', selectedOptions);
    }
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
            projectName: project.project_name || '',
            sector: project.sector || '',
            tipoProyecto: project.tipo_proyecto || '',
            entityType: project.tipo_entidad || '',
            dependencia: project.dependencia || '',
            organismo: project.organismo || '',
            municipio: project.municipio || '',
            PeticionPersonal: project.peticion_personal || '',
            montoFederal: project.monto_federal || '0',
            montoEstatal: project.monto_estatal || '0',
            montoMunicipal: project.monto_municipal || '0',
            montoOtros: project.monto_otros || '0',
            descripcion: project.descripcion || '',
            situacionSinProyecto: project.situacion_sin_proyecto || '',
            objetivos: project.objetivos || '',
            metas: project.metas || '',
            programaPresupuestario: project.programa_presupuestario || '',
            beneficiarios: project.beneficiarios || '',
            alineacionNormativa: project.alineacion_normativa || '',
            region: project.region || '',
            localidad: project.localidad || '',
            barrio_colonia_ejido: project.barrio_colonia_ejido || '',
            latitud: project.latitud || '',
            longitud: project.longitud || '',
            planNacional: project.plan_nacional || '',
            planEstatal: project.plan_estatal || '',
            planMunicipal: project.plan_municipal || '',
            ods: project.ods || '',
            planSectorial: project.plan_sectorial || '',
            unidadResponsable: project.unidad_responsable || '',
            unidadPresupuestal: project.unidad_presupuestal || '',
            ramoPresupuestal: project.ramo_presupuestal || '',
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
            municipiosImpacto: project.municipio_impacto ? project.municipio_impacto.map(mun => ({ value: mun, label: mun })) : [],
            observaciones: project.observaciones || '',
            gastoProgramable: project.gasto_programable || '',
            indicadoresEstrategicos: project.indicadores_estrategicos || '',
            indicadoresTacticos: project.indicadores_tacticos || '',
            indicadoresDesempeno: project.indicadores_desempeno || '',
            indicadoresRentabilidad: project.indicadores_rentabilidad || '',
            estadoInicial: null,
            estadoConProyecto: null,
          }}
          validationSchema={validationSchemaStep2}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div>
                <div className="titulosForm">
                  <h3>Datos Generales</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="DatosGenerales">
                  <div className="form-group projectDate">
                    <label>Fecha de Registro</label>
                    <Field type="text" name="fechaRegistro" value={new Date().toISOString().split('T')[0]} readOnly />
                  </div>

                  <div className="formThree">
                    <div className="form-group projectName">
                      <label>Nombre del Proyecto {project.observacion_project_name && (
                        <CustomTooltip id="observacion_project_name" text={project.observacion_project_name} />
                      )}</label>
                      <Field type="text" name="projectName" disabled={project.isBlocked_project_name} />
                      <ErrorMessage name="projectName" component="div" className="error" />
                    </div>
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

                  <div className="formTwo">
                    <div className="form-group entityType">
                      <label>Tipo de Entidad {project.observacion_tipo_entidad && (
                        <CustomTooltip id="observacion_tipo_entidad" text={project.observacion_tipo_entidad} />
                      )}</label>
                      <Field as="select" name="entityType" disabled={project.isBlocked_tipo_entidad}>
                        <option value="">Seleccione</option>
                        <option value="Dependencia">Dependencia</option>
                        <option value="Organismo">Organismo</option>
                        <option value="Municipio">Municipio</option>
                        <option value="Petición Personal">Petición Personal</option>
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

                    {values.entityType === 'Municipio' && (
                      <div className="form-group municipioEnd">
                        <label>Municipio {project.observacion_municipioEnd && (
                          <CustomTooltip id="observacion_municipioEnd" text={project.observacion_municipioEnd} />
                        )}</label>
                        <Field as="select" name="municipioEnd" disabled={project.isBlocked_municipioEnd}>
                          <option value="">Seleccione</option>
                          {municipiosDeHidalgo.map((mun) => (
                            <option key={mun} value={mun}>{mun}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="municipioEnd" component="div" className="error" />
                      </div>
                    )}

                    {values.entityType === 'Petición Personal' && (
                      <div className="form-group PeticionPersonal">
                        <label>Petición Personal {project.observacion_peticion_personal && (
                          <CustomTooltip id="observacion_peticion_personal" text={project.observacion_peticion_personal} />
                        )}</label>
                        <Field type="text" name="PeticionPersonal" disabled={project.isBlocked_peticion_personal} />
                        <ErrorMessage name="PeticionPersonal" component="div" className="error" />
                      </div>
                    )}
                  </div>

                  <div className="formTwo">
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
                  </div>

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

                <div className="titulosForm">
                  <h3>Fuentes de Financiamiento</h3>
                  <div className="linea_form"></div>
                </div>
                <div className="FuentesFinanciamiento">
                  <p>Si no recibes financiamiento de alguna de las siguientes fuentes, por favor, déjalo en cero.</p>
                  <div className="formFour">
                    <div className="form-group montoFederal">
                      <label>Monto Federal {project.observacion_monto_federal && (
                        <CustomTooltip id="observacion_monto_federal" text={project.observacion_monto_federal} />
                      )}</label>
                      <Field type="number" name="montoFederal" min="0"  disabled={project.isBlocked_monto_federal} onChange={(e) => {
                        setFieldValue('montoFederal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoFederal" component="div" className="error" />
                    </div>
                    <div className="form-group montoEstatal">
                      <label>Monto Estatal {project.observacion_monto_estatal && (
                        <CustomTooltip id="observacion_monto_estatal" text={project.observacion_monto_estatal} />
                      )}</label>
                      <Field type="number" name="montoEstatal" min="0" disabled={project.isBlocked_monto_estatal} onChange={(e) => {
                        setFieldValue('montoEstatal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoEstatal" component="div" className="error" />
                    </div>
                    <div className="form-group montoMunicipal">
                      <label>Monto Municipal {project.observacion_monto_municipal && (
                        <CustomTooltip id="observacion_monto_municipal" text={project.observacion_monto_municipal} />
                      )}</label>
                      <Field type="number" name="montoMunicipal" min="0" disabled={project.isBlocked_monto_municipal} onChange={(e) => {
                        setFieldValue('montoMunicipal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoMunicipal" component="div" className="error" />
                    </div>
                    <div className="form-group montoOtros">
                      <label>Otros {project.observacion_monto_otros && (
                        <CustomTooltip id="observacion_monto_otros" text={project.observacion_monto_otros} />
                      )}</label>
                      <Field type="number" name="montoOtros" min="0" defaultValue="N/A" disabled={project.isBlocked_monto_otros} onChange={(e) => {
                        setFieldValue('montoOtros', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoOtros" component="div" className="error" />
                    </div>
                  </div>

                  <div className="form-group inversionEstimada">
                    <label>Inversión Estimada {project.observacion_inversion_estimada && (
                      <CustomTooltip id="observacion_inversion_estimada" text={project.observacion_inversion_estimada} />
                    )}</label>
                    <Field type="text" name="inversionEstimada" readOnly disabled={project.isBlocked_inversion_estimada} value={calculateTotal(values)} />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Descripción del Proyecto</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="DescripcionProyecto">
                  <div className="form-group descripcion">
                    <label>Descripción {project.observacion_descripcion && (
                      <CustomTooltip id="observacion_descripcion" text={project.observacion_descripcion} />
                    )}</label>
                    <Field as="textarea" name="descripcion" maxLength="1000" disabled={project.isBlocked_descripcion}/>
                    <ErrorMessage name="descripcion" component="div" className="error" />
                    <div>Máximo 1000 caracteres</div>
                  </div>
                  <div className="form-group situacionSinProyecto">
                    <label>Situación sin el Programa o Proyecto de Inversión {project.observacion_situacion_sin_proyecto && (
                      <CustomTooltip id="observacion_situacion_sin_proyecto" text={project.observacion_situacion_sin_proyecto} />
                    )}</label>
                    <Field as="textarea" name="situacionSinProyecto" maxLength="1000" disabled={project.isBlocked_situacion_sin_proyecto}/>
                    <ErrorMessage name="situacionSinProyecto" component="div" className="error" />
                    <div>Máximo 1000 caracteres</div>
                  </div>
                  <div className="formTwo">
                    <div className="form-group objetivos">
                      <label>Objetivos {project.observacion_objetivos && (
                        <CustomTooltip id="observacion_objetivos" text={project.observacion_objetivos} />
                      )}</label>
                      <Field as="textarea" name="objetivos" maxLength="500" disabled={project.isBlocked_objetivos}/>
                      <ErrorMessage name="objetivos" component="div" className="error" />
                      <div>Máximo 500 caracteres</div>
                    </div>
                    <div className="form-group metas">
                      <label>Metas {project.observacion_metas && (
                        <CustomTooltip id="observacion_metas" text={project.observacion_metas} />
                      )}</label>
                      <Field as="textarea" name="metas" maxLength="500" disabled={project.isBlocked_metas}/>
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
                      <Field type="number" name="beneficiarios" min="1" disabled={project.isBlocked_beneficiarios}/>
                      <ErrorMessage name="beneficiarios" component="div" className="error" />
                    </div>
                    <div className="form-group alineacionNormativa">
                      <label>Leyes Aplicables Vigentes {project.observacion_alineacion_normativa && (
                        <CustomTooltip id="observacion_alineacion_normativa" text={project.observacion_alineacion_normativa} />
                      )}</label>
                      <Field as="textarea" name="alineacionNormativa" maxLength="200" placeholder="Leyes, Lineamientos, Manuales, Reglamentos , etc., que faciliten la implementación efectiva de los programas y/o proyectos." disabled={project.isBlocked_alineacion_normativa} />
                      <ErrorMessage name="alineacionNormativa" component="div" className="error" />
                      <div>Máximo 200 caracteres</div>
                    </div>
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Territorio y Georreferenciación</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="formFour">
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
                  <div className="form-group localidad">
                    <label>Localidad {project.observacion_localidad && (
                      <CustomTooltip id="observacion_localidad" text={project.observacion_localidad} />
                    )}</label>
                    <Field type="text" name="localidad" disabled={project.isBlocked_localidad}/>
                    <ErrorMessage name="localidad" component="div" className="error" />
                  </div>
                  <div className="form-group barrio_colonia_ejido">
                    <label>Barrio/Colonia/Ejido {project.observacion_barrio_colonia_ejido && (
                      <CustomTooltip id="observacion_barrio_colonia_ejido" text={project.observacion_barrio_colonia_ejido} />
                    )}</label>
                    <Field type="text" name="barrio_colonia_ejido" disabled={project.isBlocked_barrio_colonia_ejido}/>
                    <ErrorMessage name="barrio_colonia_ejido" component="div" className="error" />
                  </div>
                </div>
                <p>COORDENADAS GEOGRÁFICAS:</p>
                <div className="formTwo">
                  <div className="form-group latitud">
                    <label>Latitud {project.observacion_latitud && (
                      <CustomTooltip id="observacion_latitud" text={project.observacion_latitud} />
                    )}</label>
                    <Field type="number" name="latitud" step="any" placeholder="Latitud (+), ej: 20.1224" disabled={project.isBlocked_latitud}/>
                    <ErrorMessage name="latitud" component="div" className="error" />
                  </div>
                  <div className="form-group longitud">
                    <label>Longitud {project.observacion_longitud && (
                      <CustomTooltip id="observacion_longitud" text={project.observacion_longitud} />
                    )}</label>
                    <Field type="number" name="longitud" step="any" placeholder="Longitud (-), ej: -98.7368" disabled={project.isBlocked_longitud}/>
                    <ErrorMessage name="longitud" component="div" className="error" />
                  </div>
                </div>

                <div className="form-group municipiosImpacto">
                  <label>Municipios de Impacto {project.observacion_municipiosImpacto && (
                    <CustomTooltip id="observacion_municipiosImpacto" text={project.observacion_municipiosImpacto} />
                  )}</label>
                  <p>Por favor, selecciona los municipios en los que se localiza el proyecto. Es importante que indiques todas las áreas de impacto para asegurarnos de que la información esté completa y precisa. En caso de que no fuera el caso seleccionar "No Aplica".</p>
                  <Select
                    name="municipiosImpacto"
                    options={municipiosOptions}
                    isMulti
                    onChange={(selectedOptions) => handleMunicipiosImpactoChange(selectedOptions, setFieldValue)}
                    value={values.municipiosImpacto}
                    placeholder="Municipios"
                  />
                  <ErrorMessage name="municipiosImpacto" component="div" className="error" />
                </div>

                <div className="titulosForm">
                  <h3>Alineación Estratégica</h3>
                  <div className="linea_form"></div>
                </div>

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
                      <Field as="textarea" name="planMunicipal" maxLength="500" disabled={project.isBlocked_plan_municipal}/>
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

                <div className="titulosForm">
                  <h3>Mecanismos de Evaluación y Seguimiento a Proyectos</h3>
                  <div className="linea_form"></div>
                </div>

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
                  <div className="form-group indicadoresTacticos">
                    <label>Indicadores Tácticos {project.observacion_indicadores_tacticos && (
                      <CustomTooltip id="observacion_indicadores_tacticos" text={project.observacion_indicadores_tacticos} />
                    )}</label>
                    {values.entityType === 'Dependencia' && values.dependencia !== 'Secretaría del Despacho del Gobernador' ? (
                      <Field as="select" name="indicadoresTacticos" disabled={project.isBlocked_indicadores_tacticos}>
                        <option value="">Seleccione</option>
                        {indicadoresTacticosOptions[values.dependencia]?.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                        <option value="No Aplica">No Aplica</option>
                      </Field>
                    ) : (
                      <Field type="text" name="indicadoresTacticos" value="No Aplica" readOnly />
                    )}
                    <ErrorMessage name="indicadoresTacticos" component="div" className="error" />
                  </div>
                </div>

                <div className="formTwo">
                  <div className="form-group indicadoresDesempeno">
                    <label>Indicadores de Desempeño {project.observacion_indicadores_desempeno && (
                      <CustomTooltip id="observacion_indicadores_desempeno" text={project.observacion_indicadores_desempeno} />
                    )}</label>
                    <Field as="textarea" name="indicadoresDesempeno" maxLength="1000" disabled={project.isBlocked_indicadores_desempeno}/>
                    <ErrorMessage name="indicadoresDesempeno" component="div" className="error" />
                  </div>
                  <div className="form-group indicadoresRentabilidad">
                    <label>Indicadores de Rentabilidad {project.observacion_indicadores_rentabilidad && (
                      <CustomTooltip id="observacion_indicadores_rentabilidad" text={project.observacion_indicadores_rentabilidad} />
                    )}</label>
                    <Field as="textarea" name="indicadoresRentabilidad" maxLength="1000" disabled={project.isBlocked_indicadores_rentabilidad}/>
                    <ErrorMessage name="indicadoresRentabilidad" component="div" className="error" />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Prospectiva del Programa</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="formTwo">
                  <div className="form-group estadoInicial">
                    <label>Estado Inicial (Fotografía) {project.observacion_estado_inicial && (
                      <CustomTooltip id="observacion_estado_inicial" text={project.observacion_estado_inicial} />
                    )}</label>
                    <input
                      type="file"
                      name="estadoInicial"
                      onChange={(event) => {
                        setFieldValue("estadoInicial", event.currentTarget.files[0]);
                      }}
                      accept=".jpeg,.jpg,.png"
                    />
                    <ErrorMessage name="estadoInicial" component="div" className="error" />
                  </div>
                  <div className="form-group estadoConProyecto">
                    <label>Estado con Proyecto (Proyección) {project.observacion_estado_con_proyecto && (
                      <CustomTooltip id="observacion_estado_con_proyecto" text={project.observacion_estado_con_proyecto} />
                    )}</label>
                    <input
                      type="file"
                      name="estadoConProyecto"
                      onChange={(event) => {
                        setFieldValue("estadoConProyecto", event.currentTarget.files[0]);
                      }}
                      accept=".jpeg,.jpg,.png"
                    />
                    <ErrorMessage name="estadoConProyecto" component="div" className="error" />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Rentabilidad / Estudios de Viabilidad Carga de Documentación</h3>
                  <div className="linea_form"></div>
                </div>
                <p>Si tienes algún estudio complementario, anéxalo en el campo que más se adecue.</p>
                <div className="RENTABILIDAD">
                  {[
                    { label: 'Estudios Prospectivos', field: 'estudiosProspectivos' },
                    { label: 'Estudios de Factibilidad', field: 'estudiosFactibilidad' },
                    { label: 'Análisis de Alternativas', field: 'analisisAlternativas' },
                    { label: 'Validación Normativa', field: 'validacionNormativa' },
                    { label: 'Liberación de Derecho de Vía', field: 'liberacionDerechoVia' },
                    { label: 'Situación sin Proyecto (Reporte Fotográfico)', field: 'situacionSinProyectoFotografico' },
                    { label: 'Situación con Proyecto (Proyección)', field: 'situacionConProyectoProyeccion' },
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
                            <Field type="checkbox" name={`applies.${field}`} checked={applies[field]} onChange={() => handleApplyChange(field)} />
                            Aplica
                          </label>
                          <label>
                            <Field type="checkbox" name={`applies.${field}`} checked={!applies[field]} onChange={() => handleApplyChange(field)} />
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
                                  <input
                                    type="file"
                                    onChange={(event) => {
                                      const files = Array.from(event.currentTarget.files);
                                      files.forEach(file => setFieldValue(`${field}.${index}`, file));
                                    }}
                                    accept=".pdf,.xlsx,.jpeg,.dwg,.rtv,.mp4"
                                  />
                                  <button type="button" onClick={() => remove(index)}>Eliminar</button>
                                </div>
                              ))}
                              <button type="button" onClick={() => push(null)} className="add-file-button">
                                Agregar Archivo
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      )}
                      <ErrorMessage name={field} component="div" className="error" />
                    </div>
                  ))}
                </div>

                <div className="titulosForm">
                  <h3>Observaciones y Comentarios</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="form-group observaciones">
                  <label>Observaciones {project.observacion_observaciones && (
                    <CustomTooltip id="observacion_observaciones" text={project.observacion_observaciones} />
                  )}</label>
                  <Field as="textarea" name="observaciones" maxLength="1000" disabled={project.isBlocked_observaciones}/>
                  <ErrorMessage name="observaciones" component="div" className="error" />
                  <div>Máximo 1000 caracteres</div>
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Enviar
                </button>

              </div>
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
        <p>ID del Proyecto: {generatedId}</p>
        <button onClick={closeModal}>He finalizado</button>
      </StyledModal>

    </div>
  );
};

export default EditProject;
