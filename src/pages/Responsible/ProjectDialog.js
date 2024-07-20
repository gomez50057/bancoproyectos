import React, { useState } from 'react';
import axios from 'axios';
import './ProjectDialog.css';

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

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-title">
          {isEditMode ? 'Editar Proyecto' : 'Agregar Proyecto'}
        </div>
        <div className="dialog-content">
          {Object.keys(project).map((key) => (
            key !== 'estatus' && key !== 'situacion' && !key.startsWith('isBlocked_') && !key.startsWith('observacion_') && key !== 'retroalimentacion' ? (
              <div key={key} className="dialog-input-container">
                <label className="dialog-label">{key.replace('_', ' ')}</label>
                <input
                  className="dialog-input"
                  type="text"
                  name={key}
                  value={project[key] || ''}
                  onChange={onChange}
                  disabled={project[`isBlocked_${key}`]} // Bloquear el campo si está marcado como bloqueado
                />
                <span className="toggle-text" onClick={() => handleToggleBlockField(key)}>
                  {project[`isBlocked_${key}`] ? 'Desbloquear' : 'Bloquear'}
                </span>
                {showObservationFields[key] ? (
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
                ) : (
                  <span className="toggle-text" onClick={() => handleToggleObservationField(key)}>
                    Agregar observación
                  </span>
                )}
              </div>
            ) : (
              key === 'estatus' ? (
                <div key={key} className="dialog-select-container">
                  <label className="dialog-label">Estatus</label>
                  <select
                    name="estatus"
                    value={project.estatus || ''}
                    onChange={onChange}
                    className="dialog-select"
                    disabled={project[`isBlocked_estatus`]} // Bloquear el campo si está marcado como bloqueado
                  >
                    <option value="Atendido">Atendido</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Sin Avance">Sin Avance</option>
                  </select>
                  <span className="toggle-text" onClick={() => handleToggleBlockField('estatus')}>
                    {project[`isBlocked_estatus`] ? 'Desbloquear' : 'Bloquear'}
                  </span>
                </div>
              ) : (
                key === 'situacion' && (
                  <div key={key} className="dialog-select-container">
                    <label className="dialog-label">Situación</label>
                    <select
                      name="situacion"
                      value={project.situacion || ''}
                      onChange={onChange}
                      className="dialog-select"
                      disabled={project[`isBlocked_situacion`]} // Bloquear el campo si está marcado como bloqueado
                    >
                      <option value="Vigente">Vigente</option>
                      <option value="Antecedente">Antecedente</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                    <span className="toggle-text" onClick={() => handleToggleBlockField('situacion')}>
                      {project[`isBlocked_situacion`] ? 'Desbloquear' : 'Bloquear'}
                    </span>
                  </div>
                )
              )
            )
          ))}
          <div className="dialog-input-container">
            <label className="dialog-label">Retroalimentación</label>
            <input
              className="dialog-input"
              type="text"
              name="retroalimentacion"
              value={project.retroalimentacion || ''}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="dialog-actions">
          <button className="dialog-button" onClick={onClose}>Cancelar</button>
          <button className="dialog-button" onClick={handleSubmit}>{isEditMode ? 'Actualizar' : 'Agregar'}</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDialog;
