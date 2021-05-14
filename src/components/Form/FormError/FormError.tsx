import React from 'react';

import { StyledFieldError } from './FormError.styles';
import { FieldErrorComponentProps } from './FormError.types';

const FieldError: React.FC<FieldErrorComponentProps> = ({ error }) => {
  return <StyledFieldError>{error}</StyledFieldError>;
};

export default FieldError;
