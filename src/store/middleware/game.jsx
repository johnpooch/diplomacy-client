import {
  gamesConstants,
  gamesRequested,
  normalizedGamesReceived,
} from '../games';
import { alertsAdd, alertsClearAll } from '../alerts';
import { ALLGAMESURL, JOINGAMEURL, GAMESTATEURL } from '../../api';
import { apiRequest } from '../api';

import gameListNormalizer from '../normalizers/gameListNormalizer';
import gameDetailNormalizer from '../normalizers/gameDetailNormalizer';
import { nationStatesReceived } from '../nationStates';
import { ordersReceived } from '../orders';
import { pieceStatesReceived } from '../pieceStates';
import { piecesReceived } from '../pieces';
import { territoryStatesReceived } from '../territoryStates';
import { turnsReceived } from '../turns';
import { usersReceived } from '../users';

const loadGamesFlow = ({ dispatch }) => (next) => (action) => {
  /*
  Dispatch API request when games list is requested.
  */
  next(action);

  if (action.type === gamesConstants.GAMES_REQUESTED) {
    const { token, filters } = action.payload;
    let url = ALLGAMESURL;
    if (filters) {
      const queryParams = new URLSearchParams(filters).toString();
      url = url.concat(`?${queryParams}`);
    }

    const apiAction = apiRequest(
      'GET',
      url,
      token,
      action.payload,
      gamesConstants.GAMES_RECEIVED,
      gamesConstants.GAMES_REQUEST_FAILED
    );
    dispatch(apiAction);
  }
};

const loadGameDetailFlow = ({ dispatch }) => (next) => (action) => {
  /*
  Dispatch API request when a game detail is requested.
  */
  next(action);

  if (action.type === gamesConstants.GAME_DETAIL_REQUEST) {
    const { token, slug } = action.payload;
    const url = GAMESTATEURL.replace('<game>', slug);
    const apiAction = apiRequest(
      'GET',
      url,
      token,
      action.payload,
      gamesConstants.GAME_DETAIL_SUCCESS,
      gamesConstants.GAME_DETAIL_FAILURE
    );
    dispatch(apiAction);
  }
};

const normalizeGames = ({ dispatch }) => (next) => (action) => {
  /*
  When games list is received, normalize data and dispatch actions for each entity.
  */
  next(action);

  if (action.type === gamesConstants.GAMES_RECEIVED) {
    const { entities, result: order } = gameListNormalizer(action.payload);
    const { games, nationStates, turns, users } = entities;
    dispatch(nationStatesReceived(nationStates));
    dispatch(turnsReceived(turns));
    dispatch(usersReceived(users));
    next(normalizedGamesReceived(games, order));
  }
};

const normalizeGameDetail = ({ dispatch }) => (next) => (action) => {
  /*
  When a game detail is received, normalize data into entities and dispatch
  actions for each entity.
  */
  if (action.type === gamesConstants.GAME_DETAIL_SUCCESS) {
    const { entities } = gameDetailNormalizer(action.payload);
    const {
      game,
      nationStates,
      orders,
      pieces,
      pieceStates,
      territoryStates,
      turns,
    } = entities;
    dispatch(piecesReceived(pieces));
    dispatch(turnsReceived(turns));
    dispatch(nationStatesReceived(nationStates));
    dispatch(territoryStatesReceived(territoryStates));
    dispatch(pieceStatesReceived(pieceStates));
    dispatch(ordersReceived(orders));
    next({ type: gamesConstants.GAME_DETAIL_SUCCESS, payload: game });
  } else {
    next(action);
  }
};

const joinLeaveGameFlow = ({ dispatch }) => (next) => (action) => {
  /*
  When a player attempts to join or leave a game, dispatch an API request.
  */
  next(action);

  if (
    [
      gamesConstants.LEAVE_GAME_REQUESTED,
      gamesConstants.JOIN_GAME_REQUESTED,
    ].includes(action.type)
  ) {
    const { token, slug } = action.payload;
    const url = JOINGAMEURL.replace('<game>', slug);

    const successFailActions =
      action.type === gamesConstants.JOIN_GAME_REQUESTED
        ? [
            gamesConstants.JOIN_GAME_SUCCESS,
            gamesConstants.JOIN_GAME_REQUEST_FAILED,
          ]
        : [
            gamesConstants.LEAVE_GAME_SUCCESS,
            gamesConstants.LEAVE_GAME_REQUEST_FAILED,
          ];

    const apiAction = apiRequest(
      'PATCH',
      url,
      token,
      action.payload,
      ...successFailActions
    );
    dispatch(apiAction);
  }
};

const postJoinLeaveFlow = ({ dispatch, getState }) => (next) => (action) => {
  /*
  Once the user has successfully joined or left a game, reload the games.
  */
  next(action);

  if (
    [
      gamesConstants.LEAVE_GAME_SUCCESS,
      gamesConstants.JOIN_GAME_SUCCESS,
    ].includes(action.type)
  ) {
    const state = getState();
    const { token } = state.auth;
    dispatch(gamesRequested(token));
  }
};

const failedJoinLeaveFlow = ({ dispatch }) => (next) => (action) => {
  /*
  If the user failed to join or leave a game, show an error message.
  */
  next(action);

  if (
    [
      gamesConstants.LEAVE_GAME_REQUEST_FAILED,
      gamesConstants.JOIN_GAME_REQUEST_FAILED,
    ].includes(action.type)
  ) {
    const { statusText } = action.payload;
    dispatch(alertsClearAll());
    dispatch(
      alertsAdd({
        message: statusText,
        category: 'error',
      })
    );
  }
};

export default [
  joinLeaveGameFlow,
  failedJoinLeaveFlow,
  postJoinLeaveFlow,
  loadGamesFlow,
  loadGameDetailFlow,
  normalizeGames,
  normalizeGameDetail,
];
