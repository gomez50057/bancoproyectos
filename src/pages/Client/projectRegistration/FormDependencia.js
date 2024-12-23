import React, { useState } from 'react';
import { Formik } from 'formik';
import Formulario from './FormQuestions';
import validationSchemaStep from './validationSchemaStep';
import ProjectCreationModal from '../componentsForm/ProjectCreationModal';
import Cookies from 'js-cookie';
import axios from 'axios';
import { fieldLabels } from '../../../utils';
import ErrorIcon from '@mui/icons-material/Error';

const FormDependencia = () => {
  const fechaHoy = new Date().toISOString().split('T')[0];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Manejo de la presentación de datos
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    console.log('Iniciando handleSubmit'); // Log inicial
    console.log('Datos del formulario:', values); // Datos enviados
    setErrorMessage(''); // Limpiar cualquier mensaje de error previo

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
        validationSchema={validationSchemaStep}
        onSubmit={(values, actions) => {
          console.log('Formulario enviado:', values);
          handleSubmit(values, actions);
        }}
      >
        {({ isSubmitting, setFieldValue, values, errors, isValid, touched }) => {
          return (
            <div>
              {/* Renderizado del formulario */}
              <Formulario
                setFieldValue={setFieldValue}
                values={values}
                isSubmitting={isSubmitting}
              />
              
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
            </div>
          );
        }}
      </Formik>

      <ProjectCreationModal isOpen={modalIsOpen} onRequestClose={closeModal} projectId={generatedId} />
    </div>
  );
};

export default FormDependencia;
