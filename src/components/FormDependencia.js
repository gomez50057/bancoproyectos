// // FormDependencia.js

// import React from 'react';
// import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const FormDependencia = () => {
//   const validationSchema = Yup.object().shape({
//     projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
//     description: Yup.string().required('La descripción del proyecto es obligatoria'),
//     files: Yup.array().required('El archivo ZIP es obligatorio'),
//   });

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const formData = new FormData();
//       formData.append('projectName', values.projectName);
//       formData.append('description', values.description);

//       values.files.forEach((file, index) => {
//         formData.append(`file_${index}`, file); // Utiliza un nombre único para cada archivo
//       });

//       // Obtener el token CSRF de las cookies
//       const csrfToken = Cookies.get('csrftoken');

//       await axios.post('/guardar-proyecto/', formData, {
//         headers: {
//           'X-CSRFToken': csrfToken, // Agregar el token CSRF como encabezado
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       resetForm();
//       setSubmitting(false);
//       alert('Proyecto creado exitosamente');
//     } catch (error) {
//       console.error('Error al crear el proyecto:', error);
//       alert('Ocurrió un error al crear el proyecto. Por favor, inténtalo de nuevo.');
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="project-form-container">
//       <h2>Formulario de Proyecto</h2>
//       <Formik
//         initialValues={{ projectName: '', description: '', files: [] }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, isSubmitting }) => (
//           <Form>
//             <div className="form-group">
//               <label htmlFor="projectName">Nombre del Proyecto</label>
//               <Field type="text" id="projectName" name="projectName" />
//               <ErrorMessage name="projectName" component="div" className="error" />
//             </div>
//             <div className="form-group">
//               <label htmlFor="description">Descripción</label>
//               <Field as="textarea" id="description" name="description" />
//               <ErrorMessage name="description" component="div" className="error" />
//             </div>
//             <div className="form-group">
//               <label>Archivos ZIP</label>
//               <FieldArray name="files">
//                 {({ push, remove }) => (
//                   <div>
//                     {values.files.map((file, index) => (
//                       <div key={index} className="file-input-group">
//                         <input
//                           type="file"
//                           onChange={(event) => {
//                             push(event.currentTarget.files[0]);
//                           }}
//                           accept=".zip"
//                         />
//                         <button type="button" onClick={() => remove(index)}>Eliminar</button>
//                       </div>
//                     ))}
//                     <button type="button" onClick={() => push(null)} className="add-file-button">Agregar Archivo</button>
//                   </div>
//                 )}
//               </FieldArray>
//               <ErrorMessage name="files" component="div" className="error" />
//             </div>
//             <button type="submit" disabled={isSubmitting} className="submit-button">Enviar</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default FormDependencia;

// FormDependencia.js


// Formulario.js

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

const Formulario = () => {
  const [step, setStep] = useState(1);

  const validationSchemaStep1 = Yup.object().shape({
    // Validación para los campos del primer paso
    nombreDependencia: Yup.string().required('El nombre de la dependencia es obligatorio'),
    areaAdscripcion: Yup.string().required('El área de adscripción es obligatoria'),
    // Agrega más validaciones según tus requerimientos
  });

  const validationSchemaStep2 = Yup.object().shape({
    // Validación para los campos del segundo paso
    projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
    description: Yup.string().required('La descripción del proyecto es obligatoria'),
    files: Yup.array().required('El archivo ZIP es obligatorio'),
  });

  const handleSubmitStep1 = (values, { setSubmitting }) => {
    // Puedes realizar acciones necesarias aquí antes de pasar al siguiente paso
    setStep(2);
  };

  const handleSubmitStep2 = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('projectName', values.projectName);
      formData.append('description', values.description);

      values.files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      // Obtener el token CSRF de las cookies
      const csrfToken = Cookies.get('csrftoken');

      await axios.post('/guardar-proyecto/', formData, {
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

  return (
    <div className="formulario-container">
      <h2>Formulario</h2>
      <Formik
        initialValues={{
          nombreDependencia: '',
          areaAdscripcion: '',
          direccionCalle: '',
          numero: '',
          colonia: '',
          ciudad: '',
          municipio: '',
          estado: '',
          cp: '',
          correoElectronico: '',
          telefono: '',
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
                <div className="form-group">
                  <label>Nombre de la Dependencia u Organismo</label>
                  <Field type="text" name="nombreDependencia" />
                  <ErrorMessage name="nombreDependencia" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Área de Adscripción</label>
                  <Field type="text" name="areaAdscripcion" />
                  <ErrorMessage name="areaAdscripcion" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Dirección Calle</label>
                  <Field type="text" name="direccionCalle" />
                  <ErrorMessage name="direccionCalle" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Número</label>
                  <Field type="text" name="numero" />
                  <ErrorMessage name="numero" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Colonia</label>
                  <Field type="text" name="colonia" />
                  <ErrorMessage name="colonia" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Ciudad</label>
                  <Field type="text" name="ciudad" />
                  <ErrorMessage name="ciudad" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Municipio</label>
                  <Field type="text" name="municipio" />
                  <ErrorMessage name="municipio" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <Field type="text" name="estado" />
                  <ErrorMessage name="estado" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>C. P.</label>
                  <Field type="text" name="cp" />
                  <ErrorMessage name="cp" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <Field type="email" name="correoElectronico" />
                  <ErrorMessage name="correoElectronico" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <Field type="text" name="telefono" />
                  <ErrorMessage name="telefono" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Nombre(s) de quien registra</label>
                  <Field type="text" name="nombreRegistrante" />
                  <ErrorMessage name="nombreRegistrante" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Apellido Paterno</label>
                  <Field type="text" name="apellidoPaterno" />
                  <ErrorMessage name="apellidoPaterno" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Apellido Materno</label>
                  <Field type="text" name="apellidoMaterno" />
                  <ErrorMessage name="apellidoMaterno" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico Institucional</label>
                  <Field type="email" name="correoInstitucional" />
                  <ErrorMessage name="correoInstitucional" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Teléfono Oficina</label>
                  <Field type="text" name="telefonoOficina" />
                  <ErrorMessage name="telefonoOficina" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico Personal</label>
                  <Field type="email" name="correoPersonal" />
                  <ErrorMessage name="correoPersonal" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Teléfono Particular</label>
                  <Field type="text" name="telefonoParticular" />
                  <ErrorMessage name="telefonoParticular" component="div" className="error" />
                </div>
                <button type="submit" disabled={isSubmitting} className="submit-button">Siguiente</button>
              </div>
            )}
          </Form>
        )}
      </Formik>


      <Formik
        initialValues={{
          tipoProyecto: '',
          sector: '',
          nombreDependenciaMunicipioCiudadania: '',
          unidadResponsable: '',
          unidadPresupuestal: '',
          ramoPresupuestal: '',
          fechaRegistro: '',
          georeferenciacion: '',
          analisisSituacionActual: '',
          objetivos: '',
          metas: '',
          programaPresupuestario: '',
          asignacionObra: '',
          modalidadEjecucion: '',
          beneficiarios: '',
          alineacionNormativa: '',
          region: '',
          municipio: '',
          localidad: '',
          barrioColoniaEjido: '',
          projectName: '',
          description: '',
          files: [],
        }}
        validationSchema={validationSchemaStep2}
        onSubmit={handleSubmitStep2}
      >
        {({ values, isSubmitting }) => (
          <Form>
            {step === 2 && (
              <div>
                <div className="form-group">
                  <label>Tipo de Proyecto</label>
                  <Field type="text" name="tipoProyecto" />
                  <ErrorMessage name="tipoProyecto" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Sector</label>
                  <Field type="text" name="sector" />
                  <ErrorMessage name="sector" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Nombre de la Dependencia/Organismo/Municipio/Ciudadanía</label>
                  <Field type="text" name="nombreDependenciaMunicipioCiudadania" />
                  <ErrorMessage name="nombreDependenciaMunicipioCiudadania" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Unidad Responsable</label>
                  <Field type="text" name="unidadResponsable" />
                  <ErrorMessage name="unidadResponsable" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Unidad Presupuestal</label>
                  <Field type="text" name="unidadPresupuestal" />
                  <ErrorMessage name="unidadPresupuestal" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Ramo Presupuestal</label>
                  <Field type="text" name="ramoPresupuestal" />
                  <ErrorMessage name="ramoPresupuestal" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Fecha de Registro</label>
                  <Field type="date" name="fechaRegistro" />
                  <ErrorMessage name="fechaRegistro" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Georeferenciación</label>
                  <Field type="text" name="georeferenciacion" />
                  <ErrorMessage name="georeferenciacion" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Análisis de la Situación Actual</label>
                  <Field as="textarea" name="analisisSituacionActual" />
                  <ErrorMessage name="analisisSituacionActual" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Objetivos</label>
                  <Field as="textarea" name="objetivos" />
                  <ErrorMessage name="objetivos" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Metas</label>
                  <Field as="textarea" name="metas" />
                  <ErrorMessage name="metas" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Programa Presupuestario</label>
                  <Field as="textarea" name="programaPresupuestario" />
                  <ErrorMessage name="programaPresupuestario" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Asignación de Obra</label>
                  <Field as="textarea" name="asignacionObra" />
                  <ErrorMessage name="asignacionObra" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Modalidad de Ejecución</label>
                  <Field as="textarea" name="modalidadEjecucion" />
                  <ErrorMessage name="modalidadEjecucion" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Beneficiarios</label>
                  <Field as="textarea" name="beneficiarios" />
                  <ErrorMessage name="beneficiarios" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Alineación Normativa Vigente</label>
                  <Field as="textarea" name="alineacionNormativa" />
                  <ErrorMessage name="alineacionNormativa" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Región</label>
                  <Field type="text" name="region" />
                  <ErrorMessage name="region" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Municipio</label>
                  <Field type="text" name="municipio" />
                  <ErrorMessage name="municipio" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Localidad</label>
                  <Field type="text" name="localidad" />
                  <ErrorMessage name="localidad" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Barrio / Colonia / Ejido</label>
                  <Field type="text" name="barrioColoniaEjido" />
                  <ErrorMessage name="barrioColoniaEjido" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Nombre del Proyecto</label>
                  <Field type="text" name="projectName" />
                  <ErrorMessage name="projectName" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <Field as="textarea" name="description" />
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

              </div>
              
            )}
          </Form>
        )}
      </Formik>


    </div>
  );
}

export default Formulario;
