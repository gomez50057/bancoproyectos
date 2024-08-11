// FieldGroup.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FieldGroup = React.memo(({ label, name, component = "input", children, ...rest }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} component={component} {...rest}>
      {children}
    </Field>
    <ErrorMessage name={name} component="div" className="error" />
  </div>
));

export default FieldGroup;
