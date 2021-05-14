import { Container, useTheme } from '@material-ui/core';
import React from 'react';

import useStyles from './FormContainer.styles';

const FormContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Container classes={classes} maxWidth="xs">
      {children}
    </Container>
  );
};

export default FormContainer;
