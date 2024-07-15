import React, { useState } from 'react';
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

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-title">
          {isEditMode ? 'Editar Proyecto' : 'Agregar Proyecto'}
        </div>
        <div className="dialog-content">
          {Object.keys(project).map((key) => (
            key !== 'estatus' && key !== 'situacion' && key !== 'observaciones' ? (
              <div key={key} className="dialog-input-container">
                <label className="dialog-label">{key.replace('_', ' ')}</label>
                <input
                  className="dialog-input"
                  type="text"
                  name={key}
                  value={project[key] || ''}
                  onChange={onChange}
                />
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
                  >
                    <option value="Atendido">Atendido</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Sin Avance">Sin Avance</option>
                  </select>
                </div>
              ) : (
                <div key={key} className="dialog-select-container">
                  <label className="dialog-label">Situación</label>
                  <select
                    name="situacion"
                    value={project.situacion || ''}
                    onChange={onChange}
                    className="dialog-select"
                  >
                    <option value="Vigente">Vigente</option>
                    <option value="Antecedente">Antecedente</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
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
          <button className="dialog-button" onClick={onSubmit}>{isEditMode ? 'Actualizar' : 'Agregar'}</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDialog;
