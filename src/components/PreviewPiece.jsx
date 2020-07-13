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
  const { nation, x, y } = props;

  const w = faIcon.icon[0];
  const h = faIcon.icon[1];

  const dx = x - (scale * w) / 2;
  const dy = y - (scale * h) / 2;

  const color = lighten(0.2, colors.nations[nation]);

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

const PreviewPiece = (props) => {
  const { type } = props;
  console.log('HERE');

  if (type === 'army') {
    return renderIcon(props, faChessPawn, 0.12);
  }

  if (type === 'fleet') {
    return renderIcon(props, faAnchor, 0.12);
  }

  return null;
};

export default PreviewPiece;
