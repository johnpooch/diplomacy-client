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

const getTerritoryColor = (type, controlledBy) => {
  if (type === 'sea') return colors.sea;
  if (controlledBy !== null && controlledBy in colors.nations) {
    return colors.nations[controlledBy];
  }
  return colors.land;
};

const getPath = (props) => {
  const { path, _mouseOver, _mouseOut, id } = props;
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

const getText = (props) => {
  const { textX, textY, abbreviation } = props;
  if (abbreviation) {
    return (
      <text x={textX} y={textY}>
        {abbreviation}
      </text>
    );
  }
  return null;
};

const getSupplyCenter = (props) => {
  const {
    supplyCenter,
    type,
    id,
    controlledBy,
    supplyCenterX,
    supplyCenterY,
  } = props;
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
};

const Territory = (props) => {
  const { id, type, controlledBy, hovering, interacting } = props;
  const hover = !interacting && hovering;
  const color = getTerritoryColor(type, controlledBy);
  return (
    <StyledTerritory color={color} hover={hover}>
      {getPath(props)}
      {getText(props)}
      {getSupplyCenter(props)}
    </StyledTerritory>
  );
};

export default Territory;
