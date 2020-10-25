/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { variantSelectors } from './variants';

const territoryAdapter = createEntityAdapter();

const territorySlice = createSlice({
  name: 'territories',
  initialState: territoryAdapter.getInitialState(),
  reducers: {
    territoriesReceived: territoryAdapter.setAll,
  },
});

export const territoryActions = {
  ...territorySlice.actions,
};

const adapterSelectors = territoryAdapter.getSelectors(
  (state) => state.entities.territories
);

const selectByVariantId = createSelector(
  variantSelectors.selectById,
  adapterSelectors.selectAll,
  (variant, territories) =>
    territories.filter((t) => variant.territories.includes(t.id))
);

export const territorySelectors = {
  ...adapterSelectors,
  selectByVariantId,
};

export default territorySlice.reducer;
