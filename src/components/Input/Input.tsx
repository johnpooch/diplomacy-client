/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import StyledInput from './Input.styles';
import { InputComponentProps } from './Input.types';

const Input: React.FC<
  InputComponentProps & React.InputHTMLAttributes<HTMLInputElement>
> = React.forwardRef((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

export default Input;
