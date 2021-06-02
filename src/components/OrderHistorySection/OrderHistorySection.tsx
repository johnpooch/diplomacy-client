/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import OrderHistory from '../OrderHistory';

import { OrderHistorySectionComponentProps } from './OrderHistorySection.types';

const OrderHistorySection: React.FC<OrderHistorySectionComponentProps> = ({
  nationStates,
}) => {
  return (
    <div>
      {nationStates.map((nationState) => (
        <OrderHistory key={nationState.id} nationState={nationState} />
      ))}
    </div>
  );
};

export default OrderHistorySection;
