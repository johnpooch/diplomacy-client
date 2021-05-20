/* eslint-disable react/jsx-props-no-spreading */
import { useTheme } from '@material-ui/core';
import React from 'react';

import UseStyles from './Input.styles';

const Input = React.forwardRef<HTMLInputElement>((props, ref) => {
  const theme = useTheme();
  const classes = UseStyles(theme);
  return <input className={classes.root} ref={ref} {...props} />;
});

export default Input;
