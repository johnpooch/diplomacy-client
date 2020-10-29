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

const getStrokeColor = (mustRetreat, userCanOrder) => {
  if (mustRetreat) return colors.error;
  if (userCanOrder) return 'white';
  return 'transparent';
};

const pieceIcons = {
  army: faChessPawn,
  fleet: faAnchor,
};

const pieceScales = {
  army: 0.07,
  fleet: 0.07,
};

const Piece = (props) => {
  const { piece } = props;
  if (!piece) return null;
  const { nation, x, y, mustRetreat, type, userCanOrder, hasOrders } = piece;
  const faIcon = pieceIcons[type];
  const scale = pieceScales[type];
  const w = faIcon.icon[0];
  const h = faIcon.icon[1];
  const dx = x - (scale * w) / 2 + 195;
  const dy = y - (scale * h) / 2 + 170;
  const shadowSize = 20;

  const color = lighten(0.2, colors.nations[nation]);

  return (
    <g transform={`translate(${dx}, ${dy}) scale(${scale})`}>
      <StyledCircle
        r={shadowSize}
        cx={dx}
        cy={dy}
        strokeColor={getStrokeColor(mustRetreat, userCanOrder)}
        mustRetreat={mustRetreat}
        userCanOrder={userCanOrder}
        hasOrders={hasOrders}
      />
      ;
      <StyledPath d={faIcon.icon[4]} color={color} />
    </g>
  );
};

export default Piece;
