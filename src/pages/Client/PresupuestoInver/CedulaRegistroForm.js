// src/pages/Client/PresupuestoInver/CedulaRegistroForm.js

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  dependencias,
  organismos,
  unidadPresupuestalPorUnidadResponsable,
  Acuerdos,
  municipiosPorRegion,
  ODS,
  propuestaCampana,
} from '../../../presup_inversion';
import SectionTitle from '../componentsForm/SectionTitle';
import './CedulaRegistroForm.css';

// Función para formatear el número con comas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const validationSchema = Yup.object({
  nombreDependencia: Yup.string().required('El nombre de la dependencia u organismo es obligatorio'),
  areaAdscripcion: Yup.string().required('El área de adscripción es obligatoria'),
  nombreRegistrante: Yup.string().required('El nombre es obligatorio'),
  apellidoPaterno: Yup.string().required('El apellido paterno es obligatorio'),
  apellidoMaterno: Yup.string().required('El apellido materno es obligatorio'),
  correo: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  telefono: Yup.string()
    .matches(/^[0-9]{10}$/, 'Debe ser un número de 10 dígitos')
    .required('El teléfono es obligatorio'),
  extension: Yup.string().matches(/^[0-9]*$/, 'Solo se permiten números'),
  fechaActual: Yup.string().required('La fecha de registro es obligatoria'),
  ejercicioFiscal: Yup.string().required('El ejercicio fiscal es obligatorio'),
  dependencia: Yup.string().required('La dependencia es obligatoria'),
  organismo: Yup.string().required('El organismo es obligatorio'),
  unidadResponsable: Yup.string().required('La unidad responsable es obligatoria'),
  unidadPresupuestal: Yup.string().required('La unidad presupuestal es obligatoria'),
  nombreProyecto: Yup.string().max(250, 'Máximo 250 caracteres').required('El nombre del proyecto es obligatorio'),
  descripcionProyecto: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La descripción del proyecto es obligatoria'),
  situacionActual: Yup.string().max(1000, 'Máximo 1000 caracteres').required('El análisis de la situación actual es obligatorio'),
  tipoObra: Yup.string().required('El tipo de obra es obligatorio'),
  calendarioEjecucion: Yup.string().required('El calendario de ejecución es obligatorio'),
  beneficioSocial: Yup.string().max(500, 'Máximo 500 caracteres').required('El beneficio social es obligatorio'),
  beneficioEconomico: Yup.string().max(500, 'Máximo 500 caracteres').required('El beneficio económico es obligatorio'),
  numeroBeneficiarios: Yup.number().integer('Debe ser un número entero').required('El número de beneficiarios es obligatorio'),
  inversionPresupuestada: Yup.number().positive('Debe ser un número positivo').required('La inversión presupuestada es obligatoria'),
  region: Yup.string().required('La región es obligatoria'),
  municipio: Yup.string().required('El municipio es obligatorio'),
  localidad: Yup.string().max(50, 'Máximo 50 caracteres').required('La localidad es obligatoria'),
  barrioColoniaEjido: Yup.string().max(50, 'Máximo 50 caracteres').required('El barrio/colonia/ejido es obligatorio'),
  ods: Yup.string().required('El objetivo de desarrollo sostenible es obligatorio'),
  planEstatal: Yup.string().required('El plan estatal de desarrollo es obligatorio'),
  objetivoPED: Yup.string().required('El objetivo del PED es obligatorio'),
  estrategiaPED: Yup.string().required('La estrategia del PED es obligatoria'),
  lineaAccionPED: Yup.string().required('La línea de acción del PED es obligatoria'),
  indicadorPED: Yup.string().required('El indicador estratégico del PED es obligatorio'),
  prioridad: Yup.number().integer('Debe ser un número entero').min(1, 'Mínimo 1').max(100, 'Máximo 100').required('La prioridad es obligatoria'),
  propuestaCampana: Yup.string().required('Este campo es obligatorio'),
  cualPropuesta: Yup.string().when('propuestaCampana', {
    is: 'Sí',
    then: (schema) => schema.required('Debes especificar la propuesta de campaña'),
    otherwise: (schema) => schema.oneOf(['No aplica'], 'Debe seleccionar "No aplica" cuando la respuesta es "No"'),
  }),
  expedienteTecnico: Yup.string().required('Este campo es obligatorio'),
});

const CedulaRegistroForm = () => {
  const fechaHoy = new Date().toISOString().split('T')[0];

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

  const handleApplyChange = (field) => {
    setApplies((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <section className="formulario-container">
      <Formik
        initialValues={{
          nombreDependencia: '',
          areaAdscripcion: '',
          nombreRegistrante: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          correo: '',
          telefono: '',
          extension: '',
          fechaActual: fechaHoy,
          ejercicioFiscal: '',
          dependencia: '',
          organismo: '',
          unidadResponsable: '',
          unidadPresupuestal: '',
          nombreProyecto: '',
          descripcionProyecto: '',
          situacionActual: '',
          tipoObra: '',
          calendarioEjecucion: '',
          beneficioSocial: '',
          beneficioEconomico: '',
          numeroBeneficiarios: '',
          inversionPresupuestada: '',
          region: '',
          municipio: '',
          localidad: '',
          barrioColoniaEjido: '',
          ods: '',
          planEstatal: '',
          objetivoPED: '',
          estrategiaPED: '',
          lineaAccionPED: '',
          indicadorPED: '',
          prioridad: '',
          propuestaCampana: '',
          cualPropuesta: '',
          expedienteTecnico: '',
          estudiosProspectivos: [],
          estudiosFactibilidad: [],
          analisisAlternativas: [],
          validacionNormativa: [],
          liberacionDerechoVia: [],
          situacionSinProyectoFotografico: [],
          situacionConProyectoProyeccion: [],
          analisisCostoBeneficio: [],
          proyectoEjecutivo: [],
          manifestacionImpactoAmbiental: [],
          otrosEstudios: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form data submitted:', values);
          // Lógica para enviar datos al backend
          const formData = new FormData();

          // Procesa archivos adicionales si aplican
          for (const key in applies) {
            if (applies[key]) {
              for (const file of values[key]) {
                formData.append(key, file);
              }
            }
          }

          // Aquí podrías agregar la lógica para enviar el formData al backend
        }}
      >
        {({ setFieldValue, values }) => {
          // Obtener opciones basadas en selecciones previas
          const objetivos = values.planEstatal ? Acuerdos[values.planEstatal]?.objetivos || [] : [];
          const estrategias = values.objetivoPED ? Acuerdos[values.planEstatal]?.estrategias[values.objetivoPED] || [] : [];
          const lineasAccion = values.estrategiaPED ? Acuerdos[values.planEstatal]?.lineasAccion[values.estrategiaPED] || [] : [];
          const indicadores = values.lineaAccionPED ? Acuerdos[values.planEstatal]?.indicadores[values.lineaAccionPED] || [] : [];
          const municipios = values.region ? municipiosPorRegion[values.region] || [] : [];

          return (
            <Form>
              {/* Datos de Registro */}
              <SectionTitle title="Datos de Registro" />
              <div className="form-row">
                <FieldGroup name="nombreDependencia" label="Nombre de la Dependencia u Organismo" type="text" />
                <FieldGroup name="areaAdscripcion" label="Área de Adscripción" type="text" />
              </div>
              <div className="form-row">
                <FieldGroup name="nombreRegistrante" label="Nombre(s) de quien registra" type="text" />
                <FieldGroup name="apellidoPaterno" label="Apellido Paterno" type="text" />
                <FieldGroup name="apellidoMaterno" label="Apellido Materno" type="text" />
              </div>
              <div className="form-row">
                <FieldGroup name="correo" label="Correo" type="email" />
                <FieldGroup name="telefono" label="Teléfono" type="text" />
                <FieldGroup name="extension" label="Extensión (No es Obligatorio)" type="text" />
              </div>
              {/* Datos Generales */}
              <SectionTitle title="Datos Generales" />
              <div className="form-row">
                <FieldGroup name="fechaActual" label="Fecha de Registro" type="date" value={values.fechaActual} readOnly />
                <FieldGroup name="ejercicioFiscal" label="Ejercicio Fiscal" as="select">
                  <option value="">Selecciona una opción</option>
                  {['2020', '2021', '2022', '2023', '2024', '2025'].map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </FieldGroup>
              </div>
              <div className="form-row">
                <FieldGroup name="dependencia" label="Dependencia" as="select">
                  <option value="">Selecciona una opción</option>
                  {dependencias.map((dep) => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </FieldGroup>
                <FieldGroup name="organismo" label="Organismo" as="select">
                  <option value="">Selecciona una opción</option>
                  {organismos.map((org) => (
                    <option key={org} value={org}>{org}</option>
                  ))}
                </FieldGroup>
              </div>
              <div className="form-row">
                <FieldGroup name="unidadResponsable" label="Unidad Responsable" as="select" onChange={(e) => {
                  setFieldValue('unidadResponsable', e.target.value);
                  setFieldValue('unidadPresupuestal', '');
                }}>
                  <option value="">Selecciona una opción</option>
                  {Object.keys(unidadPresupuestalPorUnidadResponsable).map((unidad) => (
                    <option key={unidad} value={unidad}>{unidad}</option>
                  ))}
                </FieldGroup>
                <FieldGroup name="unidadPresupuestal" label="Unidad Presupuestal" as="select" disabled={!values.unidadResponsable}>
                  <option value="">Selecciona una opción</option>
                  {(unidadPresupuestalPorUnidadResponsable[values.unidadResponsable] || []).map((unidad) => (
                    <option key={unidad} value={unidad}>{unidad}</option>
                  ))}
                </FieldGroup>
              </div>
              <div className="form-row">
                <FieldGroup name="nombreProyecto" label="Nombre del Proyecto" type="text" maxLength="250" />
              </div>
              {/* Descripción del Proyecto */}
              <SectionTitle title="Descripción del Proyecto" />
              <div className="form-row">
                <FieldGroup name="descripcionProyecto" label="Descripción del Proyecto" as="textarea" maxLength="1000" />
              </div>
              <div className="form-row">
                <FieldGroup name="situacionActual" label="Análisis de la situación actual" as="textarea" maxLength="1000" />
              </div>
              <div className="form-row">
                <FieldGroup name="tipoObra" label="Tipo de Obra" as="select">
                  <option value="">Selecciona una opción</option>
                  {['Adecuación', 'Ampliación', 'Construcción', 'Equipamiento', 'Mantenimiento', 'Rehabilitación', 'Otra'].map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </FieldGroup>
                <FieldGroup name="calendarioEjecucion" label="Calendario de Ejecución" as="select">
                  <option value="">Selecciona una opción</option>
                  {[...Array(12).keys()].map((mes) => (
                    <option key={mes + 1} value={mes + 1}>{`${mes + 1} meses`}</option>
                  ))}
                </FieldGroup>
              </div>
              <div className="form-row">
                <FieldGroup name="beneficioSocial" label="Beneficio Social" as="textarea" maxLength="500" />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficioEconomico" label="Beneficio Económico" as="textarea" maxLength="500" />
              </div>
              <div className="form-row">
                <FieldGroup name="numeroBeneficiarios" label="Número Beneficiarios" type="number" />
              </div>
              {/* Estructura Financiera */}
              <SectionTitle title="Estructura Financiera" />
              <div className="form-row">
                <FieldGroup
                  name="inversionPresupuestada"
                  label="Inversión Presupuestada"
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, ''); // Elimina las comas antes de convertir
                    if (!isNaN(value)) {
                      setFieldValue('inversionPresupuestada', formatNumberWithCommas(value));
                    }
                  }}
                  value={values.inversionPresupuestada}
                  maxLength="250"
                />
              </div>
              {/* Territorio */}
              <SectionTitle title="Territorio" />
              <div className="form-row">
                <FieldGroup name="region" label="Región" as="select" onChange={(e) => {
                  setFieldValue('region', e.target.value);
                  setFieldValue('municipio', '');
                }}>
                  <option value="">Selecciona una opción</option>
                  {Object.keys(municipiosPorRegion).map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </FieldGroup>
                <FieldGroup name="municipio" label="Municipio" as="select" disabled={!values.region}>
                  <option value="">Selecciona una opción</option>
                  {municipios.map((municipio) => (
                    <option key={municipio} value={municipio}>{municipio}</option>
                  ))}
                </FieldGroup>
                <FieldGroup name="localidad" label="Localidad" type="text" maxLength="50" />
                <FieldGroup name="barrioColoniaEjido" label="Barrio/Colonia/Ejido" type="text" maxLength="50" />
              </div>
              {/* Alineación Estratégica */}
              <SectionTitle title="Alineación Estratégica" />
              <div className="form-row">
                <FieldGroup name="ods" label="Objetivos de Desarrollo Sostenible" as="select">
                  <option value="">Selecciona una opción</option>
                  {ODS.map((objetivo, index) => (
                    <option key={index} value={objetivo}>{objetivo}</option>
                  ))}
                </FieldGroup>
                <FieldGroup
                  name="planEstatal"
                  label="Plan Estatal de Desarrollo"
                  as="select"
                  onChange={(e) => {
                    setFieldValue('planEstatal', e.target.value);
                    setFieldValue('objetivoPED', '');
                    setFieldValue('estrategiaPED', '');
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  {Object.keys(Acuerdos).map((acuerdo, index) => (
                    <option key={index} value={acuerdo}>{acuerdo}</option>
                  ))}
                </FieldGroup>
              </div>
              <div className="form-row">
                <FieldGroup
                  name="objetivoPED"
                  label="Objetivo del PED"
                  as="select"
                  disabled={!values.planEstatal}
                  onChange={(e) => {
                    setFieldValue('objetivoPED', e.target.value);
                    setFieldValue('estrategiaPED', '');
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  {objetivos.map((objetivo, index) => (
                    <option key={index} value={objetivo}>{objetivo}</option>
                  ))}
                </FieldGroup>
                <FieldGroup
                  name="estrategiaPED"
                  label="Estrategia del PED"
                  as="select"
                  disabled={!values.objetivoPED}
                  onChange={(e) => {
                    setFieldValue('estrategiaPED', e.target.value);
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  {estrategias.map((estrategia, index) => (
                    <option key={index} value={estrategia}>{estrategia}</option>
                  ))}
                </FieldGroup>
              </div>
              <div className="form-row">
                <FieldGroup
                  name="lineaAccionPED"
                  label="Línea de Acción del PED"
                  as="select"
                  disabled={!values.estrategiaPED}
                  onChange={(e) => {
                    setFieldValue('lineaAccionPED', e.target.value);
                    setFieldValue('indicadorPED', '');
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  {lineasAccion.map((linea, index) => (
                    <option key={index} value={linea}>{linea}</option>
                  ))}
                </FieldGroup>
                <FieldGroup
                  name="indicadorPED"
                  label="Indicador Estratégico del PED"
                  as="select"
                  disabled={!values.lineaAccionPED}
                  onChange={(e) => setFieldValue('indicadorPED', e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {indicadores.map((indicador, index) => (
                    <option key={index} value={indicador}>{indicador}</option>
                  ))}
                </FieldGroup>
              </div>

              {/* Verificación de Propuesta */}
              <SectionTitle title="Verificación de Propuesta" />

              <div className="form-row">
                <FieldGroup
                  name="propuestaCampana"
                  label="¿Se apega con alguna propuesta de campaña?"
                  as="select"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue('propuestaCampana', value);
                    if (value === 'No') {
                      setFieldValue('cualPropuesta', 'No aplica');
                    } else {
                      setFieldValue('cualPropuesta', '');
                    }
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </FieldGroup>
                <FieldGroup
                  name="cualPropuesta"
                  label="¿Cuál?"
                  as="select"
                  disabled={values.propuestaCampana !== 'Sí'}
                >
                  <option value="">Selecciona una opción</option>
                  {values.propuestaCampana === 'Sí' && propuestaCampana.map((propuesta, index) => (
                    <option key={index} value={propuesta}>{propuesta}</option>
                  ))}
                  {values.propuestaCampana === 'No' && <option value="No aplica">No aplica</option>}
                </FieldGroup>
              </div>
              <div className="form-row">
                <FieldGroup name="expedienteTecnico" label="¿Cuenta con expediente técnico?" as="select">
                  <option value="">Selecciona una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </FieldGroup>
              </div>

              {/* Rentabilidad / Estudios de Viabilidad Carga de Documentación */}
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
                  <div key={field} className="CargaDocumentacion">
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
              <button type="submit">Enviar</button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

// Componente FieldGroup para simplificar la creación de campos
const FieldGroup = ({ label, name, ...props }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} {...props} />
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

export default CedulaRegistroForm;
