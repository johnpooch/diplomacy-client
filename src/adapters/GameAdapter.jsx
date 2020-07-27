import TerritoryAdapter from './TerritoryAdapter';
import { getObjectByKey } from '../utils';

function getTerritoryData(data, mapData, turnData) {
  const territoryData = data.variant.territories;
  const territoryMapData = mapData.territory_data;
  const territoryStateData = turnData.territory_states;
  const combinedData = [];

  territoryMapData.forEach((mapDataItem) => {
    const id = mapDataItem.territory;
    const relatedTerritory = getObjectByKey(id, territoryData, 'id');
    const relatedTerritoryState = getObjectByKey(
      id,
      territoryStateData,
      'territory'
    );
    const relatedPieceState = getObjectByKey(
      id,
      turnData.piece_states,
      'territory'
    );
    const relatedPiece = getObjectByKey(
      relatedPieceState.piece,
      data.pieces,
      'id'
    );
    const combinedPieceData = {
      type: relatedPiece.type,
      namedCoast: relatedPieceState.named_coast,
      dislodged: relatedPieceState.dislodged,
      dislodgedBy: relatedPieceState.dislodged_by,
      attackerTerritory: relatedPieceState.attacker_territory,
      mustRetreat: relatedPieceState.must_retreat,
    };
    combinedData.push({
      ...mapDataItem,
      ...relatedTerritoryState,
      ...relatedTerritory,
      piece: combinedPieceData,
    });
  });
  return combinedData;
}

export default class GameAdapter {
  constructor(turnId, user, data) {
    const turnData = getObjectByKey(turnId, data.turns, 'id');
    const mapData = data.variant.map_data[0];

    this.user = user;

    const territoryData = getTerritoryData(data, mapData, turnData);
    this.initializeTerritories(territoryData);
  }

  initializeTerritories(data) {
    this.territories = [];
    data.forEach((item) => {
      this.territories.push(new TerritoryAdapter(item));
    });
  }

  // Game
  //  turns
  //  current_turn
  //  user_nation
}

// export function getCurrentTurn(game) {
//   const { turns } = game;
//   const currentTurnIndex = turns.findIndex((obj) => obj.current_turn === true);
//   return turns[currentTurnIndex];
// }
//

// Piece
//  type
//  nation
//  x
//  y

// Territory
//  path
//  name
//  abbreviation
//  type
//
//  piece
//  dislodged_piece
//  dislodged_piece_x
//  dislodged_piece_y
//  text_x
//  text_y
//  supply_center_x
//  supply_center_y
//  named_coasts

// Nation
//  name
//  num_builds
//  num_disbands
//  supply_delta
//  surrendered
//  user
//  build_territories
