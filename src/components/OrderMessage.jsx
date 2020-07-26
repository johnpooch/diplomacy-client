import React from 'react';

function shouldRender(order) {
  const { type, target } = order;
  const possibleOrderTypes = ['move', 'retreat', 'support', 'convoy'];
  return target ? false : possibleOrderTypes.includes(type);
}

function getPreposition(order) {
  const { type, aux } = order;
  if (['move', 'retreat'].includes(type)) {
    return 'into';
  }
  return aux ? 'into' : 'from';
}

const OrderMessage = (props) => {
  const { order } = props;
  const { type } = order;
  if (!shouldRender(order)) return null;
  const preposition = getPreposition(order);
  return (
    <div>
      Select a territory to {type} {preposition}.
    </div>
  );
};

export default OrderMessage;
