const NATIONS_RECEIVED = 'NATIONS_RECEIVED';

export const nationsReceived = (payload) => ({
  type: NATIONS_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const nationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NATIONS_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default nationsReducer;
