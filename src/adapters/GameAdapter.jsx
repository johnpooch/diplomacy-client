import { getObjectByKey } from '../utils';

function getTerritoryData(data, mapData, turnData) {
  const territoryData = data.variant.territories;
  const territoryMapData = mapData.territory_data;
  const territoryStateData = turnData.territory_states;
  const combinedTerritoryData = [];

  territoryMapData.forEach((mapDataItem) => {
    const id = mapDataItem.territory;
    const territory = getObjectByKey(id, territoryData, 'id');
    const territoryState = getObjectByKey(id, territoryStateData, 'territory');

    let combinedPieceData = {};
    const pieceState = turnData.piece_states.find((ps) => {
      return ps.territory === id && !ps.must_retreat;
    });
    if (pieceState) {
      const piece = getObjectByKey(pieceState.piece, data.pieces, 'id');
      combinedPieceData = {
        type: piece.type,
        namedCoast: pieceState.named_coast,
        dislodged: pieceState.dislodged,
        dislodgedBy: pieceState.dislodged_by,
        attackerTerritory: pieceState.attacker_territory,
        mustRetreat: pieceState.must_retreat,
        x: mapDataItem.piece_x,
        y: mapDataItem.piece_y,
      };
    }

    let combinedDislodgedPieceData = {};
    const dislodgedPieceState = turnData.piece_states.find((ps) => {
      return ps.territory === id && ps.must_retreat;
    });
    if (dislodgedPieceState) {
      const dislodgedPiece = getObjectByKey(
        dislodgedPieceState.piece,
        data.pieces,
        'id'
      );
      combinedDislodgedPieceData = {
        type: dislodgedPiece.type,
        namedCoast: dislodgedPieceState.named_coast,
        dislodged: dislodgedPieceState.dislodged,
        dislodgedBy: dislodgedPieceState.dislodged_by,
        attackerTerritory: dislodgedPieceState.attacker_territory,
        mustRetreat: dislodgedPieceState.must_retreat,
        x: mapDataItem.dislodged_piece_x,
        y: mapDataItem.dislodged_piece_y,
      };
    }

    let combined = {
      abbreviation: mapDataItem.abbreviation,
      name: mapDataItem.name,
      path: mapDataItem.path,
      supplyCenter: {
        x: mapDataItem.supply_center_x,
        y: mapDataItem.supply_center_y,
      },
      text: {
        x: mapDataItem.text_x,
        y: mapDataItem.text_y,
      },
      mapType: mapDataItem.type,
    };
    if (territory) {
      const namedCoastData = [];
      territory.named_coasts.forEach((namedCoast) => {
        namedCoastData.push({
          name: namedCoast.name,
        });
      });
      combined = {
        ...combined,
        id: territory.id,
        namedCoasts: namedCoastData,
        type: territory.type,
        controlledBy: territoryState.controlled_by,
        piece: combinedPieceData,
        dislodgedPiece: combinedDislodgedPieceData,
      };
    }
    combinedTerritoryData.push(combined);
  });
  return combinedTerritoryData;
}

function getNationData(data, turnData) {
  const nationData = data.variant.nations;
  const nationStateData = turnData.nation_states;
  const combinedNationData = [];

  nationData.forEach((nation) => {
    const { id } = nation;
    // TODO unnest nation
    const nationState = nationStateData.find((ns) => {
      return ns.nation.id === id;
    });

    combinedNationData.push({
      id,
      name: nation.name,
      user: nationState.user,
      surrendered: nationState.surrendered,
      supplyDelta: nationState.supply_delta,
      numBuilds: nationState.num_builds,
      numDisbands: nationState.num_disbands,
    });
  });
  return combinedNationData;
}

export default class GameAdapter {
  constructor(turnId, user, data) {
    const turnData = getObjectByKey(turnId, data.turns, 'id');
    const mapData = data.variant.map_data[0];

    this.user = user;
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description;
    this.nextTurn = turnData.nextTurn;
    this.previousTurn = turnData.previousTurn;
    this.currentTurn = turnData.currentTurn;

    const territoryData = getTerritoryData(data, mapData, turnData);
    this.territories = territoryData;

    const nationData = getNationData(data, turnData);
    this.nations = nationData;
  }
}
