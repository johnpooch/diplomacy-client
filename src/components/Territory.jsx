import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import SupplyCenter from './SupplyCenter';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors, fontSizes } from '../variables';

const StyledTerritory = styled.g`
  polygon {
    stroke-width: 0.5;
    stroke: white;
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

const Territory = (props) => {
  const getTerritoryColor = (type, controlledBy) => {
    if (type === 'sea') return colors.sea;
    if (controlledBy !== null && controlledBy in colors.nations) {
      return colors.nations[controlledBy];
    }
    return colors.land;
  };

  const getPolygon = (data) => {
    const { _mouseOver, _mouseOut, id } = props;
    if ('polygon' in data) {
      return (
        <polygon
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
          points={data.polygon}
        />
      );
    }
    return null;
  };

  const getText = (data) => {
    if ('text' in data && 'abbreviation' in data) {
      const { x } = data.text;
      const { y } = data.text;
      return (
        <text x={x} y={y}>
          {data.abbreviation}
        </text>
      );
    }
    return null;
  };

  const getSupplyCenter = () => {
    const { supplyCenter, type, id, controlledBy } = props;
    if (supplyCenter) {
      const coastal = type === 'coastal';
      return (
        <SupplyCenter coastal={coastal} territory={id} nation={controlledBy} />
      );
    }
    return null;
  };

  const { id, type, controlledBy, interacting, hovering } = props;
  const data = Utils.getObjectByKey(id, mapData.territories);
  if (!data) return null;

  const hover = !interacting && hovering;
  const color = getTerritoryColor(type, controlledBy);
  return (
    <StyledTerritory color={color} hover={hover}>
      {getPolygon(data, props)}
      {getText(data)}
      {getSupplyCenter(props)}
    </StyledTerritory>
  );
};

export default Territory;
