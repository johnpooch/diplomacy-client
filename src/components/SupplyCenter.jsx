import React from 'react';
import styled from '@emotion/styled';
import { darken } from 'polished';

import { colors } from '../variables';

const StyledSupplyCenter = styled.circle`
  fill: ${(props) => props.color};
  pointer-events: none;
`;

const SupplyCenter = (props) => {
  const { controlledBy, type, x, y } = props;
  const size = 8;

  // Work out what color the marker should be
  let color = colors.land;
  if (controlledBy && controlledBy.id in colors.nations) {
    color = colors.nations[controlledBy.id];
  }
  color = darken(0.15, color);

  // Army supply center marker style
  if (type !== 'sea') {
    return (
      <StyledSupplyCenter
        transform="translate(195, 170)"
        cx={x}
        cy={y}
        r={size / 2}
        color={color}
      />
    );
  }

  // Fleet supply center marker style
  return (
    <g>
      <StyledSupplyCenter
        transform="translate(195, 170)"
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
