import { Grid } from '@material-ui/core';
import React from 'react';

const GameCardGrid: React.FC = ({ children }) => {
  return (
    <Grid container direction="column" spacing={3}>
      {React.Children.map(children, (child) => (
        <Grid item>{child}</Grid>
      ))}
    </Grid>
  );
};

export default GameCardGrid;
