/* eslint camelcase: [2, { "allow": ["text_x", "text_y", "supply_center_x", "supply_center_y"] }] */
import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import SupplyCenter from './SupplyCenter';
import { colors, fontSizes } from '../variables';

const StyledTerritory = styled.g`
  path {
    stroke-width: 1;
    stroke: ${colors.base};
    fill: ${(props) =>
      props.hover ? lighten(0.07, props.color) : props.color};

    + text {
      font-size: ${fontSizes.sans[1]}px;
      text-anchor: middle;
      pointer-events: none;
      text-transform: uppercase;
      user-select: none;
      fill: ${(props) => (props.hover ? colors.base : 'white')};
      font-weight: ${(props) => (props.hover ? 'bold' : 'normal')};
    }
  }
`;

const getTerritoryColor = (controlledBy, type) => {
  if (type === 'sea') return colors.sea;
  if (controlledBy) {
    const { id } = controlledBy;
    if (id !== null && id in colors.nations) {
      return colors.nations[id];
    }
  }
  return colors.land;
};

const getPath = (props) => {
  const { data, _mouseOver, _mouseOut, id } = props;
  const { path } = data;
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

const getText = (data) => {
  const { text_x, text_y, abbreviation } = data;
  if (abbreviation && text_x && text_y) {
    return (
      <text x={text_x} y={text_y} transform="translate(195, 170)">
        {abbreviation}
      </text>
    );
  }
  return null;
};

const getSupplyCenter = (data) => {
  const { type, id, controlledBy, supply_center_x, supply_center_y } = data;
  if (supply_center_x && supply_center_y) {
    const coastal = type === 'coastal';
    return (
      <SupplyCenter
        x={supply_center_x}
        y={supply_center_y}
        coastal={coastal}
        territory={id}
        nation={controlledBy}
      />
    );
  }
  return null;
};

const Territory = (props) => {
  const { data, controlledBy, type, hovering, interacting } = props;
  const hover = !interacting && hovering;
  const color = getTerritoryColor(controlledBy, type);
  return (
    <StyledTerritory color={color} hover={hover}>
      {getPath(props)}
      {getText(data)}
      {getSupplyCenter(data)}
    </StyledTerritory>
  );
};

export default Territory;
