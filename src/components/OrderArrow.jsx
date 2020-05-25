import React from 'react';
import styled from '@emotion/styled';

const StyledLine = styled.line`
  stroke: white;
  stroke-width: 4px;
`;

const OrderArrow = (props) => {
  const { type, x1, y1, x2, y2 } = props;
  return (
    <StyledLine
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      type={type}
      markerEnd={`url(#arrow-${type})`}
    />
  );
};

export default OrderArrow;
