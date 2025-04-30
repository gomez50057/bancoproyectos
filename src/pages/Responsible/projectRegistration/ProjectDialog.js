import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './ProjectDialog.css';
import { fieldLabels } from '../../../utils';

// Componente memoizado para cada input
const InputField = React.memo(({
  name,
  value,
  onChange,
  onBlur,
  disabled,
  isBlocked,
  toggleBlock,
  toggleObservation,
  showObservation,
  observationValue,
}) => {
  return (
    <div className="dialog-input-container">
      <label className="dialog-label">
        {fieldLabels[name] || name.replace('_', ' ')}
      </label>
      <div className="input-actions-container">
        <textarea
          className="dialog-input"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          rows={3}
        />
        <div className="input-actions">
          {!(name === 'project_id' || name === 'fecha_registro' || name === 'user__username') && (
            <>
              <span className="toggle-text" onClick={() => toggleBlock(name)}>
                {isBlocked ? 'Corrección' : 'Validado'}
              </span>
              <span className="toggle-text" onClick={() => toggleObservation(name)}>
                Agregar observación
              </span>
            </>
          )}
        </div>
      </div>
      {showObservation && (
        <div className="dialog-observation-container">
          <textarea
            className="dialog-input"
            name={`observacion_${name}`}
            placeholder="Agregar observación"
            value={observationValue || ''}
            onChange={onChange}
            rows={3}
          />
          <span className="toggle-text" onClick={() => toggleObservation(name)}>
            Quitar comentario
          </span>
        </div>
      )}
    </div>
  );
});

const ProjectDialog = ({ open, onClose, project, onChange, onSubmit, isEditMode }) => {
  // Hooks declarados siempre al inicio
  const [showObservationFields, setShowObservationFields] = useState({});
  const [notification, setNotification] = useState(null);

  // Lista de campos de inversión a formatear en onBlur
  const inversionFields = [
    'inversion_federal',
    'inversion_estatal',
    'inversion_municipal',
    'inversion_otros',
    'inversion_total',
  ];

  // Funciones memorizadas (siempre declaradas incondicionalmente)
  const handleToggleObservationField = useCallback((key) => {
    setShowObservationFields(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const handleToggleBlockField = useCallback((key) => {
    // Campos de solo lectura
    if (key === 'project_id' || key === 'fecha_registro' || key === 'user__username') return;
    // Se espera que onChange actualice el estado en el componente padre
    onChange({
      target: {
        name: `isBlocked_${key}`,
        value: !project[`isBlocked_${key}`],
      },
    });
  }, [onChange, project]);

  const handleIsBlockedChange = useCallback(() => {
    onChange({
      target: {
        name: 'isBlocked_project',
        value: !project.isBlocked_project,
      },
    });
  }, [onChange, project]);

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put(`/proyecto/${project.project_id}/`, project);
        setNotification({ type: 'success', text: 'Proyecto actualizado exitosamente' });
      } else {
        await axios.post('/proyecto/', project);
        setNotification({ type: 'success', text: 'Proyecto agregado exitosamente' });
      }
      // Se espera 3 segundos para mostrar el mensaje antes de ejecutar onSubmit (posible cierre o actualización)
      setTimeout(() => {
        setNotification(null);
        onSubmit();
      }, 3000);
    } catch (error) {
      setNotification({ type: 'error', text: 'Valida datos, hay un error' });
      setTimeout(() => setNotification(null), 3000);
      console.error('Error saving project:', error);
    }
  };

  // Función para formatear números con comas
  const formatWithCommas = (value) => {
    if (!value) return '';
    const numericValue = value.toString().replace(/,/g, '');
    const number = parseFloat(numericValue);
    return isNaN(number) ? value : number.toLocaleString('es-MX');
  };

  // onBlur para formatear campos de inversión
  const handleBlur = (key, e) => {
    if (inversionFields.includes(key)) {
      const formattedValue = formatWithCommas(e.target.value);
      onChange({
        target: {
          name: key,
          value: formattedValue,
        },
      });
    }
  };

  const renderInputField = (key) => {
    const value = project[key] || '';
    const disabled = project[`isBlocked_${key}`] ||
      key === 'project_id' ||
      key === 'fecha_registro' ||
      key === 'user__username';

    return (
      <InputField
        key={key}
        name={key}
        value={value}
        onChange={onChange}
        onBlur={inversionFields.includes(key) ? (e) => handleBlur(key, e) : undefined}
        disabled={disabled}
        isBlocked={project[`isBlocked_${key}`]}
        toggleBlock={handleToggleBlockField}
        toggleObservation={handleToggleObservationField}
        showObservation={showObservationFields[key]}
        observationValue={project[`observacion_${key}`]}
      />
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

  // Si no está abierto, no se renderiza nada (esto se hace después de los hooks)
  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <div className="dialog-title">
            {isEditMode ? 'Editar Proyecto' : 'Agregar Proyecto'}
          </div>
          <button className="dialog-close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.text}
          </div>
        )}
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
