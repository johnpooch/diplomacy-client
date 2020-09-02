const PIECES_RECEIVED = 'PIECES_RECEIVED';

export const piecesReceived = (payload) => ({
  type: PIECES_RECEIVED,
  payload,
});

const initialState = {
  data: [],
};

const piecesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PIECES_RECEIVED: {
      const { payload } = action;
      if (!payload) return initialState;
      const data = Object.values(payload);
      return { data };
    }
    default:
      return state;
  }
};

export default piecesReducer;
