import React, { ReactElement } from 'react';

import { Order } from '../types';

interface OrderOutcome {
  order: Order;
}

const OrderOutcome = ({ order }: OrderOutcome): ReactElement => {
  return (
    <div className="order-outcome">
      <span className="outcome">{order.outcome}</span>,{' '}
    </div>
  );
};

export default OrderOutcome;
