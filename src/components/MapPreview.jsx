import React from 'react';
import styled from '@emotion/styled';

import PreviewPiece from './PreviewPiece';
import PreviewTerritory from './PreviewTerritory';
import { getObjectByKey } from '../utils';

const mapSizes = {
  small: 300,
};

const StyledDiv = styled.div`
  width: ${(props) => mapSizes[props.size]}px;
  svg {
    border-radius: 6px;
  }
`;

const MapPreview = (props) => {
  const { game, size, turn } = props;
  if (!turn) return null;

  const getNation = (id) => {
    const { nations } = game.variant;
    return getObjectByKey(id, nations, 'id');
  };

  const getPiece = (id) => {
    const { pieces } = game;
    return getObjectByKey(id, pieces, 'id');
  };

  const getTerritory = (id) => {
    const { territories } = game.variant;
    return getObjectByKey(id, territories, 'id');
  };

  const getTerritoryState = (id) => {
    const territoryStates = turn.territory_states;
    return getObjectByKey(id, territoryStates, 'territory');
  };

  const getTerritoryControlledBy = (id) => {
    const territoryState = getTerritoryState(id);
    return territoryState ? getNation(territoryState.controlled_by) : null;
  };

  const renderTerritories = (territoryData) => {
    const territoriesList = [];
    territoryData.forEach((data) => {
      const id = data.territory;
      const territory = getTerritory(id);
      const controlledBy = getTerritoryControlledBy(id);
      if (data && territory) {
        territoriesList.push(
          <PreviewTerritory
            key={data.id}
            id={id}
            data={data}
            type={territory.type}
            supplyCenter={territory.supply_center}
            controlledBy={controlledBy}
          />
        );
      }
    });
    return <g transform="translate(-195, -170)">{territoriesList}</g>;
  };

  const renderPieces = (territoryData) => {
    const { piece_states: pieceStates } = turn;
    const elements = [];
    pieceStates.forEach((state) => {
      const piece = getPiece(state.piece);
      const data = getObjectByKey(state.territory, territoryData, 'territory');
      const { piece_x: x, piece_y: y } = data;
      elements.push(
        <PreviewPiece
          key={piece.id}
          type={piece.type}
          nation={piece.nation}
          territory={state.territory}
          x={x}
          y={y}
        />
      );
    });
    return <g>{elements}</g>;
  };

  const mapData = game.variant.map_data[0];
  const { territory_data: territoryData } = mapData;
  return (
    <StyledDiv className="map-preview" size={size}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1835 1360">
        {renderTerritories(territoryData)}
        {renderPieces(territoryData)}
      </svg>
    </StyledDiv>
  );
};

export default MapPreview;
