import React from 'react';
import styled from '@emotion/styled';

import { Vector } from '../utils';

const StyledLine = styled.line`
  stroke: white;
  stroke-width: 4px;
`;

const OrderArrow = (props) => {
  const { type, x1, y1, x2, y2 } = props;
  const v = new Vector(x2 - x1, y2 - y1);
  v.normalize();
  const offsetStart = v.length > 20 ? 20 : 0;
  const offsetEnd = v.length > 26 ? 26 : 0;
  return (
    <g>
      <StyledLine
        x1={x1 + offsetStart * v.x}
        y1={y1 + offsetStart * v.y}
        x2={x2 - offsetEnd * v.x}
        y2={y2 - offsetEnd * v.y}
        markerEnd={`url(#arrow-${type})`}
      />
    </g>
  );
};

export default OrderArrow;
