export const GAMES_RECEIVED = '[games] Games received';
export const GAMES_REQUESTED = '[games] Games requested';
export const GAMES_REQUEST_FAILED = '[games] Games request failed';
export const NORMALIZED_GAMES_RECEIVED = '[games] Normalized games received';

export const JOIN_GAME_REQUESTED = '[games] Join game requested';
export const JOIN_GAME_SUCCESS = '[games] Join game success';
export const JOIN_GAME_REQUEST_FAILED = '[games] Join game request failed';

export const LEAVE_GAME_REQUESTED = '[games] Leave game requested';
export const LEAVE_GAME_SUCCESS = '[games] Leave game success';
export const LEAVE_GAME_REQUEST_FAILED = '[games] Leave game request failed';

// Action creators
export const gamesReceived = (payload) => ({
  type: GAMES_RECEIVED,
  payload,
});

export const gamesRequested = (token, filters = null) => ({
  type: GAMES_REQUESTED,
  payload: {
    token,
    filters,
  },
});

export const gamesRequestFailed = () => ({
  type: GAMES_REQUEST_FAILED,
});

export const normalizedGamesReceived = (games, order) => ({
  type: NORMALIZED_GAMES_RECEIVED,
  payload: {
    games,
    order,
  },
});

const joinGame = (token, slug) => ({
  type: JOIN_GAME_REQUESTED,
  payload: {
    token,
    slug,
  },
});

export const joinGameSuccess = () => ({
  type: JOIN_GAME_SUCCESS,
});

export const joinGameRequestFailed = () => ({
  type: JOIN_GAME_REQUEST_FAILED,
});

const leaveGame = (token, slug) => ({
  type: LEAVE_GAME_REQUESTED,
  payload: {
    token,
    slug,
  },
});

export const leaveGameSuccess = () => ({
  type: LEAVE_GAME_SUCCESS,
});

export const leaveGameRequestFailed = () => ({
  type: LEAVE_GAME_REQUEST_FAILED,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

// Reducer
const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NORMALIZED_GAMES_RECEIVED: {
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
    case JOIN_GAME_REQUESTED:
    case LEAVE_GAME_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default gamesReducer;

export const gameActions = {
  joinGame,
  leaveGame,
};
