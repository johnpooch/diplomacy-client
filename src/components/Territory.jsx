import React from 'react';
import styled from '@emotion/styled';

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
  let color = type !== 'sea' ? colors.land : colors.sea;
  if (controlledBy !== null && controlledBy in colors.nations) {
    color = colors.nations[controlledBy];
  }
  return color;
};

const Territory = (props) => {
  const { id, type, controlledBy } = props;
  const data = Utils.getObjectByKey(id, mapData.territories);
  if (!data) return null;

  return (
    <StyledGroup color={getTerritoryColor(type, controlledBy)}>
      <polygon points={data.polygon} />
    </StyledGroup>
  );
};

export default Territory;
