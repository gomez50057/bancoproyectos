import React from 'react';
import { useDropzone } from 'react-dropzone';
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

  const handleDrop = (acceptedFiles, field) => {
    setFieldValue(field, [...(values[field] || []), ...acceptedFiles]); // Añadir los archivos seleccionados al estado de Formik
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
                <span className="custom-checkbox"></span>
                Aplica
              </label>
              <label>
                <Field type="checkbox" name={`applies.${field}`} checked={!applies[field]} onChange={() => handleApplyChange(field)} />
                <span className="custom-checkbox"></span>
                No Aplica
              </label>
            </div>

          </div>

          {applies[field] && (
            <div className="file-input-group">
              <DropzoneField field={field} handleDrop={handleDrop} values={values} />
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

const DropzoneField = ({ field, handleDrop, values }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf,.xlsx,.jpeg,.dwg,.rtv,.mp4",
    multiple: true,
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, field),
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos</p>
      {values[field] && values[field].length > 0 && (
        <ul>
          {values[field].map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentUploadSection;
