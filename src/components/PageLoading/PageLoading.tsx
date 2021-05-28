import React from 'react';

import { CircularProgress } from '../MaterialUI';

import useStyles from './PageLoading.styles';

const PageLoading: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default PageLoading;
