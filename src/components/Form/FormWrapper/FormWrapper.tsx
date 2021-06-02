import React from 'react';

import { Paper, Typography } from '../../MaterialUI';

import useStyles from './FormWrapper.styles';
import { FormWrapperComponentProps } from './FormWrapper.types';

const FormWrapper: React.FC<FormWrapperComponentProps> = ({
  title,
  children,
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.header} variant="h3" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

export default FormWrapper;
