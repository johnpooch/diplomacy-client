import gameService from '../services/game';

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
};

// Reducer
const games = (state = initialState, action) => {
  switch (action.type) {
    case GAMES_RECEIVED: {
      const { payload } = action;
      const byId = {};
      const allIds = [];
      payload.forEach((game) => {
        const { id } = game;
        const reformattedGame = game;
        reformattedGame.variant = game.variant.id;
        reformattedGame.participants = game.participants.map((p) => p.id);
        if (game.current_turn) {
          reformattedGame.year = game.current_turn.year;
          reformattedGame.season = game.current_turn.season;
          reformattedGame.phase = game.current_turn.phase;
          delete reformattedGame.current_turn;
        } else {
          reformattedGame.year = null;
          reformattedGame.season = null;
          reformattedGame.phase = null;
          delete reformattedGame.current_turn;
        }
        byId[id] = reformattedGame;
        allIds.push(id);
      });
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
        dispatch(gamesReceived(payload));
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

export default games;
