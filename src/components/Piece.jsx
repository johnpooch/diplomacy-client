import React from 'react';
import styled from '@emotion/styled';

import mapData from '../map.json';
import * as Utils from '../utils';
import { colors } from '../variables';

const StyledText = styled.text`
  fill: white;
  font-size: 10px;
  text-anchor: middle;
  dominant-baseline: central;
  pointer-events: none;
`;

const StyledRect = styled.rect`
  fill: transparent;
  stroke: white;
  stroke-width: 0.5;
  stroke-dasharray: 1;
`;

const Piece = (props) => {
  const { id, territory, type, nation } = props;
  const data = Utils.getObjectByKey(territory, mapData.territories);
  if (!data) return null;
  console.log(data);
  const { bounds } = data;
  const color = colors.nations[nation].piece;
  // const viewBox = `0 0 ${bounds.width} ${bounds.height}`;
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height / 2;
  return (
    <g>
      <StyledRect
        key={id}
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
      />
      <StyledText x={x} y={y} color={color}>
        {type}
      </StyledText>
    </g>
    // <svg
    //   viewBox={viewBox}
    //   x={bounds.x}
    //   y={bounds.y}
    //   width={bounds.width}
    //   height={bounds.height}
    // >
    //   <StyledText
    //     x="50%"
    //     y="50%"
    //     // x={x} y={y}
    //     color={color}
    //   >
    //     {type}
    //   </StyledText>
    // </svg>
  );
};

export default Piece;
