/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import StyledButton from './Button.styles';
import { ButtonComponentProps } from './Button.types';

const Button: React.FC<
  ButtonComponentProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ icon, label, ...props }) => {
  return (
    <StyledButton primary {...props}>
      {icon}
      {label}
    </StyledButton>
  );
};

export default Button;
