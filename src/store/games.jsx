export const GAME_DETAIL_REQUEST = '[games] Game detail requested';
export const GAME_DETAIL_SUCCESS = '[games] Game detail received';
export const GAME_DETAIL_FAILURE = '[games] Game detail request failed';

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
export const gameDetailRequest = (token, slug) => ({
  type: GAME_DETAIL_REQUEST,
  payload: {
    token,
    slug,
  },
});

export const gameDetailSuccess = (payload) => ({
  type: GAME_DETAIL_SUCCESS,
  payload,
});

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

export const joinGameSuccess = (payload) => ({
  type: JOIN_GAME_SUCCESS,
  payload,
});

export const joinGameRequestFailed = (payload) => ({
  type: JOIN_GAME_REQUEST_FAILED,
  payload,
});

const leaveGame = (token, slug) => ({
  type: LEAVE_GAME_REQUESTED,
  payload: {
    token,
    slug,
  },
});

export const leaveGameSuccess = (payload) => ({
  type: LEAVE_GAME_SUCCESS,
  payload,
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
    case GAME_DETAIL_REQUEST: {
      // set this game to be loading
      return state;
    }
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
    case JOIN_GAME_REQUEST_FAILED:
    case LEAVE_GAME_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default gamesReducer;

export const gameActions = {
  joinGame,
  leaveGame,
  gameDetailRequest,
};
