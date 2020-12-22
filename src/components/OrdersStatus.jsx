import React from 'react';

import { SecondaryButton } from './Button';

const OrdersStatus = ({ finalizeOrders, toggleSurrender, userNation }) => {
  if (!userNation) return null;

  const {
    numOrdersRemaining,
    ordersFinalized,
    loading,
    surrender,
  } = userNation;

  let ordersRemainingMessage = null;
  if (ordersFinalized) {
    ordersRemainingMessage = 'Orders finalized';
  } else {
    const orderType = numOrdersRemaining === 1 ? 'order' : 'orders';
    ordersRemainingMessage = `${numOrdersRemaining} ${orderType} remaining`;
  }

  const finalizeButtonText = ordersFinalized
    ? 'Un-finalize orders'
    : 'Finalize orders';

  const surrenderButtonText = surrender ? 'Cancel surrender' : 'Surrender';
  const surrenderId = surrender ? surrender.id : null;

  const onClickSurrender = () => {
    toggleSurrender(surrenderId);
  };

  return (
    <div className="orders">
      <span className="orders-remaining">{ordersRemainingMessage}</span>
      <SecondaryButton
        type="submit"
        onClick={finalizeOrders}
        disabled={loading}
      >
        {finalizeButtonText}
      </SecondaryButton>
      <SecondaryButton
        type="submit"
        onClick={onClickSurrender}
        disabled={false}
      >
        {surrenderButtonText}
      </SecondaryButton>
    </div>
  );
};

export default OrdersStatus;
