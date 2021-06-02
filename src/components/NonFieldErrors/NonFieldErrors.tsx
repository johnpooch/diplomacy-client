import React from 'react';

import { Typography } from '../MaterialUI';

import useStyles from './NonFieldErrors.styles';
import { NonFieldErrorsComponentProps } from './NonFieldErrors.types';

const NonFieldErrors: React.FC<NonFieldErrorsComponentProps> = ({ errors }) => {
  if (!errors) return null;
  const classes = useStyles();
  return (
    <div>
      {errors.map((e) => (
        <Typography
          key={e}
          variant="body2"
          className={classes.root}
          role="alert"
        >
          {e}
        </Typography>
      ))}
    </div>
  );
};

export default NonFieldErrors;
