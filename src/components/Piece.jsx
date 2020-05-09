import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import mapRef from '../map.json';
import mapData from '../egdipmap.json';
import * as Utils from '../utils';
import { colors } from '../variables';

const StyledPiece = styled.circle`
  fill: ${(props) => props.color};
  stroke: ${colors.base};
  pointer-events: none;
`;

const getMarker = (props, x, y, size = 8) => {
  const { nation, type } = props;

  const color = lighten(0.2, colors.nations[nation]);

  // Army piece marker style
  if (type === 'army') {
    return <StyledPiece cx={x} cy={y} r={size / 2} color={color} />;
  }

  // Fleet piece marker style
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
  const { territory } = props;
  const data = Utils.matchIdToAbbreviation(territory, mapData, mapRef);
  if (!data) return null;
  const { piece } = data;
  return <g>{getMarker(props, piece.x, piece.y)}</g>;
};

export default Piece;
