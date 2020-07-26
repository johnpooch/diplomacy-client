import React from 'react';
import styled from '@emotion/styled';
import { faChessPawn, faAnchor } from '@fortawesome/free-solid-svg-icons';
import { lighten } from 'polished';

import { colors } from '../variables';

const StyledCircle = styled.circle`
  fill: rgba(0, 0, 0, 0.2);
  pointer-events: none;
`;

const StyledPath = styled.path`
  fill: ${(props) => props.color};
  stroke: ${colors.base};
  stroke-width: 30px;
  pointer-events: none;
`;

const renderIcon = (props, faIcon, scale, shadowSize = 20) => {
  const { order, x, y } = props;
  const { nation } = order;

  const w = faIcon.icon[0];
  const h = faIcon.icon[1];

  const dx = x - (scale * w) / 2;
  const dy = y - (scale * h) / 2;

  const color = lighten(1, colors.nations[nation]);

  return (
    <g>
      <StyledCircle r={shadowSize} cx={x} cy={y} />;
      <StyledPath
        d={faIcon.icon[4]}
        color={color}
        transform={`translate(${dx}, ${dy}) scale(${scale})`}
      />
    </g>
  );
};

const BuildOrder = (props) => {
  const { order } = props;
  const { piece_type: pieceType } = order;

  if (pieceType === 'army') {
    return renderIcon(props, faChessPawn, 0.06);
  }
  return renderIcon(props, faAnchor, 0.05);
};

export default BuildOrder;
