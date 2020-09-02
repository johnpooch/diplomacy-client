import {
  GAMES_REQUESTED,
  GAMES_RECEIVED,
  GAMES_REQUEST_FAILED,
  JOIN_GAME_REQUESTED,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_REQUEST_FAILED,
  LEAVE_GAME_REQUESTED,
  LEAVE_GAME_SUCCESS,
  LEAVE_GAME_REQUEST_FAILED,
  gamesRequested,
  normalizedGamesReceived,
} from '../games';
import { alertsAdd } from '../alerts';
import { ALLGAMESURL, JOINGAMEURL } from '../../api';
import { apiRequest } from '../api';

import gameListNormalizer from '../normalizers/gameListNormalizer';
import { nationStatesReceived } from '../nationStates';
import { turnsReceived } from '../turns';
import { usersReceived } from '../users';

const loadGamesFlow = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type === GAMES_REQUESTED) {
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
      GAMES_RECEIVED,
      GAMES_REQUEST_FAILED
    );
    dispatch(apiAction);
  }
};

const normalizeGames = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type === GAMES_RECEIVED) {
    const { entities, result: order } = gameListNormalizer(action.payload);
    const { games, nationStates, turns, users } = entities;
    dispatch(nationStatesReceived(nationStates));
    dispatch(turnsReceived(turns));
    dispatch(usersReceived(users));
    next(normalizedGamesReceived(games, order));
  }
};

const joinGameFlow = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type === JOIN_GAME_REQUESTED) {
    const { token, slug } = action.payload;
    const url = JOINGAMEURL.replace('<game>', slug);

    const apiAction = apiRequest(
      'PATCH',
      url,
      token,
      action.payload,
      JOIN_GAME_SUCCESS,
      JOIN_GAME_REQUEST_FAILED
    );
    dispatch(apiAction);
  }
};

const leaveGameFlow = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type === LEAVE_GAME_REQUESTED) {
    console.log('HERE');
    const { token, slug } = action.payload;
    const url = JOINGAMEURL.replace('<game>', slug);

    const apiAction = apiRequest(
      'PATCH',
      url,
      token,
      action.payload,
      LEAVE_GAME_SUCCESS,
      LEAVE_GAME_REQUEST_FAILED
    );
    dispatch(apiAction);
  }
};

const gameJoinedFlow = ({ dispatch, getState }) => (next) => (action) => {
  next(action);

  if (action.type === JOIN_GAME_SUCCESS) {
    const state = getState();
    console.log(action.payload);
    const { token } = state.auth;
    const name = 'SOME GAME';
    dispatch(
      alertsAdd({
        message: `Joined "${name}"! The game will begin once all players have joined.`,
        category: 'success',
      })
    );
    dispatch(gamesRequested(token));
  }
};

const gameLeftFlow = ({ dispatch, getState }) => (next) => (action) => {
  next(action);

  if (action.type === LEAVE_GAME_SUCCESS) {
    const state = getState();
    const { token } = state.auth;
    const { name } = action.payload;
    dispatch(
      alertsAdd({
        message: `Left "${name}".`,
        category: 'success',
      })
    );
    dispatch(gamesRequested(token));
  }
};

export default [
  joinGameFlow,
  leaveGameFlow,
  loadGamesFlow,
  gameJoinedFlow,
  gameLeftFlow,
  normalizeGames,
];
