import React from 'react';
import styled from '@emotion/styled';
import { darken } from 'polished';

import mapData from '../map.json';
import * as Utils from '../utils';
import { colors } from '../variables';

const StyledSupplyCenter = styled.circle`
  fill: ${(props) => props.color};
`;

const getMarker = (props, x, y, size = 2.5) => {
  const { nation, coastal } = props;

  // Work out what color the marker should be
  let color = colors.land;
  if (nation in colors.nations) {
    color = colors.nations[nation];
  }
  color = darken(0.15, color);

  if (!coastal) {
    // Army supply center marker style
    return <StyledSupplyCenter cx={x} cy={y} r={size / 2} color={color} />;
  }
  // Fleet supply center marker style
  return (
    <StyledSupplyCenter
      as="rect"
      x={x - size / 2}
      y={y - size / 2}
      width={size}
      height={size}
      color={color}
    />
  );
};

const SupplyCenter = (props) => {
  const { territory } = props;
  const data = Utils.getObjectByKey(territory, mapData.territories);
  // console.log(data);
  if (!data || !('supply' in data)) return null;
  const { supply } = data;
  return <g>{getMarker(props, supply.x, supply.y)}</g>;
};

export default SupplyCenter;
