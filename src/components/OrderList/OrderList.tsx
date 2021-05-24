import { Typography } from '@material-ui/core';
import React from 'react';

import Order from '../Order';

import useStyles from './OrderList.styles';
import { OrderListComponentProps } from './OrderList.types';

const OrderList: React.FC<OrderListComponentProps> = ({
  numOrdersGiven,
  numOrdersToGive,
  orders,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="body2" className={classes.orderCount}>
        {numOrdersGiven}/{numOrdersToGive}
      </Typography>
      {orders.map((order) => (
        <Order
          isCurrent
          outcome={null}
          order={order.order}
          loading={order.loading}
        />
      ))}
    </div>
  );
};

export default OrderList;
