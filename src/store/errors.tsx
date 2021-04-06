/* eslint-disable no-param-reassign */

import { createAction, createReducer } from '@reduxjs/toolkit';

interface error {
  [key: string]: string;
}

const initialState = {};
const addError = createAction<error>('addError');
const clearErrors = createAction('clearErrors');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addError, (state, { payload }) => {
    state = payload;
    return state;
  });
  builder.addCase(clearErrors, () => {
    return initialState;
  });
});

export const errorActions = {
  addError,
  clearErrors,
};

export default reducer;
