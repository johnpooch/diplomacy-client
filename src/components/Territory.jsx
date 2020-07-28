import React from 'react';
import styled from '@emotion/styled';
import { darken, lighten } from 'polished';

import { colors, fontSizes } from '../variables';
import SupplyCenter from './SupplyCenter';
import TerritoryPath from './TerritoryPath';
import TerritoryText from './TerritoryText';

const StyledTerritory = styled.g`
  cursor: ${(props) => (props.panning ? 'all-scroll' : 'pointer')};

  .territory {
    stroke-width: ${(props) =>
      props.territoryOrderState === 'source' ? 3.5 : 2};
    fill: ${(props) =>
      props.highlight ? lighten(0.07, props.color) : props.color};
  }

  .text {
    font-size: ${fontSizes.sans[0]}px;
    text-anchor: middle;
    pointer-events: none;
    text-transform: uppercase;
    user-select: none;
    fill: ${(props) => (props.highlight ? colors.base : 'white')};
    font-weight: ${(props) => (props.highlight ? 'bold' : 'normal')};
  }

  .supply-center path {
    pointer-events: none;
    fill: ${(props) => darken(0.3, props.color)};
  }
`;

const getFillColor = (territory) => {
  const { controlledBy, type } = territory;
  if (type === 'sea') return colors.sea;
  if (controlledBy) {
    if (controlledBy !== null && controlledBy in colors.nations) {
      return colors.nations[controlledBy];
    }
  }
  return colors.land;
};

const Territory = (props) => {
  const {
    territory,
    hovering,
    territoryOrderState,
    panning,
    callbacks,
  } = props;
  const { abbreviation, supplyCenter, text } = territory;
  const { x: scx, y: scy } = supplyCenter;

  const color = getFillColor(territory);

  return (
    <StyledTerritory
      color={color}
      highlight={!panning && hovering}
      panning={panning}
      territoryOrderState={territoryOrderState}
    >
      <TerritoryPath
        territory={territory}
        territoryOrderState={territoryOrderState}
        callbacks={callbacks}
      />
      <TerritoryText text={text} abbreviation={abbreviation} />
      <SupplyCenter x={scx} y={scy} />
    </StyledTerritory>
  );
};

export default Territory;
