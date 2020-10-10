import { createReducer } from '@reduxjs/toolkit';

const NATION_STATES_RECEIVED = 'NATION_STATES_RECEIVED';

const PRIVATE_NATION_STATE_REQUEST =
  '[nation states] Private nation state requested';
const PRIVATE_NATION_STATE_SUCCESS =
  '[nation states] Private nation state success';
const PRIVATE_NATION_STATE_FAILURE =
  '[nation states] Private nation state failure';

export const nationStateConstants = {
  PRIVATE_NATION_STATE_REQUEST,
  PRIVATE_NATION_STATE_SUCCESS,
  PRIVATE_NATION_STATE_FAILURE,
};

export const nationStatesReceived = (payload) => ({
  type: NATION_STATES_RECEIVED,
  payload,
});

export const privateNationStateRequested = (token, slug) => ({
  type: PRIVATE_NATION_STATE_REQUEST,
  payload: {
    token,
    slug,
  },
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const nationStatesReducer = createReducer(initialState, {
  [NATION_STATES_RECEIVED]: (state, action) => {
    const { payload } = action;
    if (!payload) return state;
    const byId = { ...state };
    Object.keys(payload).forEach((k) => {
      const initialValue = byId[k];
      byId[k] = { ...initialValue, ...payload[k] };
    });

    const allIds = Object.values(payload).map((value) => value.id);
    return { byId, allIds };
  },
  [PRIVATE_NATION_STATE_REQUEST]: (state, action) => {
    return { ...state, loading: true };
  },
  [PRIVATE_NATION_STATE_SUCCESS]: (state, action) => {
    const updatedState = state;
    const { payload } = action;
    const { id } = payload;
    const nationState = state.byId[id];
    updatedState.byId[id] = { ...nationState, ...payload };
    updatedState.loading = false;
    return updatedState;
  },
});

export const nationStateActions = {
  privateNationStateRequested,
};

export default nationStatesReducer;
