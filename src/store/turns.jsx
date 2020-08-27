const TURNS_RECEIVED = 'TURNS_RECEIVED';

export const turnsReceived = (payload) => ({
  type: TURNS_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const turnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TURNS_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default turnsReducer;
