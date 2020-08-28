const USERS_RECEIVED = 'USERS_RECEIVED';

export const usersReceived = (payload) => ({
  type: USERS_RECEIVED,
  payload,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_RECEIVED: {
      const { payload } = action;
      if (!payload) return initialState;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { byId, allIds };
    }
    default:
      return state;
  }
};

export default usersReducer;
