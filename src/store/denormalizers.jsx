/* eslint-disable no-param-reassign */

import { gameSelectors } from './games';
import { namedCoastSelectors } from './namedCoasts';
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

import territoryData from '../data/standard/territories.json';

const mergePieces = (pieces, pieceStates) => {
  return pieceStates.map((ps) => {
    const piece = pieces.find((p) => p.id === ps.piece);
    return { ...ps, ...piece };
  });
};

const mergeTerritories = (
  tds,
  territories,
  territoryStates,
  allNamedCoasts
) => {
  return tds.map((td) => {
    let playable = false;
    const territory = territories.find((t) => t.uid === td.territoryUID);

    // If territory not found this is a non-playable territory
    if (!territory) return { ...td, playable, id: null };

    // Join territoryData, territoryState, and territory
    playable = true;
    const territoryState = territoryStates.find(
      (ts) => ts.territory === territory.id
    );
    const namedCoasts = allNamedCoasts.filter(
      (nc) => nc.parent === territory.id
    );
    return { ...td, ...territoryState, ...territory, namedCoasts, playable };
  });
};

const getDenormalizedTerritories = (state, game, turn) => {
  const { variant } = game;
  const nations = nationSelectors.selectByVariantId(state, variant);
  const pieces = pieceSelectors.selectByGameId(state, game.id);
  const pieceStates = pieceStateSelectors.selectByTurnId(state, turn.id);
  const territories = territorySelectors.selectByVariantId(state, variant);
  const territoryStates = territoryStateSelectors.selectByTurnId(
    state,
    turn.id
  );
  const namedCoasts = namedCoastSelectors.selectByVariantId(state, variant);

  const mergedTerritories = mergeTerritories(
    territoryData,
    territories,
    territoryStates,
    namedCoasts
  );

  const mergedPieces = mergePieces(pieces, pieceStates);

  // Add piece and dislodged piece to territories
  mergedTerritories.forEach((t) => {
    if (t.playable) {
      t.piece =
        mergedPieces.find((p) => p.territory === t.id && !p.mustRetreat) ||
        null;
      if (t.piece) {
        t.piece = {
          ...t.piece,
          x: t.pieceX,
          y: t.pieceY,
        };
        t.pieceNation = nations.find((n) => t.piece.nation === n.id);
      }
      t.dislodgedPiece =
        mergedPieces.find((p) => p.territory === t.id && p.mustRetreat) || null;
      if (t.dislodgedPiece) {
        t.dislodgedPiece = {
          ...t.dislodgedPiece,
          x: t.dislodgedPieceX,
          y: t.dislodgedPieceY,
        };
      }
      if (t.controlledBy) {
        t.controlledByNation = nations.find((n) => t.controlledBy === n.id);
      }
    }
  });
  return mergedTerritories;
};

const getDenormalizedNations = (state, game, turnId) => {
  const { variant } = game;
  const nations = nationSelectors.selectByVariantId(state, variant);
  const nationStates = nationStateSelectors.selectByTurnId(state, turnId);
  const mergedNations = nationStates.map((ns) => {
    const nation = nations.find((n) => ns.nation === n.id);
    return { ...ns, ...nation, nationStateId: ns.id };
  });
  return mergedNations;
};

const getDenormalizedOrders = (state, turn, territories) => {
  return orderSelectors.selectByTurnId(state, turn.id).map((o) => {
    const aux = territories.find((t) => t.id && t.id === o.aux);
    const source = territories.find((t) => t.id && t.id === o.source);
    const target = territories.find((t) => t.id && t.id === o.target);
    return { ...o, aux, source, target };
  });
};

const getDenormalizedTurn = (state, game, turn, user) => {
  const territories = getDenormalizedTerritories(state, game, turn);
  const nations = getDenormalizedNations(state, game, turn.id);
  const orders = getDenormalizedOrders(state, turn, territories);
  let userNation = null;
  if (user) {
    userNation = nations.find((n) => n.user === user.id) || null;
  }
  const newTurn = { ...turn, territories, nations, orders, userNation };
  return newTurn;
};

export const getDenormalizedGameDetail = (state, id, user) => {
  const denormalizedGame = {
    turns: [],
  };
  const game = gameSelectors.selectById(state, id);
  const variant = variantSelectors.selectById(state, game.variant);
  denormalizedGame.variant = variant;

  game.turns.forEach((turnId) => {
    const turn = turnSelectors.selectById(state, turnId, user);
    denormalizedGame.turns.push(getDenormalizedTurn(state, game, turn, user));
  });

  return denormalizedGame;
};

export const getDenormalizedPreGame = (state, slug) => {
  const { user } = state.auth;
  const game = gameSelectors.selectBySlug(state, slug);
  if (!game) return null;
  const participants = game.participants.map((p) =>
    userSelectors.selectById(state, p)
  );
  const userJoined = Boolean(participants.find((p) => p.id === user.id));
  return { ...game, participants, userJoined };
};

export const getDenormalizedGamesList = (state) => {
  // game, userNation, nations, participants
  const { user } = state.auth;
  const allGames = gameSelectors.selectAll(state);
  const denormalizedGames = allGames.map((game) => {
    const { currentTurn } = game;
    if (!currentTurn) return { ...game };
    const turn = turnSelectors.selectById(state, currentTurn, user);
    const nations = getDenormalizedNations(state, game, currentTurn);
    const participants = game.participants.map((p) => {
      const participant = userSelectors.selectById(state, p);
      const nation = nations.find((n) => n.user === p) || null;
      const isCurrentUser = user.id === p;
      return { ...participant, nation, isCurrentUser };
    });
    const userNation = nations.find((n) => n.user === user.id) || null;
    return { ...game, currentTurn: turn, nations, userNation, participants };
  });
  return denormalizedGames;
};
