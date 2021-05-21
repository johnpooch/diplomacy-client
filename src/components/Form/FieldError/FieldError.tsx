import { Typography, useTheme } from '@material-ui/core';
import React from 'react';

import useStyles from './FieldError.styles';
import { FieldErrorComponentProps } from './FieldError.types';

const FieldError: React.FC<FieldErrorComponentProps> = ({ error }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Typography role="alert" variant="body2" className={classes.root}>
      {error}
    </Typography>
  );
};

export default FieldError;
