import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './EditProject.css';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/proyecto/${projectId}/`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleSubmit = async (values) => {
    try {
      const { user, ...restValues } = values;
      await axios.put(`/proyecto/${projectId}/`, restValues);
      navigate('/panel-usuario');
    } catch (error) {
      console.error('Error updating project:', error.response ? error.response.data : error);
      alert(`Ocurrió un error al actualizar el proyecto: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  const renderInputField = (key, label) => (
    <div key={key} className="input-container">
      <label className="input-label">{label}</label>
      <Field
        className="input-field"
        type="text"
        name={key}
        disabled={project[`isBlocked_${key}`]}
      />
      <ErrorMessage name={key} component="div" className="error" />
    </div>
  );

  const renderSelectField = (key, label, options) => (
    <div key={key} className="input-container">
      <label className="input-label">{label}</label>
      <Field as="select" name={key} className="input-field" disabled={project[`isBlocked_${key}`]}>
        <option value="">Seleccione</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Field>
      <ErrorMessage name={key} component="div" className="error" />
    </div>
  );

  if (!project) return <div>Loading...</div>;

  return (
    <div className="edit-project-container">
      <h2>Editar Proyecto</h2>
      <Formik
        initialValues={project}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {renderInputField('project_name', 'Nombre del Proyecto')}
            <div className="row">
              {renderInputField('sector', 'Sector')}
              {renderInputField('tipo_proyecto', 'Tipo de Proyecto')}
              {renderInputField('tipo_entidad', 'Tipo de Entidad')}
            </div>
            <div className="row">
              {renderInputField('dependencia', 'Dependencia')}
              {renderInputField('organismo', 'Organismo')}
              {renderInputField('municipioEnd', 'Municipio')}
            </div>
            {renderInputField('descripcion', 'Descripción')}
            <div className="row">
              {renderInputField('objetivos', 'Objetivos')}
              {renderInputField('metas', 'Metas')}
            </div>
            <div className="row">
              {renderInputField('latitud', 'Latitud')}
              {renderInputField('longitud', 'Longitud')}
            </div>
            {renderSelectField('estatus', 'Estatus', ['Atendido', 'En Proceso', 'Sin Avance'])}
            {renderSelectField('situacion', 'Situación', ['Vigente', 'Antecedente', 'Cancelado'])}
            {renderInputField('observaciones', 'Observaciones')}

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProject;
