const TERRITORIES_RECEIVED = 'TERRITORIES_RECEIVED';

// Action creators
export const territoriesReceived = (payload) => ({
  type: TERRITORIES_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

// Reducer
const territories = (state = initialState, action) => {
  switch (action.type) {
    case TERRITORIES_RECEIVED: {
      const { payload } = action;
      const byId = {};
      const allIds = [];
      payload.forEach((territory) => {
        const { id } = territory;
        byId[id] = territory;
        allIds.push(id);
      });
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default territories;
