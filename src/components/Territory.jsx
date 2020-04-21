import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import SupplyCenter from './SupplyCenter';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors, fontSizes } from '../variables';

const StyledText = styled.text`
  fill: white;
  font-size: ${fontSizes.sans.xsmall}px;
  text-anchor: left;
  pointer-events: none;
  text-transform: uppercase;
  user-select: none;
`;

const StyledGroup = styled.g`
  polygon {
    stroke-width: 0.5;
    stroke: white;
    fill: ${(props) => props.color};

    &:hover,
    &:focus {
      fill: ${(props) => props.hoverColor};

      & + ${StyledText} {
        fill: ${colors.base};
        stroke-width: 100px;
        font-weight: bold;
      }
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

const getPolygon = (data, props) => {
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
      <StyledText x={x} y={y}>
        {data.abbreviation}
      </StyledText>
    );
  }
  return null;
};

const getSupplyCenter = (props) => {
  const { supplyCenter, type, id, controlledBy } = props;
  if (supplyCenter) {
    const coastal = type === 'coastal';
    return (
      <SupplyCenter coastal={coastal} territory={id} nation={controlledBy} />
    );
  }
  return null;
};

const Territory = (props) => {
  const { id, type, controlledBy } = props;
  const data = Utils.getObjectByKey(id, mapData.territories);
  if (!data) return null;
  const color = getTerritoryColor(type, controlledBy);
  const hoverColor = lighten(0.08, color);
  return (
    <StyledGroup color={color} hoverColor={hoverColor}>
      {getPolygon(data, props)}
      {getText(data)}
      {getSupplyCenter(props)}
    </StyledGroup>
  );
};

export default Territory;
