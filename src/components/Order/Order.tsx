import React from 'react';

import { Cancel } from '../Icon';
import { IconButton } from '../MaterialUI';
import OrderOutcome from '../OrderOutcome/OrderOutcome';
import OrderSummary from '../OrderSummary';

import useStyles from './Order.styles';
import { OrderComponentProps } from './Order.types';

const Order: React.FC<OrderComponentProps> = ({
  cancelOrder,
  order,
  outcome,
  isCurrent,
}) => {
  const classes = useStyles();
  const rootClasses = order.loading
    ? `${classes.root} ${classes.disabled}`
    : classes.root;
  return (
    <div className={rootClasses}>
      <div className={classes.order}>
        <OrderSummary order={order} />
        {isCurrent && (
          <IconButton
            aria-label="cancel"
            disabled={order.loading}
            onClick={() => cancelOrder(order.id)}
            title="Cancel order"
          >
            <Cancel />
          </IconButton>
        )}
      </div>
      {outcome && (
        <OrderOutcome outcome={outcome.outcome} message={outcome.message} />
      )}
    </div>
  );
};

export default Order;
