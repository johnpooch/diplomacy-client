import React from 'react';
import styled from '@emotion/styled';
import { darken } from 'polished';

import { colors } from '../variables';

const StyledSupplyCenter = styled.circle`
  fill: ${(props) => props.color};
  pointer-events: none;
`;

const SupplyCenter = (props) => {
  const { nation, coastal, x, y } = props;
  const size = 20;

  // Work out what color the marker should be
  let color = colors.land;
  if (nation in colors.nations) {
    color = colors.nations[nation];
  }
  color = darken(0.2, color);

  // Army supply center marker style
  if (!coastal) {
    return <StyledSupplyCenter cx={x} cy={y} r={size / 2} color={color} />;
  }

  // Fleet supply center marker style
  return (
    <g>
      <StyledSupplyCenter
        as="rect"
        x={x - size / 2}
        y={y - size / 2}
        width={size}
        height={size}
        color={color}
      />
    </g>
  );
};

export default SupplyCenter;
