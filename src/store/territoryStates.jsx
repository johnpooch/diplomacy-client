const TERRITORY_STATES_RECEIVED = 'TERRITORY_STATES_RECEIVED';

export const territoryStatesReceived = (payload) => ({
  type: TERRITORY_STATES_RECEIVED,
  payload,
});

const initialState = {
  data: [],
};

const territoryStatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TERRITORY_STATES_RECEIVED: {
      const { payload } = action;
      if (!payload) return initialState;
      const data = Object.values(payload);
      return { data };
    }
    default:
      return state;
  }
};

export default territoryStatesReducer;
