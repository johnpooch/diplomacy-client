/* eslint-disable no-param-reassign */

import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = { loaded: false };
const setGameDetail = createAction('setGameDetail');
const clearGameDetail = createAction('clearGameDetail');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGameDetail, (state, { payload }) => {
    state = { ...payload, loaded: true };
    return state;
  });
  builder.addCase(clearGameDetail, (state) => {
    state = initialState;
    return state;
  });
});

export const gameDetailActions = {
  setGameDetail,
  clearGameDetail,
};

export default reducer;
