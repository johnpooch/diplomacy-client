/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { territorySelectors } from './territories';

const namedCoastAdapter = createEntityAdapter();

const namedCoastSlice = createSlice({
  name: 'namedCoasts',
  initialState: namedCoastAdapter.getInitialState(),
  reducers: {
    namedCoastsReceived: namedCoastAdapter.setAll,
  },
});

export const namedCoastActions = {
  ...namedCoastSlice.actions,
};

const adapterSelectors = namedCoastAdapter.getSelectors(
  (state) => state.entities.namedCoasts
);

const selectByVariantId = createSelector(
  territorySelectors.selectByVariantId,
  adapterSelectors.selectAll,
  (territories, namedCoasts) =>
    namedCoasts.filter((nc) => territories.map((t) => t.id).includes(nc.parent))
);

export const namedCoastSelectors = {
  ...adapterSelectors,
  selectByVariantId,
};

export default namedCoastSlice.reducer;
