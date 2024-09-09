import React from 'react';
import { Field, ErrorMessage } from 'formik';

const DocumentUploadSection = ({ applies, handleApplyChange, values, setFieldValue }) => {
  const documentos = [
    { label: 'Estudios de Factibilidad', field: 'estudios_factibilidad' },
    { label: 'Análisis de Alternativas', field: 'analisis_alternativas' },
    { label: 'Validación Normativa', field: 'validacion_normativa' },
    { label: 'Liberación de Derecho de Vía', field: 'liberacion_derecho_via' },
    { label: 'Análisis Costo Beneficio (ACB)', field: 'analisis_costo_beneficio' },
    { label: 'Proyecto Ejecutivo', field: 'proyecto_ejecutivo' },
    { label: 'Manifestación Impacto Ambiental (MIA)', field: 'manifestacion_impacto_ambiental' },
    { label: 'Fotografía o Render del Proyecto', field: 'fotografia_render_proyecto' },
    { label: 'Otros Estudios y/o Documentos Que Complementen el Proyecto', field: 'otros_estudios' },
  ];

  const handleFileChange = (event, field) => {
    const files = Array.from(event.currentTarget.files); // Obtener todos los archivos seleccionados
    setFieldValue(field, files); // Guardar la lista de archivos en el estado de Formik
  };

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
            <div className="file-input-group">
              <input
                type="file"
                multiple // Permitir múltiples archivos
                onChange={(event) => handleFileChange(event, field)}
                accept=".pdf,.xlsx,.jpeg,.dwg,.rtv,.mp4"
              />
              {values[field] && values[field].length > 0 && (
                <ul>
                  {values[field].map((file, index) => (
                    <li key={index}>{file.name}</li> // Mostrar la lista de archivos cargados
                  ))}
                </ul>
              )}
            </div>
          )}
          <ErrorMessage name={field} component="div" className="error" />
        </div>
      ))}
    </div>
  );
};

export default DocumentUploadSection;
