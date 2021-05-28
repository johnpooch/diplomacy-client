/* eslint-disable camelcase */
import { createSelector } from '@reduxjs/toolkit';

import namedCoastData from '../data/standard/namedCoasts.json';
import territoryData from '../data/standard/territories.json';

import { alertSelectors } from './alerts';
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
        const user = users.find((u) => u.id === p);
        const userNationState = ns ? ns.find((n) => n.user === p) : null;
        return {
          username: user ? user.username : null,
          nation:
            ns && nations
              ? {
                  id: userNationState ? userNationState.nation : null,
                  name:
                    userNationState && nations[userNationState.nation]
                      ? nations[userNationState.nation].name
                      : null,
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
      const { id, joinable, name, slug, status } = g;
      return {
        slug,
        id,
        joinable,
        name,
        participants,
        rules: {
          orderDeadline: g.orderDeadlineDisplay,
          retreatDeadline: g.retreatDeadlineDisplay,
          buildDeadline: g.buildDeadlineDisplay,
        },
        turn,
        status,
        userIsParticipant,
        variant: variant ? variant.name : null,
      };
    });
  }
);

const selectAlerts = alertSelectors.selectAll;
const selectErrors = (state, ...actionTypes) => {
  const mergedErrors = {};
  actionTypes.forEach((t) => {
    const error = state.errors[t];
    if (!error) return null;
    const { non_field_errors, ...otherErrors } = error;
    if (non_field_errors) {
      if (mergedErrors.non_field_errors) {
        mergedErrors.non_field_errors = [
          ...mergedErrors.non_field_errors,
          ...non_field_errors,
        ];
      } else {
        mergedErrors.non_field_errors = non_field_errors;
      }
      Object.assign(mergedErrors, otherErrors);
    }
    return {};
  });
  return Object.values(mergedErrors).flat();
};
const selectBrowseGamesLoading = (state) => state.entities.games.loading;
const selectGameDetail = createSelector(
  (state) => state.auth.user.id,
  (state) => state.entities.gameDetail,
  orderSelectors.selectAll,
  nationStateSelectors.selectAll,
  nationSelectors.selectEntities,
  turnSelectors.selectAll,
  territorySelectors.selectEntities,
  userSelectors.selectEntities,
  (
    userId,
    game,
    allOrders,
    allNationStates,
    nations,
    allTurns,
    territoryEntities,
    users
  ) => {
    const { activeTurnId, loading, loaded } = game;

    if (!loaded) return game;

    const turns = allTurns.filter((t) => game.turns.includes(t.id));
    const currentTurn = turns.find((t) => t.currentTurn) || null;
    const turn = turns.find((t) => {
      if (activeTurnId) return t.id === activeTurnId;
      return t.currentTurn === true;
    });
    const isCurrentTurn = currentTurn.id === turn.id;

    const turnDisplay = {
      season: turn.seasonDisplay,
      phase: turn.phaseDisplay,
      year: turn.year,
    };

    const turnNationStates = allNationStates.filter((ns) =>
      turn.nationStates.includes(ns.id)
    );
    const userNationState = turnNationStates.find((ns) => ns.user === userId);
    const nation = userNationState ? nations[userNationState.nation] : null;
    const { ordersFinalized, numOrders } = userNationState || {};

    const getTerritoryName = (id) => {
      const territory = territoryEntities[id];
      return territory ? territory.name : null;
    };
    const getNamedCoastAbbreviation = (id) => {
      const namedCoast = namedCoastData.find((nc) => nc.id === id);
      return namedCoast ? namedCoast.abbreviation : null;
    };

    const { previousTurn, nextTurn } = turn;

    const turnOrders = allOrders.filter((o) => o.turn === turn.id);
    const orders = turnOrders.map((o) => {
      return {
        ...o,
        source: getTerritoryName(o.source),
        target: getTerritoryName(o.target),
        aux: getTerritoryName(o.aux),
        targetCoast: getNamedCoastAbbreviation(o.targetCoast),
        orderType: o.type,
      };
    });

    const getNationOrderHistories = () =>
      game.participants.map((p) => {
        const user = users[p];
        const nationState = turnNationStates.find((ns) => ns.user === p);
        const n = nations[nationState.nation];
        const nationOrders = orders
          .filter((o) => o.nation === n.id)
          .map((o) => {
            return { order: o, outcome: null };
          });
        return {
          username: user.username,
          nation: { name: n.name, id: n.id },
          orders: nationOrders,
          numSupplyCenters: nationState.numSupplyCenters,
        };
      });

    const nationOrderHistories = isCurrentTurn ? [] : getNationOrderHistories();

    return {
      currentTurn: isCurrentTurn,
      currentTurnId: currentTurn.id,
      loaded,
      loading,
      userNationState,
      nationOrderHistories,
      nation,
      nextTurn,
      numOrders,
      orders,
      ordersFinalized,
      previousTurn,
      turnDisplay,
      turn,
    };
  }
);

const selectFirstTurnId = createSelector(
  (state) => state.entities.gameDetail,
  turnSelectors.selectAll,
  (game, turns) => {
    if (!game.turns) return null;
    if (!turns.length) return null;
    return turns
      .filter((t) => game.turns.includes(t.id))
      .reduce((min, t) => (t.id < min ? t.id : min), turns[0].id);
  }
);
export default {
  selectAlerts,
  selectBrowseGames,
  selectBrowseGamesLoading,
  selectErrors,
  selectFirstTurnId,
  selectGameDetail,
};
