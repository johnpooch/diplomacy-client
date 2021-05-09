/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import StyledInput from './Input.styles';
import { InputComponentProps } from './Input.types';

const Input: React.FC<
  InputComponentProps & React.InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
