import React, { useState } from 'react';
import { Formik } from 'formik';
import Formulario from './FormQuestions';
import validationSchemaStep2 from './validationSchemaStep2';
import ProjectCreationModal from '../componentsForm/ProjectCreationModal';
import Cookies from 'js-cookie';
import axios from 'axios';

const FormDependencia = () => {
  const fechaHoy = new Date().toISOString().split('T')[0];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  // Manejo de la presentación de datos
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Iniciando handleSubmit'); // Log inicial
    console.log('Datos del formulario:', values); // Datos enviados
    try {
      const csrfToken = Cookies.get('csrftoken');
      console.log('Token CSRF:', csrfToken); // Verifica el token CSRF

      const response = await axios.post('guardar-proyecto/', values, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
      });

      console.log('Respuesta del servidor:', response.data);
      const projectId = response.data.project_id;
      setGeneratedId(projectId);
      setModalIsOpen(true);

      resetForm();
    } catch (error) {
      if (error.response) {
        console.error('Detalles del error del servidor:', error.response.data);
      }
    } finally {
      console.log('Finalizando handleSubmit');
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.href = '/';
  };

  // Pasamos las funciones y valores a Formulario
  return (
    <div className="formulario-container">
      <div className="banner">
        <h1>Banco de Proyectos - Registro</h1>
      </div>
      <Formik
        initialValues={{
          area_adscripcion: '',
          nombre_registrante: '',
          apellido_paterno: '',
          apellido_materno: '',
          correo: '',
          telefono: '',
          telefono_ext: '',
          fecha_registro: fechaHoy,
          nombre_proyecto: '',
          sector: '',
          tipo_proyecto: '',
          tipo_entidad: '',
          dependencia: '',
          organismo: '',
          municipio_ayuntamiento: '',
          unidad_responsable: '',
          unidad_presupuestal: '',
          inversion_federal: '0',
          inversion_estatal: '0',
          inversion_municipal: '0',
          inversion_otros: '0',
          inversion_total: '0',
          ramo_presupuestal: '',
          descripcion: '',
          situacion_sin_proyecto: '',
          objetivos: '',
          metas: '',
          programa_presupuestario: '',
          gasto_programable: '',
          beneficiarios: '',
          normativa_aplicable: '',
          region: '',
          municipio: '',
          localidad: '',
          barrio_colonia: '',
          latitud: '',
          longitud: '',
          municipio_impacto: [],
          plan_nacional: '',
          plan_estatal: '',
          plan_municipal: '',
          acuerdos_transversales: '',
          ods: '',
          programas_SIE: '',
          indicadores_estrategicos: '',
          indicadores_tacticos: '',


          observaciones: '',
        }}
        validationSchema={null}
        onSubmit={(values, actions) => {
          console.log('Formulario enviado:', values);
          handleSubmit(values, actions);
        }}
      >
        {({ isSubmitting, setFieldValue, values, errors }) => {
          console.log('Errores actuales del formulario:', errors);
          return (
            <Formulario
              setFieldValue={setFieldValue}
              values={values}
              isSubmitting={isSubmitting}
            />
          );
        }}

      </Formik>

      <ProjectCreationModal isOpen={modalIsOpen} onRequestClose={closeModal} projectId={generatedId} />
    </div>
  );
};

export default FormDependencia;
