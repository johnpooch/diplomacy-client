const TERRITORIES_RECEIVED = 'TERRITORIES_RECEIVED';

export const territoriesReceived = (payload) => ({
  type: TERRITORIES_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const territoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TERRITORIES_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default territoriesReducer;
