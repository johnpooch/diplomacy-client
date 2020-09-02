import gameService from '../services/game';
import gameDetailNormalizer from './normalizers/gameDetailNormalizer';
import { nationStatesReceived } from './nationStates';
import { ordersReceived } from './orders';
import { pieceStatesReceived } from './pieceStates';
import { territoryStatesReceived } from './territoryStates';
import { turnsReceived } from './turns';
import { piecesReceived } from './pieces';
import { logout } from './auth';

const GAME_DETAIL_RECEIVED = 'GAME_RECEIVED';
const GAME_DETAIL_REQUESTED = 'GAME_REQUESTED';
const GAME_DETAIL_REQUEST_FAILED = 'GAME_REQUEST_FAILED';

// Action creators
export const gameDetailReceived = (payload) => ({
  type: GAME_DETAIL_RECEIVED,
  payload,
});

export const gameDetailRequested = () => ({
  type: GAME_DETAIL_REQUESTED,
});

export const gameDetailRequestFailed = () => ({
  type: GAME_DETAIL_REQUEST_FAILED,
});

const initialState = {
  data: null,
  loading: false,
};

// Reducer
const gameDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_DETAIL_RECEIVED: {
      const { payload } = action;
      const data = payload[1];
      return { loading: false, data };
    }
    case GAME_DETAIL_REQUESTED:
      return { ...state, loading: true };
    case GAME_DETAIL_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Public actions
const loadGame = (token, slug) => {
  return (dispatch) => {
    dispatch(gameDetailRequested());
    gameService.getGame(token, slug).then(
      (payload) => {
        const { entities } = gameDetailNormalizer(payload);
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
        dispatch(gameDetailReceived(game));
      },
      (e) => {
        dispatch(gameDetailRequestFailed());
        if (e.status === 401) {
          dispatch(logout());
        }
      }
    );
  };
};

export const gameDetailActions = {
  loadGame,
};

export default gameDetailReducer;
