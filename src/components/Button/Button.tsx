/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Button, ButtonTypeMap, ExtendButtonBase } from '../MaterialUI';

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
