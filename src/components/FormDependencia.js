// FormDependencia.js

import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

const FormDependencia = () => {
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
    description: Yup.string().required('La descripción del proyecto es obligatoria'),
    files: Yup.array().required('El archivo ZIP es obligatorio'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('projectName', values.projectName);
      formData.append('description', values.description);
      
      values.files.forEach((file, index) => {
        formData.append(`file_${index}`, file); // Utiliza un nombre único para cada archivo
      });

      // Obtener el token CSRF de las cookies
      const csrfToken = Cookies.get('csrftoken');

      await axios.post('/guardar-proyecto/', formData, {
        headers: {
          'X-CSRFToken': csrfToken, // Agregar el token CSRF como encabezado
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

  return (
    <div className="project-form-container">
      <h2>Formulario de Proyecto</h2>
      <Formik
        initialValues={{ projectName: '', description: '', files: [] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="projectName">Nombre del Proyecto</label>
              <Field type="text" id="projectName" name="projectName" />
              <ErrorMessage name="projectName" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <Field as="textarea" id="description" name="description" />
              <ErrorMessage name="description" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Archivos ZIP</label>
              <FieldArray name="files">
                {({ push, remove }) => (
                  <div>
                    {values.files.map((file, index) => (
                      <div key={index} className="file-input-group">
                        <input
                          type="file"
                          onChange={(event) => {
                            push(event.currentTarget.files[0]);
                          }}
                          accept=".zip"
                        />
                        <button type="button" onClick={() => remove(index)}>Eliminar</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push(null)} className="add-file-button">Agregar Archivo</button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="files" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting} className="submit-button">Enviar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormDependencia;
