import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FileInputField = ({ name, label, setFieldValue }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      type="file"
      name={name}
      onChange={(event) => setFieldValue(name, event.currentTarget.files[0])}
      accept=".jpeg,.jpg,.png,.pdf"
    />
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

export default React.memo(FileInputField);
