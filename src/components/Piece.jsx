import React from 'react';
import styled from '@emotion/styled';
import { faChessPawn, faAnchor } from '@fortawesome/free-solid-svg-icons';
import { lighten } from 'polished';

import { colors } from '../variables';

const StyledCircle = styled.circle`
  fill: ${(props) =>
    props.userCanOrder && !props.hasOrders ? 'white' : 'rgba(0, 0, 0, 0.25)'};
  stroke: ${(props) => props.strokeColor};
  stroke-width: 4px;
  stroke-dasharray: ${(props) => (props.mustRetreat ? '2, 12' : 'none')};
  stroke-linecap: round;
  pointer-events: none;
`;

const StyledPath = styled.path`
  fill: ${(props) => props.color};
  stroke: ${colors.base};
  stroke-width: 30px;
  pointer-events: none;
`;

const getStrokeColor = (props) => {
  const { mustRetreat, userCanOrder } = props;
  if (mustRetreat) return colors.error;
  if (userCanOrder) return 'white';
  return 'transparent';
};

const renderIcon = (props, faIcon, scale, shadowSize = 20) => {
  const { nation, x, y, mustRetreat, userCanOrder, hasOrders } = props;

  const w = faIcon.icon[0];
  const h = faIcon.icon[1];

  const dx = x - (scale * w) / 2;
  const dy = y - (scale * h) / 2;

  const color = lighten(0.2, colors.nations[nation]);

  return (
    <g>
      <StyledCircle
        r={shadowSize}
        cx={x}
        cy={y}
        strokeColor={getStrokeColor(props)}
        mustRetreat={mustRetreat}
        userCanOrder={userCanOrder}
        hasOrders={hasOrders}
      />
      ;
      <StyledPath
        d={faIcon.icon[4]}
        color={color}
        transform={`translate(${dx}, ${dy}) scale(${scale})`}
      />
    </g>
  );
};

const Piece = (props) => {
  const { type } = props;

  if (type === 'army') {
    return renderIcon(props, faChessPawn, 0.05);
  }

  if (type === 'fleet') {
    return renderIcon(props, faAnchor, 0.05);
  }

  return null;
};

export default Piece;
