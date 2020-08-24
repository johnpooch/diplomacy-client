import flagService from '../services/flag';

const FLAGS_RECEIVED = 'FLAGS_RECEIVED';
const FLAGS_REQUESTED = 'FLAGS_REQUESTED';
const FLAGS_REQUEST_FAILED = 'FLAGS_REQUEST_FAILED';

// Action creators
export const flagsReceived = (payload) => ({
  type: FLAGS_RECEIVED,
  payload,
});

export const flagsRequested = () => ({
  type: FLAGS_REQUESTED,
});

export const flagsRequestFailed = () => ({
  type: FLAGS_REQUEST_FAILED,
});

const initialState = {
  data: {},
  loading: false,
};

// Reducer
const flags = (state = initialState, action) => {
  switch (action.type) {
    case FLAGS_RECEIVED: {
      const { payload } = action;
      return { ...state, data: payload };
    }
    case FLAGS_REQUESTED:
      return { ...state, loading: true };
    case FLAGS_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Public actions
export const loadFlags = () => {
  return (dispatch) => {
    dispatch(flagsRequested());
    flagService.listFlags().then(
      (data) => {
        const payload = {};
        data.forEach((item) => {
          payload[item.id] = item.flag_as_data;
        });
        dispatch(flagsReceived(payload));
      },
      () => {
        dispatch(flagsRequestFailed());
      }
    );
  };
};

export default flags;
