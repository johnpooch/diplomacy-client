/* eslint-disable no-param-reassign */
/* eslint camelcase: [2, { "allow": ["controlled_by_nation", "current_turn", "piece_nation"] }] */

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

import territoryData from '../data/standard/territories.json';

const mergePieces = (pieces, pieceStates) => {
  return pieceStates.map((ps) => {
    const piece = pieces.find((p) => p.id === ps.piece);
    return { ...ps, ...piece };
  });
};

const mergeTerritories = (tds, territories, territoryStates) => {
  return tds.map((td) => {
    let playable = false;
    const territory = territories.find((t) => t.uid === td.territory_uid);

    // If territory not found this is a non-playable territory
    if (!territory) return { ...td, playable, id: null };

    // Join territoryData, territoryState, and territory
    playable = true;
    const territoryState = territoryStates.find(
      (ts) => ts.territory === territory.id
    );
    return { ...td, ...territoryState, ...territory, playable };
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

  const mergedTerritories = mergeTerritories(
    territoryData,
    territories,
    territoryStates
  );

  const mergedPieces = mergePieces(pieces, pieceStates);

  // Add piece and dislodged piece to territories
  mergedTerritories.forEach((t) => {
    if (t.playable) {
      t.piece =
        mergedPieces.find((p) => p.territory === t.id && !p.must_retreat) ||
        null;
      if (t.piece) {
        t.piece = {
          ...t.piece,
          x: t.piece_x,
          y: t.piece_y,
        };
        t.piece_nation = nations.find((n) => t.piece.nation === n.id);
      }
      t.dislodgedPiece =
        mergedPieces.find((p) => p.territory === t.id && p.must_retreat) ||
        null;
      if (t.dislodgedPiece) {
        t.dislodgedPiece = {
          ...t.dislodgedPiece,
          x: t.dislodged_piece_x,
          y: t.dislodged_piece_y,
        };
      }
      if (t.controlled_by) {
        t.controlled_by_nation = nations.find((n) => t.controlled_by === n.id);
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
  const userNation = nations.find((n) => n.user === user.id) || null;
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
  if (!game) {
    return { participants: [] };
  }
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
    const { current_turn } = game;
    if (!current_turn) return { ...game };
    const nations = getDenormalizedNations(state, game, current_turn);
    const participants = game.participants.map((p) => {
      const participant = userSelectors.selectById(state, p);
      const nation = nations.find((n) => n.user === p) || null;
      const isCurrentUser = user.id === p;
      return { ...participant, nation, isCurrentUser };
    });
    const userNation = nations.find((n) => n.user === user.id) || null;
    return { ...game, nations, userNation, participants };
  });
  return denormalizedGames;
};
