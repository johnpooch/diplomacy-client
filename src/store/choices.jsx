import gameService from '../services/game';

const CHOICES_RECEIVED = 'CHOICES_RECEIVED';
const CHOICES_REQUESTED = 'CHOICES_REQUESTED';
const CHOICES_REQUEST_FAILED = 'CHOICES_REQUEST_FAILED';

// Action creators
export const choicesReceived = (payload) => ({
  type: CHOICES_RECEIVED,
  payload,
});

export const choicesRequested = () => ({
  type: CHOICES_REQUESTED,
});

export const choicesRequestFailed = () => ({
  type: CHOICES_REQUEST_FAILED,
});

const initialState = {
  loading: false,
};

// Reducer
const choices = (state = initialState, action) => {
  switch (action.type) {
    case CHOICES_RECEIVED: {
      const { payload } = action;
      return {
        loading: false,
        gameStatuses: payload.game_statuses,
        nationChoiceModes: payload.nation_choice_modes,
        deadlines: payload.deadlines,
      };
    }
    case CHOICES_REQUESTED:
      return { ...state, loading: true };
    case CHOICES_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Public actions
const loadChoices = () => {
  return (dispatch) => {
    dispatch(choicesRequested());
    gameService.getChoices().then(
      (payload) => {
        dispatch(choicesReceived(payload));
      },
      () => {
        dispatch(choicesRequestFailed());
      }
    );
  };
};

export const choiceActions = {
  loadChoices,
};

export default choices;
