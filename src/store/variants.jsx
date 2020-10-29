/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import * as API from '../api';
import { apiRequest, getOptions } from './api';

const getVariants = createAsyncThunk(
  'variants/getVariants',
  async ({ token }, thunkApi) => {
    const url = API.LISTVARIANTS;
    const options = getOptions(token);
    return apiRequest(url, options, thunkApi);
  }
);

const variantAdapter = createEntityAdapter();

const variantSlice = createSlice({
  name: 'variants',
  initialState: variantAdapter.getInitialState({ loading: false }),
  extraReducers: {
    [getVariants.fulfilled]: (state, action) => {
      variantAdapter.setAll(state, action);
      state.loading = false;
    },
    [getVariants.pending]: (state) => {
      state.loading = true;
    },
    [getVariants.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const variantActions = {
  ...variantSlice.actions,
  getVariants,
};

export const variantSelectors = {
  ...variantAdapter.getSelectors((state) => state.entities.variants),
};

export default variantSlice.reducer;
