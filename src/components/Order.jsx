import React from 'react';

import AuxArrow from './AuxArrow';
import BuildOrder from './BuildOrder';
import TargetArrow from './TargetArrow';

const getSourceCoords = (source, type) => {
  if (type === 'retreat') {
    return [source.dislodgedx, source.dislodgedy];
  }
  return [source.x, source.y];
};

const Order = (props) => {
  const { order } = props;
  const { aux, id, nation, source, target, type } = order;
  const elements = [];

  if (type === 'build') {
    return <BuildOrder key={id} order={order} />;
  }

  if (target) {
    const [sx, sy] = getSourceCoords(source, type);
    const { x: tx, y: ty } = target;
    elements.push(
      <TargetArrow
        key={`move-${id}`}
        id={id}
        type={type}
        nation={nation}
        x1={sx}
        x2={tx}
        y1={sy}
        y2={ty}
        offsetSize={26}
      />
    );
    if (aux) {
      const { x: ax, y: ay } = aux;
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
