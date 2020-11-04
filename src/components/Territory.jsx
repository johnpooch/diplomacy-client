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
  const { controlled_by, type } = territory;
  if (type === 'sea') return colors.sea;
  if (controlled_by) {
    if (controlled_by !== null && controlled_by in colors.nations) {
      return colors.nations[controlled_by];
    }
  }
  return colors.land;
};

const Territory = (props) => {
  const { territory, hovering, gameInterface, panning, callbacks } = props;
  const {
    abbreviation,
    dislodgedPiece,
    id,
    name,
    piece,
    supply_center_x: scx,
    supply_center_y: scy,
    text_x: tx,
    text_y: ty,
  } = territory;

  const color = getFillColor(territory);
  const territoryOrderState = gameInterface.getTerritoryOrderState(id);

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
      <TerritoryText name={name} abbreviation={abbreviation} x={tx} y={ty} />
      <SupplyCenter x={scx} y={scy} />
      {piece ? <Piece piece={piece} /> : null}
      {dislodgedPiece ? <Piece piece={dislodgedPiece} /> : null}
    </StyledTerritory>
  );
};

export default Territory;
