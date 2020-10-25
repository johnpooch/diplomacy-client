import React from 'react';

import Order from './Order';

const Orders = ({ orders }) => {
  const elements = [];
  orders.forEach((order) => {
    const { id } = order;
    elements.push(<Order key={id} order={order} />);
  });
  return elements;
};

export default Orders;
