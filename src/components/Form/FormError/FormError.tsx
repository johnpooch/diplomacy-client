import { useTheme } from '@material-ui/core';
import React from 'react';

import useStyles from './FormError.styles';
import { FieldErrorComponentProps } from './FormError.types';

const FieldError: React.FC<FieldErrorComponentProps> = ({ error }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return <div className={classes.root}>{error}</div>;
};

export default FieldError;
