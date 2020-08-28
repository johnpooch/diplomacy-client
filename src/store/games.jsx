import gameService from '../services/game';
import gameNormalizer from './normalizers/gameNormalizer';
import { nationStatesReceived } from './nationStates';
import { turnsReceived } from './turns';
import { usersReceived } from './users';

const GAMES_RECEIVED = 'GAMES_RECEIVED';
const GAMES_REQUESTED = 'GAMES_REQUESTED';
const GAMES_REQUEST_FAILED = 'GAMES_REQUEST_FAILED';

// Action creators
export const gamesReceived = (games, order) => ({
  type: GAMES_RECEIVED,
  payload: { games, order },
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
      const { games, order } = payload;
      if (!games) return initialState;
      const byId = games;
      const allIds = order;
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
const loadGames = (token, filters = null) => {
  return (dispatch) => {
    dispatch(gamesRequested());
    gameService.getGames(token, filters).then(
      (payload) => {
        const { entities, result: order } = gameNormalizer(payload);
        const { games, nationStates, turns, users } = entities;
        dispatch(nationStatesReceived(nationStates));
        dispatch(turnsReceived(turns));
        dispatch(usersReceived(users));
        dispatch(gamesReceived(games, order));
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
