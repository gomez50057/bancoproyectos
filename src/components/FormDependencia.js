import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProjectForm = () => {
  const initialValues = {
    projectName: '',
    description: '',
    files: [],
  };

  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
    description: Yup.string().required('La descripción del proyecto es obligatoria'),
    files: Yup.array().of(Yup.mixed())
      .test("fileFormat", "Solo se permiten archivos ZIP", (value) => {
        if (!value) return true; // Permitimos que el campo esté vacío
        return value.every(file => file && file.type === 'application/zip');
      }),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Aquí puedes realizar acciones con los valores del formulario, como enviarlos a un servidor
    console.log(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="project-form-container">
      <h2>Formulario de Proyecto</h2>
      <Formik
        initialValues={initialValues}
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
                        <Field
                          type="file"
                          name={`files.${index}`}
                          accept=".zip"
                        />
                        <button type="button" onClick={() => remove(index)}>Eliminar</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push()} className="add-file-button">Agregar Archivo</button>
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

export default ProjectForm;
