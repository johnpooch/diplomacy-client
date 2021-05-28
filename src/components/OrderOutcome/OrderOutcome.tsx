import React from 'react';

import { Typography } from '../MaterialUI';

import useStyles from './OrderOutcome.styles';
import { OrderOutcomeComponentProps } from './OrderOutcome.types';

const OrderOutcome: React.FC<OrderOutcomeComponentProps> = ({
  outcome,
  message,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body2" component="span" className={classes.outcome}>
        {outcome}
      </Typography>
      <Typography variant="body2" component="span">
        {message}
      </Typography>
    </div>
  );
};

export default OrderOutcome;
