import React from 'react';

import AuxArrow from './AuxArrow';
import BuildOrder from './BuildOrder';
import TargetArrow from './TargetArrow';

const Order = ({ order }) => {
  const { aux, id, nation, source, target, targetCoast, type } = order;
  const elements = [];

  if (type === 'build') {
    return <BuildOrder key={id} order={order} />;
  }

  let [sx, sy] = [null, null];
  if (order.type === 'retreat') {
    sx = source.dislodged_piece_x;
    sy = source.dislodged_piece_y;
  } else {
    sx = source.piece_x;
    sy = source.piece_y;
  }

  if (target) {
    let { piece_x: tx, piece_y: ty } = target;
    if (targetCoast) {
      tx = targetCoast.piece_x;
      ty = targetCoast.piece_y;
    }
    elements.push(
      <TargetArrow
        key={`move-${id}`}
        id={id}
        type={type}
        nation={nation}
        x1={source.piece_x}
        x2={tx}
        y1={source.piece_y}
        y2={ty}
        offsetSize={26}
      />
    );
    if (aux) {
      const { piece_x: ax, piece_y: ay } = aux;
      elements.push(
        <AuxArrow
          key={`aux-${id}`}
          id={id}
          type={type}
          nation={nation}
          x1={sx}
          x2={ax}
          y1={sy}
          y2={ay}
          offsetSize={26}
        />
      );
    }
  }
  return elements;
};

export default Order;
