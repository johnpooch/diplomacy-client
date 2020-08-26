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

const normalizeGame = (game) => {
  console.log(game);
  const normalizedGame = game;
  normalizedGame.variant = game.variant.id;
  normalizedGame.participants = game.participants.map((p) => p.id);
  if (game.current_turn) {
    normalizedGame.year = game.current_turn.year;
    normalizedGame.season = game.current_turn.season;
    normalizedGame.phase = game.current_turn.phase;
    normalizedGame.userNations = game.current_turn.nation_states.map((ns) => [
      ns.user.id,
      ns.nation,
    ]);
    delete normalizedGame.current_turn;
  } else {
    normalizedGame.year = null;
    normalizedGame.season = null;
    normalizedGame.phase = null;
    normalizedGame.userNations = [];
    delete normalizedGame.current_turn;
  }
  return normalizedGame;
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
        const normalizedGame = normalizeGame(game);
        byId[id] = normalizedGame;
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
