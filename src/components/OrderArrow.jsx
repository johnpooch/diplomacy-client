import React from 'react';
import styled from '@emotion/styled';

import { Vector } from '../utils';

const StyledLine = styled.line`
  stroke: white;
  stroke-width: 4px;
  pointer-events: none;
`;

const OrderArrow = (props) => {
  const { type, offsetSize, x1, y1, x2, y2 } = props;
  const v = new Vector(x2 - x1, y2 - y1);
  v.normalize();
  const offset = v.length > offsetSize ? offsetSize : 0;
  return (
    <g>
      <StyledLine
        x1={x1}
        y1={y1}
        x2={x2 - offset * v.x}
        y2={y2 - offset * v.y}
        markerEnd={`url(#arrow-${type})`}
      />
    </g>
  );
};

export default OrderArrow;
