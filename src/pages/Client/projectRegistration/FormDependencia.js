import React, { useState } from 'react';
import { Formik } from 'formik';
import Formulario from './FormQuestions';
import validationSchemaStep2 from './validationSchemaStep2';
import ProjectCreationModal from '../componentsForm/ProjectCreationModal';
import Cookies from 'js-cookie';
import axios from 'axios';

const FormDependencia = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  // Manejo de la presentación de datos
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
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
          projectName: '',
          tipoEntidad: '',
          dependencia: '',
          organismo: '',
          municipioAyuntamiento: '',
          sector: '',
          tipoProyecto: '',
          PeticionPersonal: '',
          unidadResponsable: '',
          unidadPresupuestal: '',
          ramoPresupuestal: '',
          montoFederal: '0',
          montoEstatal: '0',
          montoMunicipal: '0',
          montoOtros: '0',
          inversionEstimada: '0',
          descripcion: '',
          situacionSinProyecto: '',
          objetivos: '',
          metas: '',
          gastoProgramable: '',
          programaPresupuestario: '',
          beneficiarios: '',
          normativaAplicableVigente: '',
          alineacionNormativa: '',
          region: '',
          municipio: '',
          localidad: '',
          barrioColoniaEjido: '',
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
          indicadoresDesempeno: '',
          indicadoresRentabilidad: '',
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
