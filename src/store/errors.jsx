/* eslint-disable no-param-reassign */

import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {};
const addError = createAction('addError');
const clearErrors = createAction('clearErrors');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addError, (state, { payload }) => {
    state = payload;
    return state;
  });
  builder.addCase(clearErrors, (state, { payload }) => {
    delete state[payload];
    return state;
  });
});

export const errorActions = {
  addError,
  clearErrors,
};

export default reducer;
