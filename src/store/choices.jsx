/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiRequest, getOptions, urls } from './api';

const getChoices = createAsyncThunk(
  'choices/getChoicesStatus',
  async (_, thunkApi) => {
    const url = urls.GAME_FILTER_CHOICES;
    const options = getOptions();
    return apiRequest(url, options, thunkApi);
  }
);

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
    [getChoices.pending]: (state) => {
      state.loading = true;
    },
    [getChoices.fulfilled]: (_, { payload }) => {
      return { loading: false, ...payload };
    },
    [getChoices.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const choiceActions = {
  ...choicesSlice.actions,
  getChoices,
};

export default choicesSlice.reducer;
