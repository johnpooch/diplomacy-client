import { createSelector } from '@reduxjs/toolkit';

import territoryData from '../data/standard/territories.json';

import alerts, { alertSelectors } from './alerts';
import { gameSelectors } from './games';
import { nationSelectors } from './nations';
import { nationStateSelectors } from './nationStates';
import { orderSelectors } from './orders';
import { pieceSelectors } from './pieces';
import { pieceStateSelectors } from './pieceStates';
import { territorySelectors } from './territories';
import { territoryStateSelectors } from './territoryStates';
import { turnSelectors } from './turns';
import { userSelectors } from './users';
import { variantSelectors } from './variants';

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

export const selectFirstTurnByGame = createSelector(
  turnSelectors.selectByGame,
  (turns) => turns.reduce((min, t) => (t.id < min ? t.id : min), turns[0].id)
);

export const selectOrdersByTurn = (state, turnId) =>
  orderSelectors.selectAll(state).filter((o) => o.turn === turnId);

export const selectPieceByTerritory = (state, territoryId, turnId) => {
  const pieceStates = pieceStateSelectors.selectAll(state);
  const pieces = pieceSelectors.selectEntities(state);
  const pieceState = pieceStates.find(
    (ps) =>
      ps.territory === territoryId && !ps.mustRetreat && ps.turn === turnId
  );
  return pieceState ? { ...pieceState, ...pieces[pieceState.piece] } : null;
};

export const selectPieceStatesWithPiece = createSelector(
  pieceStateSelectors.selectAll,
  pieceSelectors.selectEntities,
  (pieceStates, pieces) => {
    return pieceStates.map((ps) => {
      return { ...ps, ...pieces[ps.piece] };
    });
  }
);

export const selectPiecesByTurn = (state, turnId) => {
  return selectPieceStatesWithPiece(state).filter((ps) => ps.turn === turnId);
};

export const selectTerritoriesByTurn = createSelector(
  (state) => state.entities.territories.entities,
  territoryStateSelectors.selectByTurnId,
  (territories, territoryStates) => {
    return territoryStates.map((ts) => {
      const territory = territories[ts.territory];
      return { ...ts, ...territory };
    });
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

// TODO test
// TODO types
const selectBrowseGames = createSelector(
  (state) => state.auth.user.id,
  gameSelectors.selectAll,
  nationStateSelectors.selectAll,
  nationSelectors.selectEntities,
  turnSelectors.selectEntities,
  userSelectors.selectAll,
  variantSelectors.selectEntities,
  (userId, games, nationStates, nations, turns, users, variants) => {
    return games.map((g) => {
      const variant = variants[g.variant];
      const currentTurn = turns[g.currentTurn];
      let ns = null;
      if (currentTurn) {
        ns = nationStates.filter((n) =>
          currentTurn.nationStates.includes(n.id)
        );
      }
      let userIsParticipant = false;
      const participants = g.participants.map((p) => {
        if (p === userId) userIsParticipant = true;
        return {
          username: users.find((u) => u.id === p).username,
          nation: ns
            ? {
                id: ns.find((n) => n.user === p).nation,
                name: nations[ns.find((n) => n.user === p).nation].name,
              }
            : null,
          isCurrentUser: userId === p,
        };
      });
      const turn = currentTurn
        ? {
            phase: currentTurn.phaseDisplay,
            season: currentTurn.seasonDisplay,
            year: currentTurn.year,
          }
        : null;
      return {
        slug: g.slug,
        joinable: true, // TODO
        name: g.name,
        participants,
        rules: {
          orderDeadline: g.orderDeadlineDisplay,
          retreatDeadline: g.retreatDeadlineDisplay,
          buildDeadline: g.buildDeadlineDisplay,
        },
        turn,
        status: g.status,
        userIsParticipant,
        variant: variant.name,
      };
    });
  }
);

const selectAlerts = alertSelectors.selectAll;
const selectBrowseGamesLoading = (state) => state.entities.games.loading;
export default {
  selectAlerts,
  selectBrowseGames,
  selectBrowseGamesLoading,
};
