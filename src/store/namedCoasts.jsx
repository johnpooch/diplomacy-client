const NAMED_COASTS_RECEIVED = 'NAMED_COASTS_RECEIVED';

export const namedCoastsReceived = (payload) => ({
  type: NAMED_COASTS_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const namedCoastsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAMED_COASTS_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default namedCoastsReducer;
