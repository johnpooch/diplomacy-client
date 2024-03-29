import { drawResponseActions } from '../drawResponses';
import { drawActions } from '../draws';
import { gameDetailActions } from '../gameDetail';
import { gameActions } from '../games';
import { nationStateActions } from '../nationStates';
import gameDetailNormalizer from '../normalizers/gameDetailNormalizer';
import gameListNormalizer from '../normalizers/gameListNormalizer';
import { orderActions } from '../orders';
import { pieceActions } from '../pieces';
import { pieceStateActions } from '../pieceStates';
import { surrenderActions } from '../surrenders';
import { territoryStateActions } from '../territoryStates';
import { turnActions } from '../turns';
import { userActions } from '../users';

const normalizeGames = ({ dispatch }) => (next) => (action) => {
  /*
  When games list is received, normalize data and dispatch actions for each entity.
  */

  if (action.type === gameActions.listGames.fulfilled.type) {
    const { entities } = gameListNormalizer(action.payload);
    const { games, nationStates, surrenders, turns, users } = entities;

    // Note, if no games were returned, entities is an empty objects, in which
    // case we pass an empty list to each reducer.
    dispatch(nationStateActions.nationStatesReceived(nationStates || []));
    dispatch(surrenderActions.surrendersReceived(surrenders || []));
    dispatch(turnActions.turnsReceived(turns || []));
    dispatch(userActions.usersReceived(users || []));
    dispatch(gameActions.normalizedGamesReceived(games || []));
    next(action);
  } else {
    next(action);
  }
};

const normalizeGameDetail = ({ dispatch }) => (next) => (action) => {
  /*
  When a game detail is received, normalize data into entities and dispatch
  actions for each entity.
  */
  if (action.type === gameActions.getGameDetail.fulfilled.type) {
    const { entities } = gameDetailNormalizer(action.payload);
    const {
      draws,
      drawResponses,
      game,
      nationStates,
      orders,
      pieces,
      pieceStates,
      surrenders,
      territoryStates,
      turns,
      users,
    } = entities;
    dispatch(drawActions.drawsReceived(draws || []));
    dispatch(drawResponseActions.drawResponsesReceived(drawResponses || []));
    dispatch(nationStateActions.nationStatesReceived(nationStates || []));
    dispatch(nationStateActions.nationStatesReceived(nationStates));
    dispatch(orderActions.ordersReceived(orders || []));
    dispatch(pieceActions.piecesReceived(pieces || []));
    dispatch(pieceStateActions.pieceStatesReceived(pieceStates || []));
    dispatch(surrenderActions.surrendersReceived(surrenders || []));
    dispatch(
      territoryStateActions.territoryStatesReceived(territoryStates || [])
    );
    dispatch(territoryStateActions.territoryStatesReceived(territoryStates));
    dispatch(turnActions.turnDetailsReceived(turns));
    dispatch(userActions.usersReceived(users || []));
    next(gameDetailActions.setGameDetail(Object.values(game)[0]));
  } else {
    next(action);
  }
};

export default [normalizeGames, normalizeGameDetail];
