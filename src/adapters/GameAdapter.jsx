import { getObjectByKey } from '../utils';

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
    this.turn = turnData;
    this.nextTurn = turnData.nextTurn;
    this.previousTurn = turnData.previousTurn;
    this.currentTurn = turnData.current_turn;
    this.mapData = mapData;

    const nationData = getNationData(data, turnData);
    this.nations = nationData;

    const territoryData = this.getTerritoryData(data, mapData, turnData);
    this.territories = territoryData;

    const orderData = this.getOrderData(turnData);
    this.orders = orderData;
  }

  getPieces() {
    const pieces = [];
    this.territories.forEach((territory) => {
      const { piece } = territory;
      if (piece) {
        pieces.push(piece);
      }
    });
    return pieces;
  }

  getOrderData(turn) {
    const orderData = [];
    const { orders } = turn;
    orders.forEach((order) => {
      const {
        id,
        type,
        nation,
        source,
        target,
        target_coast: targetCoast,
        aux,
        piece_type: pieceType,
        via_convoy: viaConvoy,
      } = order;
      orderData.push({
        id,
        type,
        nation,
        source: this.getTerritory(source),
        target: this.getTerritory(target),
        targetCoast: this.getTerritory(targetCoast),
        aux: this.getTerritory(aux),
        pieceType,
        viaConvoy,
      });
    });
    return orderData;
  }

  getPieceData(territoryId, mapDataItem, pieceStates, pieces) {
    let combinedPieceData = {};
    const pieceState = pieceStates.find((ps) => {
      return ps.territory === territoryId && !ps.must_retreat;
    });
    if (pieceState) {
      const piece = getObjectByKey(pieceState.piece, pieces, 'id');
      combinedPieceData = {
        id: piece.id,
        type: piece.type,
        namedCoast: pieceState.named_coast,
        dislodged: pieceState.dislodged,
        dislodgedBy: pieceState.dislodged_by,
        attackerTerritory: pieceState.attacker_territory,
        mustRetreat: pieceState.must_retreat,
        x: mapDataItem.piece_x,
        y: mapDataItem.piece_y,
        hasOrders: this.getOrder(territoryId),
        userCanOrder: this.userCanOrder(territoryId),
        nation: piece.nation,
      };
      return combinedPieceData;
    }
    return null;
  }

  getTerritoryData(data, mapData, turnData) {
    const territoryData = data.variant.territories;
    const territoryMapData = mapData.territory_data;
    const territoryStateData = turnData.territory_states;
    const combinedTerritoryData = [];

    territoryMapData.forEach((mapDataItem) => {
      const id = mapDataItem.territory;
      const territory = getObjectByKey(id, territoryData, 'id');
      const territoryState = getObjectByKey(id, territoryStateData, 'territory');

      const pieceData = this.getPieceData(
        id,
        mapDataItem,
        turnData.piece_states,
        data.pieces
      );

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
        mapId: mapDataItem.pk,
        mapType: mapDataItem.type,
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
        x: mapDataItem.piece_x,
        y: mapDataItem.piece_y,
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
          piece: pieceData,
          dislodgedPiece: combinedDislodgedPieceData,
        };
      }
      combinedTerritoryData.push(combined);
    });
    return combinedTerritoryData;
  }

  getTerritory(id) {
    return getObjectByKey(id, this.territories, 'id');
  }

  getOrder(id) {
    const { orders } = this.turn;
    return getObjectByKey(id, orders, 'source');
  }

  userCanOrder(territory) {
    /* Determine whether a user can create an order for the given territory */
    const { piece } = territory;

    if (!this.user) {
      return false;
    }
    const userNation = this.getUserNation(this.user.id);
    if (!userNation) {
      // User is not controlling a nation in the game.
      return false;
    }
    if (!this.currentTurn) {
      // Cannot order if not looking at current turn
      return false;
    }

    // Orders turn
    if (this.turn.phase === 'Order') {
      if (!piece) {
        return false;
      }
      const pieceBelongsToUser = piece.nation === userNation.id;
      return pieceBelongsToUser;
    }

    // Retreat turn
    if (this.turn.phase === 'Retreat and Disband') {
      return Boolean(territory.dislodgedPiece);
    }

    // // Build turn
    // const {
    //   num_orders_remaining: ordersRemaining,
    //   supply_delta: supplyDelta,
    //   build_territories: buildTerritories,
    // } = privateNationState;
    // if (piece) {
    //   return false;
    // }
    // if (supplyDelta > 0) {
    //   // player can build
    //   if (!ordersRemaining) {
    //     return Boolean(gameAdapter.getOrder(territoryId));
    //   }
    //   return buildTerritories.includes(territoryId);
    // }
    // // player must disband
    // if (!piece) {
    //   return false;
    // }
    return false;
  }

  getNation(id) {
    return this.nations.find((nation) => {
      return nation.id === id;
    });
  }

  getUserNation(id) {
    return this.nations.find((nation) => {
      return nation.user.id === id;
    });
  }
}
