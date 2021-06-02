/* eslint-disable no-param-reassign */

import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = { loaded: false, loading: true, activeTurnId: null };
const clearGameDetail = createAction('clearGameDetail');
const setActiveTurn = createAction('setActiveTurn');
const setGameDetail = createAction('setGameDetail');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGameDetail, (state, { payload }) => {
    state = { ...state, ...payload, loaded: true, loading: false };
    return state;
  });
  builder.addCase(clearGameDetail, (state) => {
    state = initialState;
    return state;
  });
  builder.addCase(setActiveTurn, (state, { payload }) => {
    return { ...state, activeTurnId: payload };
  });
});

export const gameDetailActions = {
  setActiveTurn,
  setGameDetail,
  clearGameDetail,
};

export default reducer;
