/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import apiActions from './apiActions';

const { getGameFilterChoices } = apiActions;

const initialState = { loading: false };

const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {
    authLogout: () => {
      return {
        loggedIn: false,
        user: {},
        token: null,
      };
    },
  },
  extraReducers: {
    [getGameFilterChoices.pending]: (state) => {
      state.loading = true;
    },
    [getGameFilterChoices.fulfilled]: (_, { payload }) => {
      return { loading: false, ...payload };
    },
    [getGameFilterChoices.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const choiceActions = {
  ...choicesSlice.actions,
  getGameFilterChoices,
};

export default choicesSlice.reducer;
