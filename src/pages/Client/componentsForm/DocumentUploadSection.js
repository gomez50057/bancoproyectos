// src/pages/Client/componentsForm/DocumentUploadSection.js

import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';

const DocumentUploadSection = ({ applies, handleApplyChange, values, setFieldValue }) => {
  const documentos = [
    { label: 'Estudios Prospectivos', field: 'estudiosProspectivos' },
    { label: 'Estudios de Factibilidad', field: 'estudiosFactibilidad' },
    { label: 'Análisis de Alternativas', field: 'analisisAlternativas' },
    { label: 'Validación Normativa', field: 'validacionNormativa' },
    { label: 'Liberación de Derecho de Vía', field: 'liberacionDerechoVia' },
    { label: 'Estado Inicial (Complemento)', field: 'situacionSinProyectoFotografico' },
    { label: 'Estado con Proyecto (Complemento)', field: 'situacionConProyectoProyeccion' },
    { label: 'Análisis Costo Beneficio (ACB)', field: 'analisisCostoBeneficio' },
    { label: 'Expediente Técnico', field: 'expedienteTecnico' },
    { label: 'Proyecto Ejecutivo', field: 'proyectoEjecutivo' },
    { label: 'Manifestación Impacto Ambiental (MIA)', field: 'manifestacionImpactoAmbiental' },
    { label: 'Otros Estudios y/o Documentos Que Complementen el Proyecto', field: 'otrosEstudios' },
  ];

  return (
    <div className="RENTABILIDAD">
      {documentos.map(({ label, field }) => (
        <div key={field} className="CargaDocumentacion">
          <div className="textAplica">
            <label>{label}</label>
            <div className="checkAplica">
              <label>
                <Field type="checkbox" name={`applies.${field}`} checked={applies[field]} onChange={() => handleApplyChange(field)} />
                Aplica
              </label>
              <label>
                <Field type="checkbox" name={`applies.${field}`} checked={!applies[field]} onChange={() => handleApplyChange(field)} />
                No Aplica
              </label>
            </div>
          </div>

          {applies[field] && (
            <FieldArray name={field}>
              {({ push, remove }) => (
                <div>
                  {values[field].map((file, index) => (
                    <div key={index} className="file-input-group">
                      <input
                        type="file"
                        onChange={(event) => {
                          const files = Array.from(event.currentTarget.files);
                          files.forEach(file => setFieldValue(`${field}.${index}`, file));
                        }}
                        accept=".pdf,.xlsx,.jpeg,.dwg,.rtv,.mp4"
                      />
                      <button type="button" onClick={() => remove(index)}>Eliminar</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push(null)} className="add-file-button">
                    Agregar Archivo
                  </button>
                </div>
              )}
            </FieldArray>
          )}
          <ErrorMessage name={field} component="div" className="error" />
        </div>
      ))}
    </div>
  );
};

export default DocumentUploadSection;
