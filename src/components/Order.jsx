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
    sx = source.dislodgedPieceX;
    sy = source.dislodgedPieceY;
  } else {
    sx = source.pieceX;
    sy = source.pieceY;
  }

  if (target) {
    let { pieceX: tx, pieceY: ty } = target;
    if (targetCoast) {
      tx = targetCoast.pieceX;
      ty = targetCoast.pieceY;
    }
    elements.push(
      <TargetArrow
        key={`move-${id}`}
        id={id}
        type={type}
        nation={nation}
        x1={source.pieceX}
        x2={tx}
        y1={source.pieceY}
        y2={ty}
        offsetSize={26}
      />
    );
    if (aux) {
      const { pieceX: ax, pieceY: ay } = aux;
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
