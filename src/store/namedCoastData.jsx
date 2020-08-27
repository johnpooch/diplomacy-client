const NAMED_COAST_DATA_RECEIVED = 'NAMED_COAST_DATA_RECEIVED';

export const namedCoastDataReceived = (payload) => ({
  type: NAMED_COAST_DATA_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const namedCoastDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAMED_COAST_DATA_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default namedCoastDataReducer;
