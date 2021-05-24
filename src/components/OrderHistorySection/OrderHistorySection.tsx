/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import OrderHistory from '../OrderHistory';

import { OrderHistorySectionComponentProps } from './OrderHistorySection.types';

const OrderHistorySection: React.FC<OrderHistorySectionComponentProps> = ({
  nationOrderHistories,
}) => {
  return (
    <div>
      {nationOrderHistories.map((nationOrderHistory) => (
        <OrderHistory
          key={nationOrderHistory.nation.id}
          {...nationOrderHistory}
        />
      ))}
    </div>
  );
};

export default OrderHistorySection;
