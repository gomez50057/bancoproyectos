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
    alert('Iniciando el envío del formulario...');
    console.log('Form data to be submitted:', values);
    try {
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post('guardar-proyecto/', values, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const projectId = response.data.project_id;
      setGeneratedId(projectId);
      setModalIsOpen(true);

      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
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
          areaAdscripcion: '',
          nombreRegistrante: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          correo: '',
          telefono: '',
          telefonoExt: '',
          fechaRegistro: fechaHoy,
          nombreProyecto: '',
          sector: '',
          tipoProyecto: '',
          tipoEntidad: '',
          dependencia: '',
          organismo: '',
          municipioAyuntamiento: '',
          unidadResponsable: '',
          unidadPresupuestal: '',
          inversionFederal: '0',
          inversionEstatal: '0',
          inversionMunicipal: '0',
          inversionOtros: '0',
          inversionTotal: '0',
          ramoPresupuestal: '',
          descripcion: '',
          situacionSinProyecto: '',
          objetivos: '',
          metas: '',
          programaPresupuestario: '',
          gastoProgramable: '',
          beneficiarios: '',
          normativaAplicable: '',
          region: '',
          municipio: '',
          localidad: '',
          barrioColonia: '',
          latitud: '',
          longitud: '',
          municipiosImpacto: [],
          planNacional: '',
          planEstatal: '',
          planMunicipal: '',
          acuerdosTransversales: '',
          ods: '',
          programasSIE: '',
          indicadoresEstrategicos: '',
          indicadoresTacticos: '',


          observaciones: '',          
        }}
        validationSchema={validationSchemaStep2}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Formulario
            setFieldValue={setFieldValue}
            values={values}
            isSubmitting={isSubmitting}
          />
        )}
      </Formik>

      <ProjectCreationModal isOpen={modalIsOpen} onRequestClose={closeModal} projectId={generatedId} />
    </div>
  );
};

export default FormDependencia;
