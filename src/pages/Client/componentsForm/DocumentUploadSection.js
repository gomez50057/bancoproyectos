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
    { label: 'Render del Proyecto', field: 'fotografia_render_proyecto' },
    { label: 'Otros Estudios y/o Documentos que Complementen el Proyecto', field: 'otros_estudios' },
  ];

  const handleDrop = (acceptedFiles, field) => {
    setFieldValue(field, [...(values[field] || []), ...acceptedFiles]); // Añadir los archivos seleccionados al estado de Formik
  };

  const handleRemoveFile = (field, fileIndex) => {
    const updatedFiles = values[field].filter((_, index) => index !== fileIndex);
    setFieldValue(field, updatedFiles); // Actualizar la lista de archivos
  };

  return (
    <div className="RENTABILIDAD">
      <p>Si cuentas con documentos complementarios para tu proyecto, anéxalos en el campo correspondiente. Solo se permiten archivos en formato PDF, XLSX, JPEG, DWG, MP4 y KML. Además, el tamaño total de los archivos adjuntos no debe exceder los 250 MB por envío. Asegúrate de que los documentos cumplan con estos requisitos para evitar problemas al cargar el formulario. Si tus archivos superan este límite, te recomendamos reducir el tamaño de tus archivos antes de adjuntarlos.</p>
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
              <DropzoneField field={field} handleDrop={handleDrop} handleRemoveFile={handleRemoveFile} values={values} />
            </div>
          )}
          <ErrorMessage name={field} component="div" className="error" />
        </div>
      ))}
    </div>
  );
};

const DropzoneField = ({ field, handleDrop, handleRemoveFile, values }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/jpeg': ['.jpeg'],
      'image/vnd.dwg': ['.dwg'],
      'video/mp4': ['.mp4'],
      'application/vnd.google-earth.kml+xml': ['.kml'], 
    },
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
            <li key={index}>
              {file.name}
              <button type="button" onClick={() => handleRemoveFile(field, index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentUploadSection;
