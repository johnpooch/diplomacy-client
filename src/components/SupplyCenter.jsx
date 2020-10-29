import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const SupplyCenter = (props) => {
  const { x, y } = props;
  if (x && y) {
    const scale = 0.02;
    const w = faStar.icon[0];
    const h = faStar.icon[0];
    const dx = x - (scale * w) / 2 + 195;
    const dy = y - (scale * h) / 2 + 170;
    return (
      <g
        className="supply-center"
        transform={`translate(${dx}, ${dy}) scale(${scale})`}
      >
        <path d={faStar.icon[4]} />
      </g>
    );
  }
  return null;
};

export default SupplyCenter;
