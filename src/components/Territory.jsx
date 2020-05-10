import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import SupplyCenter from './SupplyCenter';
import mapRef from '../map.json';
import * as Utils from '../utils';
import { colors, fontSizes } from '../variables';

const StyledTerritory = styled.g`
  path {
    stroke-width: 1;
    stroke: ${colors.base};
    fill: ${(props) =>
      props.hover ? lighten(0.07, props.color) : props.color};

    + text {
      font-size: ${fontSizes.sans[0]}px;
      text-anchor: left;
      pointer-events: none;
      text-transform: uppercase;
      user-select: none;
      fill: ${(props) => (props.hover ? colors.base : 'white')};
      font-weight: ${(props) => (props.hover ? 'bold' : 'normal')};
    }
  }
`;

const getTerritoryColor = (territory) => {
  const { controlledBy, type } = territory;
  if (type === 'sea') return colors.sea;
  if (controlledBy !== null && controlledBy in colors.nations) {
    return colors.nations[controlledBy];
  }
  return colors.land;
};

const getPath = (props) => {
  const { territory, _mouseOver, _mouseOut, id } = props;
  const { path } = territory;
  return (
    <path
      onMouseOver={() => {
        _mouseOver(id);
      }}
      onFocus={() => {
        _mouseOver(id);
      }}
      onMouseOut={() => {
        _mouseOut();
      }}
      onBlur={() => {
        _mouseOut();
      }}
      d={path}
    />
  );
};

const getText = (territory) => {
  const { textX, textY, abbreviation } = territory;
  if (abbreviation) {
    return (
      <text x={textX} y={textY}>
        {abbreviation}
      </text>
    );
  }
  return null;
};

const getSupplyCenter = (territory) => {
  const {
    supplyCenter,
    type,
    id,
    controlledBy,
    supplyCenterX,
    supplyCenterY,
  } = territory;
  if (supplyCenter) {
    const coastal = type === 'coastal';
    return (
      <SupplyCenter
        x={supplyCenterX}
        y={supplyCenterY}
        coastal={coastal}
        territory={id}
        nation={controlledBy}
      />
    );
  }
  return null;
};

const Territory = (props) => {
  const { territory, hovering, interacting } = props;
  const hover = !interacting && hovering;
  const color = getTerritoryColor(territory);
  return (
    <StyledTerritory color={color} hover={hover}>
      {getPath(props)}
      {getText(territory)}
      {getSupplyCenter(territory)}
    </StyledTerritory>
  );
};

export default Territory;
