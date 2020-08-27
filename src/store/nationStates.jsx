const NATION_STATES_RECEIVED = 'NATION_STATES_RECEIVED';

export const nationStatesReceived = (payload) => ({
  type: NATION_STATES_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const nationStatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NATION_STATES_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default nationStatesReducer;
