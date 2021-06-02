import React from 'react';

import { Typography } from '../../MaterialUI';
import FieldError from '../FieldError/FieldError';

import useStyles from './FormFieldWrapper.styles';
import { FormFieldWrapperComponentProps } from './FormFieldWrapper.types';

const FormFieldWrapper: React.FC<FormFieldWrapperComponentProps> = React.forwardRef(
  ({ errors, field, label, name }, ref) => {
    const classes = useStyles();

    // Create form field element from field object
    const { fieldClass, ...fieldProps } = field;
    const fieldComponent = React.createElement(fieldClass, {
      name,
      id: name,
      placeholder: label,
      ...fieldProps,
      ref,
    });
    return (
      <Typography
        className={classes.root}
        htmlFor={name}
        variant="body2"
        component="label"
      >
        {label}
        {fieldComponent}
        <div>
          {errors &&
            errors.map((error) => <FieldError key={error} error={error} />)}
        </div>
      </Typography>
    );
  }
);

export default FormFieldWrapper;
