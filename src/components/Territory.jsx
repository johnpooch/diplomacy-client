import React from 'react';
import styled from '@emotion/styled';

import SupplyCenter from './SupplyCenter';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors, fontSizes } from '../variables';

const StyledGroup = styled.g`
  polygon {
    stroke-width: 0.5;
    stroke: white;
    fill: ${(props) => props.color};
  }
`;

const StyledText = styled.text`
  fill: white;
  font-size: ${fontSizes.sans.xsmall}px;
  text-anchor: left;
  pointer-events: none;
  text-transform: uppercase;
`;

const getTerritoryColor = (type, controlledBy) => {
  if (type === 'sea') return colors.sea;
  if (controlledBy !== null && controlledBy in colors.nations) {
    return colors.nations[controlledBy];
  }
  return colors.land;
};

const getPolygon = (data, props) => {
  const { _mouseOver, _mouseMove, _mouseOut, id } = props;
  if ('polygon' in data) {
    return (
      <polygon
        onMouseOver={(e) => {
          _mouseOver(e, id);
        }}
        onFocus={(e) => {
          _mouseOver(e, id);
        }}
        onMouseMove={(e) => {
          _mouseMove(e);
        }}
        onMouseOut={(e) => {
          _mouseOut(e);
        }}
        onBlur={(e) => {
          _mouseOut(e);
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

  return (
    <StyledGroup color={getTerritoryColor(type, controlledBy)}>
      {getPolygon(data, props)}
      {/* {getText(data)} */}
      {getSupplyCenter(props)}
    </StyledGroup>
  );
};

export default Territory;
