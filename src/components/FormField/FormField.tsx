import React from 'react';

import FieldError from '../FormError/FormError';

import { StyledFormField } from './FormField.styles';
import { FormFieldComponentProps } from './FormField.types';

const FormField: React.FC<FormFieldComponentProps> = ({
  errors,
  field,
  label,
  name,
}) => {
  return (
    <StyledFormField htmlFor={name}>
      <span>{label}</span>
      {field}
      <div>
        {errors &&
          errors.map((error) => <FieldError key={error} error={error} />)}
      </div>
    </StyledFormField>
  );
};

export default FormField;
