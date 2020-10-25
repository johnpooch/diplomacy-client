/* eslint-disable no-param-reassign */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { apiRequest, getOptions } from './api';
import * as API from '../api';

const getFlags = createAsyncThunk(
  'flags/getFlagsStatus',
  async (_, thunkApi) => {
    const url = API.LISTNATIONFLAGSURL;
    const options = getOptions();
    return apiRequest(url, options, thunkApi);
  }
);

const flagAdapter = createEntityAdapter();

const flagSlice = createSlice({
  name: 'flags',
  initialState: flagAdapter.getInitialState({ loading: false }),
  extraReducers: {
    [getFlags.fulfilled]: (state, action) => {
      flagAdapter.upsertMany(state, action);
      state.loading = false;
    },
    [getFlags.pending]: (state) => {
      state.loading = true;
    },
    [getFlags.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const flagActions = { getFlags };

export const flagSelectors = flagAdapter.getSelectors(
  (state) => state.entities.flags
);

export default flagSlice.reducer;
