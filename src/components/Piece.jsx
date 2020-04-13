import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import mapData from '../map.json';
import * as Utils from '../utils';
import { colors } from '../variables';

const StyledRect = styled.rect`
  fill: transparent;
  stroke: white;
  stroke-width: 0.5;
  stroke-dasharray: 1;
`;

const StyledPiece = styled.circle`
  fill: ${(props) => props.color};
  stroke: ${colors.base};
`;

const StyledText = styled.text`
  fill: white;
  font-size: 8px;
  text-anchor: middle;
  pointer-events: none;
`;

const getMarker = (props, x, y, size = 8) => {
  const { nation, type } = props;
  const color = lighten(0.25, colors.nations[nation]);
  if (type === 'army') {
    // Army marker style
    return <StyledPiece cx={x} cy={y} r={size / 2} color={color} />;
  }
  // Fleet marker style
  return (
    <StyledPiece
      as="rect"
      x={x - size / 2}
      y={y - size / 2}
      width={size}
      height={size}
      color={color}
    />
  );
};

const Piece = (props) => {
  const { territory, type } = props;
  const data = Utils.getObjectByKey(territory, mapData.territories);
  if (!data) return null;
  const { bounds } = data;
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height / 2;
  return (
    <g>
      <StyledRect
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
      />
      {getMarker(props, x, y)}
      <StyledText x={x} y={y - 8} dominantBaseline="baseline">
        {type}
      </StyledText>
    </g>
  );
};

export default Piece;
