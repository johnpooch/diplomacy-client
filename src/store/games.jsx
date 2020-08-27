import gameService from '../services/game';
import gameNormalizer from './normalizers/gameNormalizer';
import { nationStatesReceived } from './nationStates';
import { turnsReceived } from './turns';
import { usersReceived } from './users';

const GAMES_RECEIVED = 'GAMES_RECEIVED';
const GAMES_REQUESTED = 'GAMES_REQUESTED';
const GAMES_REQUEST_FAILED = 'GAMES_REQUEST_FAILED';

// Action creators
export const gamesReceived = (payload) => ({
  type: GAMES_RECEIVED,
  payload,
});

export const gamesRequested = () => ({
  type: GAMES_REQUESTED,
});

export const gamesRequestFailed = () => ({
  type: GAMES_REQUEST_FAILED,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

// Reducer
const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAMES_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { loading: false, byId, allIds };
    }
    case GAMES_REQUESTED:
      return { ...state, loading: true };
    case GAMES_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Public actions
const loadGames = (token) => {
  return (dispatch) => {
    dispatch(gamesRequested());
    gameService.getGames(token).then(
      (payload) => {
        const { entities } = gameNormalizer(payload);
        const { games, nationStates, turns, users } = entities;
        dispatch(gamesReceived(games));
        dispatch(nationStatesReceived(nationStates));
        dispatch(turnsReceived(turns));
        dispatch(usersReceived(users));
      },
      () => {
        dispatch(gamesRequestFailed());
      }
    );
  };
};

export const gameActions = {
  loadGames,
};

export default gamesReducer;
