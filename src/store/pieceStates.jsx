const PIECE_STATES_RECEIVED = 'PIECE_STATES_RECEIVED';

export const pieceStatesReceived = (payload) => ({
  type: PIECE_STATES_RECEIVED,
  payload,
});

const initialState = {
  data: [],
};

const pieceStatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PIECE_STATES_RECEIVED: {
      const { payload } = action;
      if (!payload) return initialState;
      const data = Object.values(payload);
      return { data };
    }
    default:
      return state;
  }
};

export default pieceStatesReducer;
