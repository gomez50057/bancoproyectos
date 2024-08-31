// src/pages/Client/PresupuestoInver/CedulaRegistroForm.js

import React, { useState } from 'react';
import { dependencias, organismos, unidadPresupuestalPorUnidadResponsable, acuerdosPorObjetivo } from '../../../presup_inversion';
import SectionTitle from '../componentsForm/SectionTitle'; 
const CedulaRegistroForm = () => {
  const [formData, setFormData] = useState({
    ejercicioFiscal: '',
    dependencia: '',
    organismo: '',
    unidadResponsable: '',
    unidadPresupuestal: '',
    nombreProyecto: '',
    descripcionProyecto: '',
    inversionPresupuestada: '',
    acuerdoAplicable: '',
    objetivo: '',
    prioridad: '',
    propuestaCampaña: '',
    expedienteTecnico: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Obtener opciones de unidad presupuestal basado en unidad responsable seleccionada
  const unidadesPresupuestales = unidadPresupuestalPorUnidadResponsable[formData.unidadResponsable] || [];

  // Obtener opciones de objetivo basado en acuerdo aplicable seleccionado
  const objetivos = acuerdosPorObjetivo[formData.acuerdoAplicable] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Aquí puedes agregar lógica para enviar los datos al backend o procesarlos
  };

  return (
    <form onSubmit={handleSubmit}>
      <SectionTitle title="Datos Generales" />

      <label>Ejercicio Fiscal</label>
      <select name="ejercicioFiscal" value={formData.ejercicioFiscal} onChange={handleInputChange}>
        <option value="">Selecciona una opción</option>
        {['2020', '2021', '2022', '2023', '2024', '2025'].map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <label>Dependencia</label>
      <select name="dependencia" value={formData.dependencia} onChange={handleInputChange}>
        <option value="">Selecciona una opción</option>
        {dependencias.map(dep => (
          <option key={dep} value={dep}>{dep}</option>
        ))}
      </select>

      <label>Organismo</label>
      <select name="organismo" value={formData.organismo} onChange={handleInputChange}>
        <option value="">Selecciona una opción</option>
        {organismos.map(org => (
          <option key={org} value={org}>{org}</option>
        ))}
      </select>

      <label>Unidad Responsable</label>
      <select name="unidadResponsable" value={formData.unidadResponsable} onChange={handleInputChange}>
        <option value="">Selecciona una opción</option>
        {Object.keys(unidadPresupuestalPorUnidadResponsable).map(unidad => (
          <option key={unidad} value={unidad}>{unidad}</option>
        ))}
      </select>

      <label>Unidad Presupuestal</label>
      <select name="unidadPresupuestal" value={formData.unidadPresupuestal} onChange={handleInputChange} disabled={!formData.unidadResponsable}>
        <option value="">Selecciona una opción</option>
        {unidadesPresupuestales.map(unidad => (
          <option key={unidad} value={unidad}>{unidad}</option>
        ))}
      </select>

      <label>Nombre del Proyecto</label>
      <input
        type="text"
        name="nombreProyecto"
        value={formData.nombreProyecto}
        onChange={handleInputChange}
        maxLength="250"
      />

      <label>Descripción del Proyecto</label>
      <textarea
        name="descripcionProyecto"
        value={formData.descripcionProyecto}
        onChange={handleInputChange}
        maxLength="1000"
      />

      <SectionTitle title="Estructura Financiera" />

      <label>Inversión Presupuestada</label>
      <input
        type="number"
        step="0.01"
        name="inversionPresupuestada"
        value={formData.inversionPresupuestada}
        onChange={handleInputChange}
        maxLength="250"
      />

      <SectionTitle title="Alineación PED" />

      <label>Acuerdo Aplicable</label>
      <select name="acuerdoAplicable" value={formData.acuerdoAplicable} onChange={handleInputChange}>
        <option value="">Selecciona una opción</option>
        {Object.keys(acuerdosPorObjetivo).map(acuerdo => (
          <option key={acuerdo} value={acuerdo}>{acuerdo}</option>
        ))}
      </select>

      <label>Objetivo</label>
      <select name="objetivo" value={formData.objetivo} onChange={handleInputChange} disabled={!formData.acuerdoAplicable}>
        <option value="">Selecciona una opción</option>
        {objetivos.map(obj => (
          <option key={obj} value={obj}>{obj}</option>
        ))}
      </select>

      <SectionTitle title="Alineación al Programa Sectorial/Especial" />
      {/* Aquí puedes agregar campos adicionales según sea necesario */}

      <SectionTitle title="Programa Institucional de Desarrollo" />
      {/* Aquí puedes agregar campos adicionales según sea necesario */}

      <SectionTitle title="Verificación de Propuesta" />

      <label>¿Cual es la Prioridad?</label>
      <select name="prioridad" value={formData.prioridad} onChange={handleInputChange}>
        <option value="">Selecciona una opción</option>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>

      <label>¿Se apega con alguna propuesta de campaña?</label>
      <select name="propuestaCampaña" value={formData.propuestaCampaña} onChange={handleInputChange}>
        <option value="">Selecciona una opción</option>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>

      <label>¿Cuenta con expediente técnico?</label>
      <select name="expedienteTecnico" value={formData.expedienteTecnico} onChange={handleInputChange}>
        <option value="">Selecciona una opción</option>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default CedulaRegistroForm;
