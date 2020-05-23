import React from 'react';
import styled from '@emotion/styled';
import { faChessPawn, faAnchor } from '@fortawesome/free-solid-svg-icons';
import { lighten } from 'polished';

import { colors } from '../variables';

const StyledPath = styled.path`
  fill: ${(props) => props.color};
  stroke: ${colors.base};
  stroke-width: 30px;
  pointer-events: none;
`;

const renderIcon = (props, faIcon, scale) => {
  const { nation, x, y } = props;

  const w = faIcon.icon[0];
  const h = faIcon.icon[0];
  const dx = x - (scale * w) / 2;
  const dy = y - (scale * h) / 2;

  const color = lighten(0.2, colors.nations[nation]);

  return (
    <g transform={`translate(${dx}, ${dy}) scale(${scale})`}>
      <StyledPath d={faIcon.icon[4]} color={color} />
    </g>
  );
};

const Piece = (props) => {
  const { type } = props;

  if (type === 'army') {
    return renderIcon(props, faChessPawn, 0.08);
  }

  if (type === 'fleet') {
    return renderIcon(props, faAnchor, 0.07);
  }

  return null;
};

export default Piece;
