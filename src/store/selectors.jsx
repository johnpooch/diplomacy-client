export const getGame = (state, slug) => {
  /*
  Gets a game from the store by the given slug.
  */
  const { games } = state.entities;
  return Object.values(games.entities).find((g) => g.slug === slug);
};

const getGameFromTurn = (state, turn) => {
  const { games } = state.entities;
  return Object.values(games.entities).find((g) => {
    if (g.turns) {
      return g.turns.includes(turn.id);
    }
    return false;
  });
};

export const getGameById = (state, id) => {
  /*
  Gets a game from the store by the given slug.
  */
  const { games } = state.entities;
  return games.entities[id];
};

export const getVariant = (state, id) => {
  /*
  Gets a variant from the store by the given id.
  */
  const { variants } = state.entities;
  return variants.entities[id];
};

export const getVariants = (state) => {
  // Gets all variants as an ordered list
  const { variants } = state.entities;
  return variants.ids.map((id) => variants.entities[id]);
};

export const getUserNation = (state, turn, user) => {
  /* 
  Given a game and a user, gets the nation user is playing as in that game. 
  Returns null if user is not playing or if the game has not started yet.

  Merges nation and nationState entities into a single object.
  */
  const { nations, nationStates } = state.entities;
  if (!turn) return null;
  const nationState = Object.values(nationStates.entities).find(
    (ns) => ns.user === user.id && turn.nation_states.includes(ns.id)
  );
  if (!nationState) return null;
  const nation = nations.entities[nationState.nation];
  return {
    ...nation,
    nationStateId: nationState.id,
  };
};

export const getParticipatingUsers = (state, game) => {
  /* 
  Given a game, get the users which are participating.
  */
  const { participants } = game;
  const { users } = state.entities;
  const participatingUsers = [];
  participants.forEach((p) => participatingUsers.push(users.byId[p]));
  return participatingUsers;
};

export const getMapData = (state, variantId) => {
  const { mapData, variants } = state.entities;
  const variant = variants.entities[variantId];
  return mapData.entities[variant.map_data[0]];
};

export const getPieces = (state, turn) => {
  /* 
  Gets the pieces for the given turn. Merges the piece and pieceState
  entities into a single object. Gets the coordinates from territoryData
  or namedCoastData and adds them to each object.
  */
  // TODO there is a decent bit of repetition between how namedCoastData
  // and territoryData logic: dry

  // TODO determine if the piece can be ordered by the user
  // TODO determine if the piece has orders
  const { namedCoastData, pieces, pieceStates, territoryData } = state.entities;

  const game = getGameFromTurn(state, turn);
  const gamePieces = Object.values(pieces.entities).filter((p) =>
    game.pieces.includes(p.id)
  );
  const mapData = getMapData(state, game.variant);
  const turnPieceStates = Object.values(pieceStates.entities).filter((p) =>
    turn.piece_states.includes(p.id)
  );
  const variantTerritoryData = Object.values(
    territoryData.entities
  ).filter((td) => mapData.territory_data.includes(td.id));
  const variantNamedCoastData = Object.values(
    namedCoastData.entities
  ).filter((ncd) => mapData.named_coast_data.includes(ncd.id));
  const mergedPieces = [];
  turnPieceStates.forEach((pieceState) => {
    const piece = gamePieces.find((p) => p.id === pieceState.piece);
    const coordinates = { x: null, y: null };
    if (pieceState.named_coast) {
      const namedCoast = variantNamedCoastData.find(
        (ncd) => ncd.named_coast === pieceState.named_coast
      );
      if (pieceState.must_retreat) {
        coordinates.x = namedCoast.dislodged_piece_x;
        coordinates.y = namedCoast.dislodged_piece_y;
      } else {
        coordinates.x = namedCoast.piece_x;
        coordinates.y = namedCoast.piece_y;
      }
    } else {
      const territory = variantTerritoryData.find(
        (td) => td.territory === pieceState.territory
      );
      if (pieceState.must_retreat) {
        coordinates.x = territory.dislodged_piece_x;
        coordinates.y = territory.dislodged_piece_y;
      } else {
        coordinates.x = territory.piece_x;
        coordinates.y = territory.piece_y;
      }
    }
    mergedPieces.push({
      ...piece,
      ...pieceState,
      ...coordinates,
    });
  });
  return mergedPieces;
};

export const getOrders = (state, turn) => {
  const { orders } = state.entities;
  return Object.values(orders.entities).filter((o) =>
    turn.orders.includes(o.id)
  );
};

export const getTerritories = (state, turn) => {
  /* 
  Gets the territories for the given turn. Merges the territory, territoryState,
  and territoryData entities into a single object. Also appends whether the use
  can order the given territory.
  */
  const { games, territories, territoryData, territoryStates } = state.entities;
  const game = getGameFromTurn(state, turn);
  const mapData = getMapData(state, game.variant);
  const variant = getVariant(state, game.variant);
  const variantTerritories = Object.values(territories.entities).filter((t) =>
    variant.territories.includes(t.id)
  );
  const turnTerritoryStates = Object.values(
    territoryStates.entities
  ).filter((t) => turn.territory_states.includes(t.id));
  const variantTerritoryData = Object.values(
    territoryData.entities
  ).filter((td) => mapData.territory_data.includes(td.id));
  const mergedTerritories = [];
  const pieces = getPieces(state, turn);
  variantTerritoryData.forEach((territoryDataItem) => {
    const territory = variantTerritories.find(
      (t) => t.id === territoryDataItem.territory
    );
    if (territory) {
      const piece =
        pieces.find((p) => {
          return p.territory === territory.id && !p.must_retreat;
        }) || null;
      const dislodgedPiece =
        pieces.find((p) => {
          return p.territory === territory.id && p.must_retreat;
        }) || null;
      const territoryState = turnTerritoryStates.find(
        (ts) => ts.territory === territory.id
      );
      mergedTerritories.push({
        piece,
        dislodgedPiece,
        ...territoryDataItem,
        ...territoryState,
        ...territory,
        mapDataId: territoryDataItem.id,
      });
    } else {
      mergedTerritories.push({
        ...territoryDataItem,
        mapDataId: territoryDataItem.id,
      });
    }
  });
  return mergedTerritories;
};
