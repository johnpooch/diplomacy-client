import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../variables';

const StyledTerritory = styled.g`
  .territory {
    stroke-width: 2;
    fill: ${(props) => props.color};
  }
`;

const getFillColor = (props) => {
  const { controlledBy, type } = props;
  if (type === 'sea') return colors.sea;
  if (controlledBy) {
    const { id } = controlledBy;
    if (id !== null && id in colors.nations) {
      return colors.nations[id];
    }
  }
  return colors.land;
};

const renderPath = (data) => {
  const { path } = data;
  return <path className="territory" d={path} stroke={colors.base} />;
};

const PreviewTerritory = (props) => {
  const { data } = props;
  const color = getFillColor(props);
  return <StyledTerritory color={color}>{renderPath(data)}</StyledTerritory>;
};

export default PreviewTerritory;
