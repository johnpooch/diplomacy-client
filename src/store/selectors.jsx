import { createSelector } from '@reduxjs/toolkit';

import territoryData from '../data/standard/territories.json';
import { nationSelectors } from './nations';
import { nationStateSelectors } from './nationStates';
import { orderSelectors } from './orders';
import { pieceSelectors } from './pieces';
import { pieceStateSelectors } from './pieceStates';
import { territorySelectors } from './territories';
import { territoryStateSelectors } from './territoryStates';
import { turnSelectors } from './turns';

export const makeSelectTerritoryById = () =>
  createSelector(territorySelectors.selectById, (territory) => {
    const territoryMapData = territoryData.find((td) => td.id === territory.id);
    const playable = Boolean(territory);
    return { playable, ...territoryMapData, ...territory };
  });

export const makeSelectTerritoryStateByMapDataId = () =>
  createSelector(
    (_, id) => territoryData.find((t) => t.id === id),
    (state) => state.entities.territories.entities,
    (state, _, turnId) => () =>
      territoryStateSelectors.selectByTurnId(state, turnId),
    (territoryMapData, territories, territoryStates) => {
      const territory = territories[territoryMapData.id];
      const territoryState = territory
        ? territoryStates().find((ts) => ts.territory === territory.id)
        : null;
      const playable = Boolean(territory);
      return { playable, ...territoryState, ...territoryMapData, ...territory };
    }
  );

export const makeSelectPieceById = () =>
  createSelector(
    pieceStateSelectors.selectById,
    pieceSelectors.selectEntities,
    (pieceState, pieces) => {
      const piece = pieces[pieceState.piece];
      return { ...pieceState, ...piece };
    }
  );

export const selectNationByUser = createSelector(
  nationStateSelectors.selectByUserId,
  nationSelectors.selectAll,
  (nationState, nations) => {
    if (!nationState) return null;
    const nation = nations.find((n) => n.id === nationState.nation);
    return { ...nation, ...nationState };
  }
);

export const selectNationsByTurn = createSelector(
  nationStateSelectors.selectByTurnId,
  nationSelectors.selectAll,
  (nationStates, nations) =>
    nationStates.map((ns) => {
      return { ...ns, ...nations.find((n) => n.id === ns.nation) };
    })
);

export const selectUserNationByTurn = createSelector(
  nationStateSelectors.selectByTurnId,
  nationSelectors.selectAll,
  (state) => state.auth.user.id,
  (nationStates, nations, userId) => {
    const nationState = nationStates.find((ns) => ns.user === userId);
    if (!nationState) return null;
    const nation = nations.find((n) => n.id === nationState.nation);
    return { ...nation, ...nationState };
  }
);

export const selectCurrentTurnByGame = createSelector(
  turnSelectors.selectByGame,
  (turns) => turns.find((t) => t.currentTurn)
);

export const selectOrdersByTurn = createSelector(
  orderSelectors.selectAll,
  (_, id) => id,
  (orders, id) => orders.filter((o) => o.turn === id)
);

export const selectPieceByTerritory = createSelector(
  pieceStateSelectors.selectAll,
  pieceSelectors.selectEntities,
  (_, id) => id,
  (_, x, turn) => turn,
  (pieceStates, pieces, id, turn) => {
    const pieceState = pieceStates.find(
      (ps) => ps.territory === id && !ps.mustRetreat && ps.turn === turn
    );
    return pieceState ? { ...pieceState, ...pieces[pieceState.piece] } : null;
  }
);

export const selectRetreatingPieceByTerritory = createSelector(
  pieceStateSelectors.selectAll,
  pieceSelectors.selectEntities,
  (_, id) => id,
  (_, x, turn) => turn,
  (pieceStates, pieces, id, turn) => {
    const pieceState = pieceStates.find(
      (ps) => ps.territory === id && ps.mustRetreat && ps.turn === turn
    );
    return pieceState ? { ...pieceState, ...pieces[pieceState.piece] } : null;
  }
);
