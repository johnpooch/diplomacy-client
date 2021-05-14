/* eslint-disable react/jsx-props-no-spreading */
import { Button, ButtonTypeMap, ExtendButtonBase } from '@material-ui/core';
import React from 'react';

export const PrimaryButton: ExtendButtonBase<ButtonTypeMap> = (props) => {
  const { children } = props;
  return (
    <Button
      variant="contained"
      disableElevation
      disableRipple
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
};

export default Button;
