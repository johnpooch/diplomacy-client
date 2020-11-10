import React from 'react';
import styled from '@emotion/styled';
import { darken, lighten } from 'polished';

import { colors, fontSizes } from '../variables';
import SupplyCenter from './SupplyCenter';
import TerritoryPath from './TerritoryPath';
import TerritoryText from './TerritoryText';
import Piece from './Piece';

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
  const { territory, hovering, order, panning, callbacks } = props;
  const {
    abbreviation,
    dislodgedPiece,
    id,
    name,
    piece,
    supplyCenterX,
    supplyCenterY,
    textX,
    textY,
  } = territory;

  const color = getFillColor(territory);
  const territoryOrderState = order.getTerritoryOrderState(id);

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
      <TerritoryText
        name={name}
        abbreviation={abbreviation}
        x={textX}
        y={textY}
      />
      <SupplyCenter x={supplyCenterX} y={supplyCenterY} />
      {piece ? <Piece piece={piece} /> : null}
      {dislodgedPiece ? <Piece piece={dislodgedPiece} /> : null}
    </StyledTerritory>
  );
};

export default Territory;
