import React from 'react';

import { Warning } from '../Icon';
import { Typography } from '../MaterialUI';

import useStyles from './ComponentError.styles';
import { ComponentErrorComponentProps } from './ComponentError.types';

const ComponentError: React.FC<ComponentErrorComponentProps> = ({ error }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} role="alert">
      <div className={classes.icon}>
        <Warning />
      </div>
      <Typography variant="body2">{error}</Typography>
    </div>
  );
};

export default ComponentError;
