/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import apiActions from './apiActions';

const { getGameFilterChoices } = apiActions;

const initialState = { loading: false, loaded: false };

const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  extraReducers: {
    [getGameFilterChoices.pending]: (state) => {
      state.loading = true;
    },
    [getGameFilterChoices.fulfilled]: (_, { payload }) => {
      return { loading: false, loaded: true, ...payload };
    },
    [getGameFilterChoices.rejected]: (state, { payload }) => {
      state.loading = false;
      state.loaded = true;
      state.error = payload;
    },
  },
});

export const choiceActions = {
  ...choicesSlice.actions,
  getGameFilterChoices,
};

export default choicesSlice.reducer;
