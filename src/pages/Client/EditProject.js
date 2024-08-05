import React, { useState } from 'react';
import axios from 'axios';

const EditProject = ({ project, onChange, onSubmit, isEditMode }) => {
  const [showObservationFields, setShowObservationFields] = useState({});

  if (!project) {
    console.log('Project is undefined or null');
    return <div>Cargando...</div>;
  }

  const handleToggleObservationField = (key) => {
    setShowObservationFields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleToggleBlockField = (key) => {
    if (key === 'project_id' || key === 'fecha_registro' || key === 'user__username') {
      return;
    }
    onChange({
      target: {
        name: `isBlocked_${key}`,
        value: !project[`isBlocked_${key}`],
      },
    });
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put(`/proyecto/${project.project_id}/`, project);
      } else {
        await axios.post('/proyecto/', project);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const renderInputField = (key) => (
    <div key={key} className="dialog-input-container">
      <label className="dialog-label">{key.replace('_', ' ')}</label>
      <div className="input-actions-container">
        <input
          className="dialog-input"
          type="text"
          name={key}
          value={project[key] || ''}
          onChange={onChange}
          disabled={project[`isBlocked_${key}`] || key === 'project_id' || key === 'fecha_registro' || key === 'user__username'}
        />
        <div className="input-actions">
          {!(key === 'project_id' || key === 'fecha_registro' || key === 'user__username') && (
            <span className="toggle-text" onClick={() => handleToggleBlockField(key)}>
              {project[`isBlocked_${key}`] ? 'Corrección' : 'Validado'}
            </span>
          )}
          <span className="toggle-text" onClick={() => handleToggleObservationField(key)}>
            Agregar observación
          </span>
        </div>
      </div>
      {showObservationFields[key] && (
        <div className="dialog-observation-container">
          <input
            className="dialog-input"
            type="text"
            name={`observacion_${key}`}
            placeholder="Agregar observación"
            value={project[`observacion_${key}`] || ''}
            onChange={onChange}
          />
          <span className="toggle-text" onClick={() => handleToggleObservationField(key)}>
            Quitar comentario
          </span>
        </div>
      )}
    </div>
  );

  const renderSelectField = (key, options) => (
    <div key={key} className="dialog-select-container">
      <label className="dialog-label">{key.replace('_', ' ')}</label>
      <select
        name={key}
        value={project[key] || ''}
        onChange={onChange}
        className="dialog-select"
        disabled={project[`isBlocked_${key}`]}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="toggle-text" onClick={() => handleToggleBlockField(key)}>
        {project[`isBlocked_${key}`] ? 'Corrección' : 'Validado'}
      </span>
    </div>
  );

  return (
    <div className="edit-project-container">
      <div className="edit-project-title">
        {isEditMode ? 'Editar Proyecto' : 'Agregar Proyecto'}
      </div>
      <div className="edit-project-content">
        <div className="dialog-row">
          {renderInputField('project_id')}
          {renderInputField('fecha_registro')}
        </div>
        {renderInputField('project_name')}
        <div className="dialog-row">
          {renderInputField('sector')}
          {renderInputField('tipo_proyecto')}
          {renderInputField('tipo_entidad')}
        </div>
        <div className="dialog-row">
          {renderInputField('dependencia')}
          {renderInputField('organismo')}
          {renderInputField('municipioEnd')}
          {renderInputField('peticion_personal')}
        </div>
        <div className="dialog-row">
          {renderInputField('unidad_responsable')}
          {renderInputField('unidad_presupuestal')}
          {renderInputField('ramo_presupuestal')}
        </div>
        <div className="dialog-row">
          {renderInputField('monto_federal')}
          {renderInputField('monto_estatal')}
          {renderInputField('monto_municipal')}
          {renderInputField('monto_otros')}
        </div>
        {renderInputField('inversion_estimada')}
        {renderInputField('descripcion')}
        {renderInputField('situacion_sin_proyecto')}
        <div className="dialog-row">
          {renderInputField('objetivos')}
          {renderInputField('metas')}
        </div>
        <div className="dialog-row">
          {renderInputField('gasto_programable')}
          {renderInputField('programa_presupuestario')}
          {renderInputField('beneficiarios')}
        </div>
        {renderInputField('alineacion_normativa')}
        <div className="dialog-row">
          {renderInputField('region')}
          {renderInputField('municipio')}
          {renderInputField('municipio_impacto')}
        </div>
        <div className="dialog-row">
          {renderInputField('localidad')}
          {renderInputField('barrio_colonia_ejido')}
        </div>
        <div className="dialog-row">
          {renderInputField('latitud')}
          {renderInputField('longitud')}
        </div>
        <div className="dialog-row">
          {renderInputField('plan_nacional')}
          {renderInputField('plan_estatal')}
          {renderInputField('plan_municipal')}
        </div>
        <div className="dialog-row">
          {renderInputField('ods')}
          {renderInputField('plan_sectorial')}
          {renderInputField('indicadores_estrategicos')}
        </div>
        <div className="dialog-row">
          {renderInputField('indicadores_tacticos')}
          {renderInputField('indicadores_desempeno')}
          {renderInputField('indicadores_rentabilidad')}
        </div>
        <div className="dialog-row">
          {renderInputField('estado_inicial')}
          {renderInputField('estado_con_proyecto')}
        </div>
        <div className="dialog-row">
          {renderInputField('estudios_prospectivos')}
          {renderInputField('estudios_factibilidad')}
        </div>
        <div className="dialog-row">
          {renderInputField('analisis_alternativas')}
          {renderInputField('validacion_normativa')}
        </div>
        <div className="dialog-row">
          {renderInputField('liberacion_derecho_via')}
          {renderInputField('situacion_sin_proyecto_fotografico')}
        </div>
        <div className="dialog-row">
          {renderInputField('situacion_con_proyecto_proyeccion')}
          {renderInputField('analisis_costo_beneficio')}
        </div>
        <div className="dialog-row">
          {renderInputField('expediente_tecnico')}
          {renderInputField('proyecto_ejecutivo')}
        </div>
        <div className="dialog-row">
          {renderInputField('manifestacion_impacto_ambiental')}
          {renderInputField('otros_estudios')}
        </div>
        {renderInputField('observaciones')}
        {renderInputField('porcentaje_avance')}
        {renderSelectField('estatus', ['Atendido', 'En Proceso', 'Sin Avance'])}
        {renderSelectField('situacion', ['Vigente', 'Antecedente', 'Cancelado'])}
        {renderInputField('retroalimentacion')}
      </div>
      <div className="edit-project-actions">
        <button className="dialog-button" onClick={handleSubmit}>{isEditMode ? 'Actualizar' : 'Agregar'}</button>
      </div>
    </div>
  );
};

export default EditProject;
