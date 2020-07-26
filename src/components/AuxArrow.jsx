import React from 'react';
import styled from '@emotion/styled';

import { Vector } from '../utils';

const StyledLine = styled.line`
  stroke: white;
  stroke-width: 4px;
  pointer-events: none;
`;

const StyledCircle = styled.circle`
  fill: white;
  pointer-events: none;
`;

const supportStyle = {
  strokeDasharray: '.5, 10',
  strokeLinecap: 'round',
};

const letterStyle = {
  textAnchor: 'middle',
  stroke: 'black',
  strokeWidth: '1px',
  dominantBaseline: 'central',
};

const styles = {
  move: null,
  support: supportStyle,
};

const AuxArrow = (props) => {
  const { type, offsetSize, x1, y1, x2, y2 } = props;
  const v = new Vector(x2 - x1, y2 - y1);
  v.normalize();
  const offset = v.length > offsetSize ? offsetSize : 0;
  const circleSize = 10;

  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;

  return (
    <g>
      <g>
        <StyledLine
          x1={x1}
          y1={y1}
          x2={x2 - offset * v.x}
          y2={y2 - offset * v.y}
          markerEnd={`url(#arrow-support)`}
          style={styles[type]}
        />
      </g>
      <g>
        <StyledCircle r={circleSize} cx={cx} cy={cy} />
        <text x={cx} y={cy} style={letterStyle}>
          {type.charAt(0).toUpperCase()}
        </text>
      </g>
    </g>
  );
};

export default AuxArrow;
