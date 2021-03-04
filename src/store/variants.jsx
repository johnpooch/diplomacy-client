/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import apiActions from './apiActions';

const { listVariants } = apiActions;

const variantAdapter = createEntityAdapter();

const variantSlice = createSlice({
  name: 'variants',
  initialState: variantAdapter.getInitialState({
    loading: false,
    error: null,
    loaded: false,
  }),
  extraReducers: {
    [listVariants.fulfilled]: (state, action) => {
      variantAdapter.setAll(state, action);
      state.loading = false;
      state.loaded = true;
    },
    [listVariants.pending]: (state) => {
      state.loading = true;
    },
    [listVariants.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const variantActions = {
  ...variantSlice.actions,
  listVariants,
};

export const variantSelectors = {
  ...variantAdapter.getSelectors((state) => state.entities.variants),
};

export default variantSlice.reducer;
