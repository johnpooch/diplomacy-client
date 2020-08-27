const TERRITORY_DATA_RECEIVED = 'TERRITORY_DATA_RECEIVED';

export const territoryDataReceived = (payload) => ({
  type: TERRITORY_DATA_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const territoryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TERRITORY_DATA_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default territoryDataReducer;
