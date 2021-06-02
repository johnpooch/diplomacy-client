import React from 'react';

import { Container, useTheme } from '../../MaterialUI';

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
