const FINALIZE_ORDERS_REQUEST = '[games] Finalize orders request';
const FINALIZE_ORDERS_SUCCESS = '[games] Finalize orders success';
const FINALIZE_ORDERS_FAILURE = '[games] Finalize orders failure';

const GAME_DETAIL_REQUEST = '[games] Game detail requested';
const GAME_DETAIL_SUCCESS = '[games] Game detail received';
const GAME_DETAIL_FAILURE = '[games] Game detail request failed';

const GAMES_RECEIVED = '[games] Games received';
const GAMES_REQUESTED = '[games] Games requested';
const GAMES_REQUEST_FAILED = '[games] Games request failed';

const NORMALIZED_GAMES_RECEIVED = '[games] Normalized games received';

const JOIN_GAME_REQUESTED = '[games] Join game requested';
const JOIN_GAME_SUCCESS = '[games] Join game success';
const JOIN_GAME_REQUEST_FAILED = '[games] Join game request failed';

const LEAVE_GAME_REQUESTED = '[games] Leave game requested';
const LEAVE_GAME_SUCCESS = '[games] Leave game success';
const LEAVE_GAME_REQUEST_FAILED = '[games] Leave game request failed';

export const gamesConstants = {
  FINALIZE_ORDERS_REQUEST,
  FINALIZE_ORDERS_SUCCESS,
  FINALIZE_ORDERS_FAILURE,
  GAME_DETAIL_REQUEST,
  GAME_DETAIL_SUCCESS,
  GAME_DETAIL_FAILURE,
  GAMES_RECEIVED,
  GAMES_REQUESTED,
  GAMES_REQUEST_FAILED,
  NORMALIZED_GAMES_RECEIVED,
  JOIN_GAME_REQUESTED,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_REQUEST_FAILED,
  LEAVE_GAME_REQUESTED,
  LEAVE_GAME_SUCCESS,
  LEAVE_GAME_REQUEST_FAILED,
};

// Action creators
export const finalizeOrdersRequest = (token, id) => ({
  type: FINALIZE_ORDERS_SUCCESS,
  payload: {
    token,
    id,
  },
});

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
      const { slug } = action.payload;
      const gamesList = Object.values(state.byId);
      const game = gamesList.find((obj) => {
        return obj.slug === slug;
      });
      const newState = { ...state };
      const newById = { ...state.byId };
      newById[game.id] = {
        ...game,
        loading: true,
      };
      newState.byId = newById;
      return newState;
    }
    // TODO clear up logic here
    case GAME_DETAIL_SUCCESS: {
      // Add data to store and set to loaded
      const gameDetail = Object.values(action.payload)[0];
      const newState = { ...state };
      const newById = { ...state.byId };
      const originalGame = newById[gameDetail.id];
      const newGame = {
        ...originalGame,
        ...gameDetail,
        loading: false,
        detailLoaded: true,
      };
      newById[gameDetail.id] = newGame;
      newState.byId = newById;
      return newState;
    }
    case GAME_DETAIL_FAILURE:
      // TODO need to work out what happens here
      return {
        ...state,
        loading: false,
      };
    case NORMALIZED_GAMES_RECEIVED: {
      const { payload } = action;
      const { games, order } = payload;
      if (!games) return initialState;
      // Set each game's detailLoaded and loading to false
      Object.values(games).map((game) => {
        const newProps = {
          detailLoaded: false,
          loading: false,
        };
        return Object.assign(game, newProps);
      });
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
  finalizeOrdersRequest,
};
