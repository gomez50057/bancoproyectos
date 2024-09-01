// src/pages/Client/PresupuestoInver/CedulaRegistroForm.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { dependencias, organismos, unidadPresupuestalPorUnidadResponsable, acuerdosPorObjetivo } from '../../../presup_inversion';
import SectionTitle from '../componentsForm/SectionTitle';
import './CedulaRegistroForm.css';
const imgBasePath = "/img/";


const CedulaRegistroForm = () => {
  const fechaHoy = new Date().toISOString().split('T')[0]; // Obtener fecha actual en formato YYYY-MM-DD

  const validationSchema = Yup.object({
    fechaActual: Yup.string().required('La fecha de registro es obligatoria'),
    ejercicioFiscal: Yup.string().required('El ejercicio fiscal es obligatorio'),
    dependencia: Yup.string().required('La dependencia es obligatoria'),
    organismo: Yup.string().required('El organismo es obligatorio'),
    unidadResponsable: Yup.string().required('La unidad responsable es obligatoria'),
    unidadPresupuestal: Yup.string().required('La unidad presupuestal es obligatoria'),
    nombreProyecto: Yup.string().max(250, 'Máximo 250 caracteres').required('El nombre del proyecto es obligatorio'),
    descripcionProyecto: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La descripción del proyecto es obligatoria'),
    inversionPresupuestada: Yup.number().required('La inversión presupuestada es obligatoria').positive('Debe ser un número positivo').max(999999999, 'El valor es demasiado grande'),
    acuerdoAplicable: Yup.string().required('El acuerdo aplicable es obligatorio'),
    objetivo: Yup.string().required('El objetivo es obligatorio'),
    prioridad: Yup.string().required('La prioridad es obligatoria'),
    propuestaCampaña: Yup.string().required('Este campo es obligatorio'),
    expedienteTecnico: Yup.string().required('Este campo es obligatorio'),
  });

  return (
    <section>
      <div className="banner">
        <div className="banner_txt">
          <img src={`${imgBasePath}cedulatxt.png`} alt="xxx" />
        </div>
        <div className="banner_img">
          <img src={`${imgBasePath}inver.png`} alt="xxx" />
        </div>
        <div className="container_home-button">
          <button className="home-button" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}></button>
        </div>
      </div>
      <div className="formulario-container">
        <Formik
          initialValues={{
            fechaActual: fechaHoy,
            ejercicioFiscal: '',
            dependencia: '',
            organismo: '',
            unidadResponsable: '',
            unidadPresupuestal: '',
            nombreProyecto: '',
            descripcionProyecto: '',
            inversionPresupuestada: '',
            acuerdoAplicable: '',
            objetivo: '',
            prioridad: '',
            propuestaCampaña: '',
            expedienteTecnico: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Form data submitted:', values);
            // Aquí puedes agregar lógica para enviar los datos al backend o procesarlos
          }}
        >
          {({ setFieldValue, values }) => {
            // Calcula dinámicamente las opciones basadas en los valores seleccionados
            const unidadesPresupuestales = unidadPresupuestalPorUnidadResponsable[values.unidadResponsable] || [];
            const objetivos = acuerdosPorObjetivo[values.acuerdoAplicable] || [];

            return (
              <Form>
                <SectionTitle title="Datos Generales" />

                {/* Fecha de Registro y Ejercicio Fiscal */}
                <div className="form-row">
                  <FieldGroup name="fechaActual" label="Fecha de Registro" type="date" value={values.fechaActual} readOnly />
                  <FieldGroup name="ejercicioFiscal" label="Ejercicio Fiscal" as="select">
                    <option value="">Selecciona una opción</option>
                    {['2020', '2021', '2022', '2023', '2024', '2025'].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </FieldGroup>
                </div>

                {/* Dependencia y Organismo */}
                <div className="form-row">
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
                </div>

                {/* Unidad Responsable y Unidad Presupuestal */}
                <div className="form-row">
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
                    {unidadesPresupuestales.map(unidad => (
                      <option key={unidad} value={unidad}>{unidad}</option>
                    ))}
                  </FieldGroup>
                </div>

                {/* Nombre del Proyecto */}
                <FieldGroup name="nombreProyecto" label="Nombre del Proyecto" type="text" maxLength="250" />

                {/* Descripción del Proyecto */}
                <FieldGroup name="descripcionProyecto" label="Descripción del Proyecto" as="textarea" maxLength="1000" />

                <SectionTitle title="Estructura Financiera" />

                {/* Inversión Presupuestada */}
                <FieldGroup name="inversionPresupuestada" label="Inversión Presupuestada" type="number" step="0.01" maxLength="250" />

                <SectionTitle title="Alineación PED" />

                {/* Acuerdo Aplicable y Objetivo */}
                <div className="form-row">
                  <FieldGroup name="acuerdoAplicable" label="Acuerdo Aplicable" as="select" onChange={(e) => {
                    setFieldValue('acuerdoAplicable', e.target.value);
                    setFieldValue('objetivo', '');
                  }}>
                    <option value="">Selecciona una opción</option>
                    {Object.keys(acuerdosPorObjetivo).map(acuerdo => (
                      <option key={acuerdo} value={acuerdo}>{acuerdo}</option>
                    ))}
                  </FieldGroup>
                  <FieldGroup name="objetivo" label="Objetivo" as="select" disabled={!values.acuerdoAplicable}>
                    <option value="">Selecciona una opción</option>
                    {objetivos.map(obj => (
                      <option key={obj} value={obj}>{obj}</option>
                    ))}
                  </FieldGroup>
                </div>

                <SectionTitle title="Alineación al Programa Sectorial/Especial" />
                {/* Aquí puedes agregar campos adicionales según sea necesario */}

                <SectionTitle title="Programa Institucional de Desarrollo" />
                {/* Aquí puedes agregar campos adicionales según sea necesario */}

                <SectionTitle title="Verificación de Propuesta" />

                {/* Prioridad y Expediente Técnico */}
                <div className="form-row">
                  <FieldGroup name="prioridad" label="¿Cuál es la Prioridad?" as="select">
                    <option value="">Selecciona una opción</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </FieldGroup>
                  <FieldGroup name="expedienteTecnico" label="¿Cuenta con expediente técnico?" as="select">
                    <option value="">Selecciona una opción</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </FieldGroup>
                </div>

                {/* Propuesta de Campaña */}
                <FieldGroup name="propuestaCampaña" label="¿Se apega con alguna propuesta de campaña?" as="select">
                  <option value="">Selecciona una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </FieldGroup>

                <button type="submit">Enviar</button>
              </Form>
            );
          }}
        </Formik>

      </div>
    </section>


  );
};

const FieldGroup = ({ label, name, ...props }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} {...props} />
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

export default CedulaRegistroForm;
