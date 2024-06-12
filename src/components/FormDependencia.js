import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
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
} from '../utils';

const imgBasePath = "/img/";

const FormDependencia = () => {
  const [step, setStep] = useState(1);
  const [entityType, setEntityType] = useState('');
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

  const noSpacesValidation = (value) => {
    if (!value) return true;
    return !/\s/.test(value);
  };

  const validationSchemaStep1 = Yup.object().shape({
    nombreDependencia: Yup.string().required('El nombre de la dependencia es obligatorio'),
    areaAdscripcion: Yup.string().required('El área de adscripción es obligatoria'),
    nombreRegistrante: Yup.string().required('El nombre del registrante es obligatorio'),
    apellidoPaterno: Yup.string().required('El apellido paterno es obligatorio'),
    apellidoMaterno: Yup.string().required('El apellido materno es obligatorio'),
    correoInstitucional: Yup.string().email('Correo electrónico no válido').required('El correo institucional es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
    telefonoOficina: Yup.string().matches(/^\d{10}$/, 'El teléfono de oficina debe tener 10 dígitos').required('El teléfono de oficina es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
    correoPersonal: Yup.string().email('Correo electrónico no válido').required('El correo personal es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
    telefonoParticular: Yup.string().matches(/^\d{10}$/, 'El teléfono particular debe tener 10 dígitos').required('El teléfono particular es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
  });

  const validationSchemaStep2 = Yup.object().shape({
    projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
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
    planMunicipal: Yup.string().when('entityType', { // Agregado aquí
      is: 'Municipio',
      then: Yup.string().max(500, 'Máximo 500 caracteres').required('El plan municipal es obligatorio'),
    }),
    ods: Yup.string().required('Los objetivos de desarrollo sostenible son obligatorios'),
    planSectorial: Yup.string().required('El plan sectorial institucional es obligatorio'),
    unidadResponsable: Yup.string().required('La unidad responsable es obligatoria'),
    unidadPresupuestal: Yup.string().required('La unidad presupuestal es obligatoria'),
    ramoPresupuestal: Yup.string().required('El ramo presupuestal es obligatorio'),
    observaciones: Yup.string().max(1000, 'Máximo 1000 caracteres'),
    gastoProgramable: Yup.string().required('El gasto programable es obligatorio'),
    indicadoresEstrategicos: Yup.string().required('Los indicadores estratégicos son obligatorios'),
    indicadoresTacticos: Yup.string().required('Los indicadores tácticos son obligatorios'),
    indicadoresDesempeno: Yup.string().required('Los indicadores de desempeño son obligatorios'),
    indicadoresRentabilidad: Yup.string().required('Los indicadores de rentabilidad son obligatorios'),
    estadoInicial: Yup.mixed().required('La foto del estado inicial es obligatoria'),
    estadoConProyecto: Yup.mixed().required('La foto del estado con proyecto es obligatoria'),
  });

  const handleSubmitStep1 = (values, { setSubmitting }) => {
    setStep(2);
    setSubmitting(false);
  };

  const handleSubmitStep2 = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('projectName', values.projectName);
      formData.append('tipoProyecto', values.tipoProyecto);
      formData.append('entityType', entityType);
      formData.append('dependencia', values.dependencia || 'No Aplica');
      formData.append('organismo', values.organismo || 'No Aplica');
      formData.append('municipio', values.municipio || 'No Aplica');
      formData.append('PeticionPersonal', values.PeticionPersonal || 'No Aplica');
      formData.append('montoFederal', values.montoFederal || 'No Aplica');
      formData.append('montoEstatal', values.montoEstatal || 'No Aplica');
      formData.append('montoMunicipal', values.montoMunicipal || 'No Aplica');
      formData.append('montoOtros', values.montoOtros || 'No Aplica');
      formData.append('descripcion', values.descripcion);
      formData.append('situacionSinProyecto', values.situacionSinProyecto);
      formData.append('objetivos', values.objetivos);
      formData.append('metas', values.metas);
      formData.append('programaPresupuestario', values.programaPresupuestario);
      formData.append('beneficiarios', values.beneficiarios || 'No Aplica');
      formData.append('alineacionNormativa', values.alineacionNormativa);
      formData.append('region', values.region);
      formData.append('latitud', values.latitud);
      formData.append('longitud', values.longitud);
      formData.append('planNacional', values.planNacional);
      formData.append('planEstatal', values.planEstatal);
      formData.append('planMunicipal', values.planMunicipal || 'No Aplica');
      formData.append('ods', values.ods);
      formData.append('planSectorial', values.planSectorial);
      formData.append('unidadResponsable', values.unidadResponsable);
      formData.append('unidadPresupuestal', values.unidadPresupuestal);
      formData.append('ramoPresupuestal', values.ramoPresupuestal);
      formData.append('observaciones', values.observaciones || 'No Aplica');
      formData.append('gastoProgramable', values.gastoProgramable);
      formData.append('indicadoresEstrategicos', values.indicadoresEstrategicos);
      formData.append('indicadoresTacticos', values.indicadoresTacticos);
      formData.append('indicadoresDesempeno', values.indicadoresDesempeno);
      formData.append('indicadoresRentabilidad', values.indicadoresRentabilidad);
      formData.append('estadoInicial', values.estadoInicial);
      formData.append('estadoConProyecto', values.estadoConProyecto);

      for (const key in applies) {
        if (applies[key]) {
          for (const file of values[key]) {
            formData.append(key, file);
          }
        }
      }

      const csrfToken = Cookies.get('csrftoken');

      await axios.post('guardar-proyecto/', formData, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'multipart/form-data'
        }
      });

      resetForm();
      setSubmitting(false);
      alert('Proyecto creado exitosamente');
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      alert('Ocurrió un error al crear el proyecto. Por favor, inténtalo de nuevo.');
      setSubmitting(false);
    }
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

  return (
    <div className="formulario-container">
      <div className="formTitulo">
        <img src={`${imgBasePath}formIco.png`} alt="img_representativa" />
        <h3>REGISTRO DE PROYECTO</h3>
      </div>
      <Formik
        initialValues={{
          nombreDependencia: '',
          areaAdscripcion: '',
          nombreRegistrante: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          correoInstitucional: '',
          telefonoOficina: '',
          correoPersonal: '',
          telefonoParticular: '',
        }}
        validationSchema={validationSchemaStep1}
        onSubmit={handleSubmitStep1}
      >
        {({ isSubmitting }) => (
          <Form>
            {step === 1 && (
              <div>
                <div className="formTwo">
                  <div className="form-group nombreDependencia">
                    <label>Nombre de la Dependencia u Organismo</label>
                    <Field type="text" name="nombreDependencia" />
                    <ErrorMessage name="nombreDependencia" component="div" className="error" />
                  </div>
                  <div className="form-group areaAdscripcion">
                    <label>Área de Adscripción</label>
                    <Field type="text" name="areaAdscripcion" />
                    <ErrorMessage name="areaAdscripcion" component="div" className="error" />
                  </div>
                </div>

                <div className="formThree">
                  <div className="form-group nombreRegistrante">
                    <label>Nombre(s) de quien registra</label>
                    <Field type="text" name="nombreRegistrante" />
                    <ErrorMessage name="nombreRegistrante" component="div" className="error" />
                  </div>
                  <div className="form-group apellidoPaterno">
                    <label>Apellido Paterno</label>
                    <Field type="text" name="apellidoPaterno" />
                    <ErrorMessage name="apellidoPaterno" component="div" className="error" />
                  </div>
                  <div className="form-group apellidoMaterno">
                    <label>Apellido Materno</label>
                    <Field type="text" name="apellidoMaterno" />
                    <ErrorMessage name="apellidoMaterno" component="div" className="error" />
                  </div>
                </div>
                <p>Recuerda no dejar espacios en blanco entre los caracteres en el campo de correo y teléfono.</p>
                <div className="formFour">
                  <div className="form-group correoInstitucional">
                    <label>Correo Institucional</label>
                    <Field type="email" name="correoInstitucional" />
                    <ErrorMessage name="correoInstitucional" component="div" className="error" />
                  </div>
                  <div className="form-group telefonoOficina">
                    <label>Teléfono Oficina</label>
                    <Field type="text" name="telefonoOficina" />
                    <ErrorMessage name="telefonoOficina" component="div" className="error" />
                  </div>
                  <div className="form-group correoPersonal">
                    <label>Correo Personal</label>
                    <Field type="email" name="correoPersonal" />
                    <ErrorMessage name="correoPersonal" component="div" className="error" />
                  </div>
                  <div className="form-group telefonoParticular">
                    <label>Teléfono Particular</label>
                    <Field type="text" name="telefonoParticular" />
                    <ErrorMessage name="telefonoParticular" component="div" className="error" />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Siguiente
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>

      {step === 2 && (
        <Formik
          initialValues={{
            projectName: '',
            tipoProyecto: '',
            dependencia: '',
            organismo: '',
            municipio: '',
            PeticionPersonal: '',
            montoFederal: '0',
            montoEstatal: '0',
            montoMunicipal: '0',
            montoOtros: '0',
            descripcion: '',
            situacionSinProyecto: '',
            objetivos: '',
            metas: '',
            programaPresupuestario: '',
            beneficiarios: '',
            alineacionNormativa: '',
            region: '',
            latitud: '',
            longitud: '',
            planNacional: '',
            planEstatal: '',
            planMunicipal: '',
            ods: '',
            planSectorial: '',
            unidadResponsable: '',
            unidadPresupuestal: '',
            ramoPresupuestal: '',
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
            observaciones: '',
            gastoProgramable: '',
            indicadoresEstrategicos: '',
            indicadoresTacticos: '',
            indicadoresDesempeno: '',
            indicadoresRentabilidad: '',
            estadoInicial: null,
            estadoConProyecto: null,
          }}
          validationSchema={validationSchemaStep2}
          onSubmit={handleSubmitStep2}
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
                  <div className="formTwo">
                    <div className="form-group projectName">
                      <label>Nombre del Proyecto</label>
                      <Field type="text" name="projectName" />
                      <ErrorMessage name="projectName" component="div" className="error" />
                    </div>
                    <div className="form-group tipoProyecto">
                      <label>Tipo de Proyecto</label>
                      <Field as="select" name="tipoProyecto">
                        <option value="">Seleccione</option>
                        <option value="Infraestructura Económica">Infraestructura Económica</option>
                        <option value="Infraestructura Social">Infraestructura Social</option>
                        <option value="Infraestructura Gubernamental">Infraestructura Gubernamental</option>
                        <option value="Inmuebles">Inmuebles</option>
                        <option value="Otros Proyectos de Inversión">Otros Proyectos de Inversión</option>
                      </Field>
                      <ErrorMessage name="tipoProyecto" component="div" className="error" />
                    </div>
                  </div>

                  <div className="formTwo">
                    <div className="form-group entityType">
                      <label>Tipo de Entidad</label>
                      <Field as="select" name="entityType" onChange={(e) => setEntityType(e.target.value)}>
                        <option value="">Seleccione</option>
                        <option value="Dependencia">Dependencia</option>
                        <option value="Organismo">Organismo</option>
                        <option value="Municipio">Municipio</option>
                        <option value="Petición Personal">Petición Personal</option>
                      </Field>
                      <ErrorMessage name="entityType" component="div" className="error" />
                    </div>

                    {entityType === 'Dependencia' && (
                      <div className="form-group dependencia">
                        <label>Dependencia</label>
                        <Field as="select" name="dependencia">
                          <option value="">Seleccione</option>
                          {dependencias.map((dep) => (
                            <option key={dep} value={dep}>{dep}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="dependencia" component="div" className="error" />
                      </div>
                    )}

                    {entityType === 'Organismo' && (
                      <div className="form-group organismo">
                        <label>Organismo</label>
                        <Field as="select" name="organismo">
                          <option value="">Seleccione</option>
                          {organismos.map((org) => (
                            <option key={org} value={org}>{org}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="organismo" component="div" className="error" />
                      </div>
                    )}

                    {entityType === 'Municipio' && (
                      <div className="form-group municipioEnd">
                        <label>Municipio</label>
                        <Field as="select" name="municipioEnd">
                          <option value="">Seleccione</option>
                          {municipiosDeHidalgo.map((mun) => (
                            <option key={mun} value={mun}>{mun}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="municipioEnd" component="div" className="error" />
                      </div>
                    )}

                    {entityType === 'Petición Personal' && (
                      <div className="form-group PeticionPersonal">
                        <label>Petición Personal</label>
                        <Field type="text" name="PeticionPersonal" />
                        <ErrorMessage name="PeticionPersonal" component="div" className="error" />
                      </div>
                    )}
                  </div>

                  <div className="formTwo">
                    <div className="form-group unidadResponsable">
                      <label>Unidad Responsable</label>
                      <Field as="select" name="unidadResponsable" onChange={(e) => {
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
                        <label>Unidad Presupuestal</label>
                        <Field as="select" name="unidadPresupuestal">
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
                    <label>Ramo Presupuestal</label>
                    <Field as="select" name="ramoPresupuestal">
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
                      <label>Monto Federal</label>
                      <Field type="number" name="montoFederal" min="0" onChange={(e) => {
                        setFieldValue('montoFederal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoFederal" component="div" className="error" />
                    </div>
                    <div className="form-group montoEstatal">
                      <label>Monto Estatal</label>
                      <Field type="number" name="montoEstatal" min="0" onChange={(e) => {
                        setFieldValue('montoEstatal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoEstatal" component="div" className="error" />
                    </div>
                    <div className="form-group montoMunicipal">
                      <label>Monto Municipal</label>
                      <Field type="number" name="montoMunicipal" min="0" onChange={(e) => {
                        setFieldValue('montoMunicipal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoMunicipal" component="div" className="error" />
                    </div>
                    <div className="form-group montoOtros">
                      <label>Otros</label>
                      <Field type="number" name="montoOtros" min="0" defaultValue="N/A" onChange={(e) => {
                        setFieldValue('montoOtros', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoOtros" component="div" className="error" />
                    </div>
                  </div>

                  <div className="form-group inversionEstimada">
                    <label>Inversión Estimada</label>
                    <Field type="text" name="inversionEstimada" readOnly value={calculateTotal(values)} />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Descripción del Proyecto</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="DescripcionProyecto">
                  <div className="form-group descripcion">
                    <label>Descripción</label>
                    <Field as="textarea" name="descripcion" maxLength="1000" />
                    <ErrorMessage name="descripcion" component="div" className="error" />
                    <div>Máximo 1000 caracteres</div>
                  </div>
                  <div className="form-group situacionSinProyecto">
                    <label>Situación sin el Programa o Proyecto de Inversión</label>
                    <Field as="textarea" name="situacionSinProyecto" maxLength="1000" />
                    <ErrorMessage name="situacionSinProyecto" component="div" className="error" />
                    <div>Máximo 1000 caracteres</div>
                  </div>
                  <div className="formTwo">
                    <div className="form-group objetivos">
                      <label>Objetivos</label>
                      <Field as="textarea" name="objetivos" maxLength="500" />
                      <ErrorMessage name="objetivos" component="div" className="error" />
                      <div>Máximo 500 caracteres</div>
                    </div>
                    <div className="form-group metas">
                      <label>Metas</label>
                      <Field as="textarea" name="metas" maxLength="500" />
                      <ErrorMessage name="metas" component="div" className="error" />
                      <div>Máximo 500 caracteres</div>
                    </div>
                  </div>

                  <div className="formTwo">
                    <div className="form-group gastoProgramable">
                      <label>Gasto Programable</label>
                      <Field as="select" name="gastoProgramable" onChange={(e) => setFieldValue('gastoProgramable', e.target.value)}>
                        <option value="">Seleccione</option>
                        {gastoProgramableOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="gastoProgramable" component="div" className="error" />
                    </div>
                    <div className="form-group programaPresupuestario">
                      <label>Programa Presupuestario</label>
                      <Field as="select" name="programaPresupuestario">
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
                      <label>Beneficiarios</label>
                      <Field type="number" name="beneficiarios" min="1" />
                      <ErrorMessage name="beneficiarios" component="div" className="error" />
                    </div>
                    <div className="form-group alineacionNormativa">
                      <label>Alineación Normativa Vigente</label>
                      <Field as="textarea" name="alineacionNormativa" maxLength="200" />
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
                    <label>Región</label>
                    <Field as="select" name="region" onChange={(e) => {
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
                    <label>Municipio</label>
                    <Field as="select" name="municipio">
                      <option value="">Seleccione</option>
                      {municipiosPorRegion[selectedRegion]?.map((mun) => (
                        <option key={mun} value={mun}>{mun}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="municipio" component="div" className="error" />
                  </div>
                  <div className="form-group localidad">
                    <label>Localidad</label>
                    <Field type="text" name="localidad" />
                    <ErrorMessage name="localidad" component="div" className="error" />
                  </div>
                  <div className="form-group barrioColoniaEjido">
                    <label>Barrio/Colonia/Ejido</label>
                    <Field type="text" name="barrioColoniaEjido" />
                    <ErrorMessage name="barrioColoniaEjido" component="div" className="error" />
                  </div>
                </div>
                <p>COORDENADAS GEOGRÁFICAS:</p>
                <div className="formTwo">
                  <div className="form-group latitud">
                    <label>Latitud</label>
                    <Field type="number" name="latitud" step="any" placeholder="Latitud (+), ej: 20.1224" />
                    <ErrorMessage name="latitud" component="div" className="error" />
                  </div>
                  <div className="form-group longitud">
                    <label>Longitud</label>
                    <Field type="number" name="longitud" step="any" placeholder="Longitud (-), ej: -98.7368" />
                    <ErrorMessage name="longitud" component="div" className="error" />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Alineación Estratégica</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="formTwo">
                  <div className="form-group planNacional">
                    <label>Plan Nacional de Desarrollo</label>
                    <Field as="select" name="planNacional">
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
                    <label>Plan Estatal de Desarrollo</label>
                    <Field as="select" name="planEstatal">
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
                  {entityType === 'Municipio' && ( // Agregado aquí
                    <div className="form-group planMunicipal">
                      <label>Plan Municipal</label>
                      <Field as="textarea" name="planMunicipal" maxLength="500" />
                      <ErrorMessage name="planMunicipal" component="div" className="error" />
                      <div>Máximo 500 caracteres</div>
                    </div>
                  )}
                </div>

                <div className="formTwo">
                  <div className="form-group ods">
                    <label>Objetivos de Desarrollo Sostenible</label>
                    <Field as="select" name="ods">
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
                    <label>Programa Especial</label>
                    <Field as="select" name="planSectorial">
                      <option value="">Seleccione</option>
                      <option value="Despacho">Despacho</option>
                      <option value="Oficialía Mayor">Oficialía Mayor</option>
                      <option value="Planeación">Planeación</option>
                      <option value="Gobierno">Gobierno</option>
                      <option value="Hacienda">Hacienda</option>
                      <option value="Bienestar">Bienestar</option>
                      <option value="Infraestructura Publica">Infraestructura Publica</option>
                      <option value="Economía">Economía</option>
                      <option value="Medio Ambiente">Medio Ambiente</option>
                      <option value="Campo">Campo</option>
                      <option value="Turismo">Turismo</option>
                      <option value="Contraloría">Contraloría</option>
                      <option value="Educación">Educación</option>
                      <option value="Salud">Salud</option>
                      <option value="Seguridad">Seguridad</option>
                      <option value="Trabajo">Trabajo</option>
                      <option value="Cultura">Cultura</option>
                      <option value="Procuradora">Procuradora</option>
                    </Field>
                    <ErrorMessage name="planSectorial" component="div" className="error" />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Mecanismos de Evaluación y Seguimiento a Proyectos</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="formTwo">
                  <div className="form-group indicadoresEstrategicos">
                    <label>Indicadores Estratégicos</label>
                    <Field as="select" name="indicadoresEstrategicos">
                      <option value="">Seleccione</option>
                      {indicadoresEstrategicosOptions[values.planEstatal]?.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="indicadoresEstrategicos" component="div" className="error" />
                  </div>
                  <div className="form-group indicadoresTacticos">
                    {(entityType === 'Dependencia' && values.dependencia !== 'Secretaría del Despacho del Gobernador') ? (
                      <Field as="select" name="indicadoresTacticos">
                        <option value="">Seleccione</option>
                        {indicadoresTacticosOptions[values.dependencia]?.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </Field>
                    ) : (
                      <Field type="text" name="indicadoresTacticos" value="No Aplica" readOnly />
                    )}
                    <ErrorMessage name="indicadoresTacticos" component="div" className="error" />
                  </div>
                </div>

                <div className="formTwo">
                  <div className="form-group indicadoresDesempeno">
                    <label>Indicadores de Desempeño</label>
                    <Field as="textarea" name="indicadoresDesempeno" maxLength="1000" />
                    <ErrorMessage name="indicadoresDesempeno" component="div" className="error" />
                  </div>
                  <div className="form-group indicadoresRentabilidad">
                    <label>Indicadores de Rentabilidad</label>
                    <Field as="textarea" name="indicadoresRentabilidad" maxLength="1000" />
                    <ErrorMessage name="indicadoresRentabilidad" component="div" className="error" />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Evolución del Espacio</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="formTwo">
                  <div className="form-group estadoInicial">
                    <label>Estado Inicial (Fotografía)</label>
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
                    <label>Estado con Proyecto (Proyección)</label>
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
                        <label>{label}</label>
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
                  <label>Observaciones</label>
                  <Field as="textarea" name="observaciones" maxLength="1000" />
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
    </div>
  );
};

export default FormDependencia;
