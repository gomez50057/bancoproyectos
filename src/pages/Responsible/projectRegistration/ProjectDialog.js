import React, { useState } from 'react';
import axios from 'axios';
import './ProjectDialog.css';
import { fieldLabels } from '../../../utils'; // Ajusta la ruta según corresponda

const ProjectDialog = ({ open, onClose, project, onChange, onSubmit, isEditMode }) => {
  const [showObservationFields, setShowObservationFields] = useState({});

  if (!open) return null;

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

  const handleIsBlockedChange = () => {
    onChange({
      target: {
        name: 'isBlocked_project',
        value: !project.isBlocked_project,
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

  // Función para formatear números con comas
  const formatWithCommas = (value) => {
    if (value === null || value === undefined || value === '') return '';
    // Eliminamos comas existentes
    const numericValue = value.toString().replace(/,/g, '');
    const number = parseFloat(numericValue);
    if (isNaN(number)) {
      return value;
    }
    return number.toLocaleString('es-MX');
  };

  const renderInputField = (key) => {
    // Formatea el valor con comas
    const inversionFields = [
      'inversion_federal',
      'inversion_estatal',
      'inversion_municipal',
      'inversion_otros',
      'inversion_total',
    ];
    const fieldValue =
      inversionFields.includes(key) && project[key]
        ? formatWithCommas(project[key])
        : project[key] || '';

    return (
      <div key={key} className="dialog-input-container">
        <label className="dialog-label">
          {fieldLabels[key] || key.replace('_', ' ')}
        </label>
        <div className="input-actions-container">
          <textarea
            className="dialog-input"
            name={key}
            value={fieldValue}
            onChange={onChange}
            disabled={
              project[`isBlocked_${key}`] ||
              key === 'project_id' ||
              key === 'fecha_registro' ||
              key === 'user__username'
            }
            rows={3}
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
            <textarea
              className="dialog-input"
              name={`observacion_${key}`}
              placeholder="Agregar observación"
              value={project[`observacion_${key}`] || ''}
              onChange={onChange}
              rows={3}
            />
            <span className="toggle-text" onClick={() => handleToggleObservationField(key)}>
              Quitar comentario
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderSelectField = (key, options) => (
    <div key={key} className="dialog-select-container">
      <label className="dialog-label">
        {fieldLabels[key] || key.replace('_', ' ')}
      </label>
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
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-title">
          {isEditMode ? 'Editar Proyecto' : 'Agregar Proyecto'}
        </div>
        <div className="dialog-content">
          <div className="dialog-checkbox-container">
            <label className="dialog-label">Habilitar actualización al usuario</label>
            <input
              type="checkbox"
              checked={!project.isBlocked_project}
              onChange={handleIsBlockedChange}
            />
          </div>

          <div className="dialog-row">
            {renderInputField('project_id')}
            {renderInputField('fecha_registro')}
          </div>

          {renderInputField('nombre_proyecto')}

          <div className="dialog-row">
            {renderInputField('tipo_entidad')}
          </div>

          <div className="dialog-row">
            {renderInputField('dependencia')}
            {renderInputField('organismo')}
            {renderInputField('municipio_ayuntamiento')}
          </div>

          <div className="dialog-row">
            {renderInputField('region')}
            {renderInputField('municipio')}
            {renderInputField('localidad')}
          </div>

          <div className="dialog-row">
            {renderInputField('barrio_colonia')}
            {renderInputField('tipo_localidad')}
          </div>

          <div className="dialog-row">
            {renderInputField('latitud')}
            {renderInputField('longitud')}
          </div>

          <div className="dialog-row">
            {renderInputField('sector')}
            {renderInputField('tipo_proyecto')}
          </div>

          <div className="dialog-row">
            {renderInputField('unidad_responsable')}
            {renderInputField('unidad_presupuestal')}
            {renderInputField('ramo_presupuestal')}
          </div>

          <div className="dialog-row">
            {renderInputField('inversion_federal')}
            {renderInputField('inversion_estatal')}
            {renderInputField('inversion_municipal')}
            {renderInputField('inversion_otros')}
          </div>

          {renderInputField('inversion_total')}

          {renderInputField('descripcion')}

          {renderInputField('situacion_sin_proyecto')}

          <div className="dialog-row">
            {renderInputField('objetivos')}
            {renderInputField('metas')}
          </div>

          <div className="dialog-row">
            {renderInputField('tiempo_ejecucion')}
            {renderInputField('modalidad_ejecucion')}
          </div>

          <div className="dialog-row">
            {renderInputField('beneficiarios')}
            {renderInputField('gasto_programable')}
            {renderInputField('programa_presupuestario')}
          </div>

          {renderInputField('normativa_aplicable')}

          <div className="dialog-row">
            {renderInputField('plan_nacional')}
            {renderInputField('plan_estatal')}
            {renderInputField('plan_municipal')}
          </div>

          <div className="dialog-row">
            {renderInputField('ods')}
            {renderInputField('acuerdos_transversales')}
            {renderInputField('programas_SIE')}
          </div>

          <div className="dialog-row">
            {renderInputField('indicadores_estrategicos')}
            {renderInputField('indicadores_socioeconomicos')}
          </div>

          <div className="dialog-row">
            {renderInputField('area_adscripcion')}
            {renderInputField('nombre_registrante')}
            {renderInputField('apellido_paterno')}
            {renderInputField('apellido_materno')}
          </div>

          <div className="dialog-row">
            {renderInputField('correo')}
            {renderInputField('telefono')}
            {renderInputField('telefono_ext')}
          </div>

          {renderInputField('observaciones')}
          {renderInputField('porcentaje_avance')}
          {renderSelectField('estatus', ['Atendido', 'En Proceso', 'Registrado'])}
          {renderSelectField('situacion', ['Vigente', 'Antecedente', 'Cancelado'])}
          {renderInputField('retroalimentacion')}
        </div>
        <div className="dialog-actions">
          <button className="dialog-button" onClick={onClose}>Cancelar</button>
          <button className="dialog-button" onClick={handleSubmit}>
            {isEditMode ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDialog;
