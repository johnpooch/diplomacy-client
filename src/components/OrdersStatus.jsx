import React from 'react';

import { SecondaryButton } from './Button';

const OrdersStatus = ({ finalizeOrders, userNation }) => {
  if (!userNation) return null;

  const { numOrdersRemaining, ordersFinalized, loading } = userNation;

  let ordersRemainingMessage = null;
  if (ordersFinalized) {
    ordersRemainingMessage = 'Orders finalized';
  } else {
    const orderType = numOrdersRemaining === 1 ? 'order' : 'orders';
    ordersRemainingMessage = `${numOrdersRemaining} ${orderType} remaining`;
  }

  const buttonText = ordersFinalized ? 'Un-finalize orders' : 'Finalize orders';

  return (
    <div className="orders">
      <span className="orders-remaining">{ordersRemainingMessage}</span>
      <SecondaryButton
        type="submit"
        onClick={finalizeOrders}
        disabled={loading}
      >
        {buttonText}
      </SecondaryButton>
    </div>
  );
};

export default OrdersStatus;
