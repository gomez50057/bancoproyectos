// src/pages/Client/PresupuestoInver/CedulaRegistroForm.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { dependencias, organismos, unidadPresupuestalPorUnidadResponsable, Acuerdos, municipiosPorRegion, ODS, propuestaCampana } from '../../../presup_inversion';
import SectionTitle from '../componentsForm/SectionTitle';
import './CedulaRegistroForm.css';

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

  return (
    <section>
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
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form data submitted:', values);
          // Lógica para enviar datos al backend
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
              <FieldGroup name="nombreDependencia" label="Nombre de la Dependencia u Organismo" type="text" />
              <FieldGroup name="areaAdscripcion" label="Área de Adscripción" type="text" />
              <FieldGroup name="nombreRegistrante" label="Nombre(s) de quien registra" type="text" />
              <FieldGroup name="apellidoPaterno" label="Apellido Paterno" type="text" />
              <FieldGroup name="apellidoMaterno" label="Apellido Materno" type="text" />
              <FieldGroup name="correo" label="Correo" type="email" />
              <FieldGroup name="telefono" label="Teléfono" type="text" />
              <FieldGroup name="extension" label="Extensión (No es Obligatorio)" type="text" />

              {/* Datos Generales */}
              <SectionTitle title="Datos Generales" />
              <FieldGroup name="fechaActual" label="Fecha de Registro" type="date" value={values.fechaActual} readOnly />
              <FieldGroup name="ejercicioFiscal" label="Ejercicio Fiscal" as="select">
                <option value="">Selecciona una opción</option>
                {['2020', '2021', '2022', '2023', '2024', '2025'].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="dependencia" label="Dependencia" as="select">
                <option value="">Selecciona una opción</option>
                {dependencias.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="organismo" label="Organismo" as="select">
                <option value="">Selecciona una opción</option>
                {organismos.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="unidadResponsable" label="Unidad Responsable" as="select" onChange={(e) => {
                setFieldValue('unidadResponsable', e.target.value);
                setFieldValue('unidadPresupuestal', '');
              }}>
                <option value="">Selecciona una opción</option>
                {Object.keys(unidadPresupuestalPorUnidadResponsable).map(unidad => (
                  <option key={unidad} value={unidad}>{unidad}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="unidadPresupuestal" label="Unidad Presupuestal" as="select" disabled={!values.unidadResponsable}>
                <option value="">Selecciona una opción</option>
                {(unidadPresupuestalPorUnidadResponsable[values.unidadResponsable] || []).map(unidad => (
                  <option key={unidad} value={unidad}>{unidad}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="nombreProyecto" label="Nombre del Proyecto" type="text" maxLength="250" />

              {/* Descripción del Proyecto */}
              <SectionTitle title="Descripción del Proyecto" />
              <FieldGroup name="descripcionProyecto" label="Descripción del Proyecto" as="textarea" maxLength="1000" />
              <FieldGroup name="situacionActual" label="Análisis de la situación actual" as="textarea" maxLength="1000" />
              <FieldGroup name="tipoObra" label="Tipo de Obra" as="select">
                <option value="">Selecciona una opción</option>
                {['Adecuación', 'Ampliación', 'Construcción', 'Equipamiento', 'Mantenimiento', 'Rehabilitación', 'Otra'].map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="calendarioEjecucion" label="Calendario de Ejecución" as="select">
                <option value="">Selecciona una opción</option>
                {[...Array(12).keys()].map(mes => (
                  <option key={mes + 1} value={mes + 1}>{`${mes + 1} meses`}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="beneficioSocial" label="Beneficio Social" as="textarea" maxLength="500" />
              <FieldGroup name="beneficioEconomico" label="Beneficio Económico" as="textarea" maxLength="500" />
              <FieldGroup name="numeroBeneficiarios" label="Número Beneficiarios" type="number" />

              {/* Estructura Financiera */}
              <SectionTitle title="Estructura Financiera" />
              <FieldGroup name="inversionPresupuestada" label="Inversión Presupuestada" type="number" step="0.01" maxLength="250" />

              {/* Territorio */}
              <SectionTitle title="Territorio" />
              <FieldGroup name="region" label="Región" as="select" onChange={(e) => {
                setFieldValue('region', e.target.value);
                setFieldValue('municipio', '');
              }}>
                <option value="">Selecciona una opción</option>
                {Object.keys(municipiosPorRegion).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="municipio" label="Municipio" as="select" disabled={!values.region}>
                <option value="">Selecciona una opción</option>
                {municipios.map(municipio => (
                  <option key={municipio} value={municipio}>{municipio}</option>
                ))}
              </FieldGroup>
              <FieldGroup name="localidad" label="Localidad" type="text" maxLength="50" />
              <FieldGroup name="barrioColoniaEjido" label="Barrio/Colonia/Ejido" type="text" maxLength="50" />

              {/* Alineación Estratégica */}
              <SectionTitle title="Alineación Estratégica" />
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

              {/* Verificación de Propuesta */}
              <SectionTitle title="Verificación de Propuesta" />
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

              <FieldGroup name="expedienteTecnico" label="¿Cuenta con expediente técnico?" as="select">
                <option value="">Selecciona una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </FieldGroup>

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
