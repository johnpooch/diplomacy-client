import React from 'react';
import styled from '@emotion/styled';

import SupplyCenter from './SupplyCenter';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors } from '../variables';

const StyledGroup = styled.g`
  polygon {
    stroke-width: 0.5;
    stroke: white;
    fill: ${(props) => props.color};
  }
`;

const StyledText = styled.text`
  fill: white;
  font-size: 5px;
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

const getPolygon = (data) => {
  if ('polygon' in data) {
    return <polygon points={data.polygon} />;
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
      {getPolygon(data)}
      {getText(data)}
      {getSupplyCenter(props)}
    </StyledGroup>
  );
};

export default Territory;
