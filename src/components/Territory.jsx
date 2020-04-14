import React from 'react';
import styled from '@emotion/styled';

import SupplyCenter from './SupplyCenter';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors } from '../variables';

const StyledGroup = styled.g`
  polygon {
    stroke-width: 1px;
    stroke: white;
    fill: ${(props) => props.color};
  }
`;

const getTerritoryColor = (type, controlledBy) => {
  if (type === 'sea') return colors.sea;
  if (controlledBy !== null && controlledBy in colors.nations) {
    return colors.nations[controlledBy];
  }
  return colors.land;
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
      <polygon points={data.polygon} />
      {getSupplyCenter(props)}
    </StyledGroup>
  );
};

export default Territory;
