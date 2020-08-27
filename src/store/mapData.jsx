const MAP_DATA_RECEIVED = 'MAP_DATA_RECEIVED';

export const mapDataReceived = (payload) => ({
  type: MAP_DATA_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const mapDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_DATA_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default mapDataReducer;
