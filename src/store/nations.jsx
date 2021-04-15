/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { variantSelectors } from './variants';

const nationAdapter = createEntityAdapter();

const nationSlice = createSlice({
  name: 'nations',
  initialState: nationAdapter.getInitialState(),
  reducers: {
    nationsReceived: nationAdapter.upsertMany,
  },
});

export const nationActions = {
  ...nationSlice.actions,
};

const adapterSelectors = nationAdapter.getSelectors(
  (state) => state.entities.nations
);

const selectByVariantId = createSelector(
  variantSelectors.selectById,
  adapterSelectors.selectAll,
  (variant, nations) => nations.filter((n) => variant.nations.includes(n.id))
);

export const nationSelectors = {
  ...adapterSelectors,
  selectByVariantId,
};

export default nationSlice.reducer;
