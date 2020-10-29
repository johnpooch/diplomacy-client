/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { mapDataSelectors } from './mapData';

const territoryDataAdapter = createEntityAdapter();

const territoryDataSlice = createSlice({
  name: 'territory_data',
  initialState: territoryDataAdapter.getInitialState(),
  reducers: {
    territoryDataReceived: territoryDataAdapter.setAll,
  },
});

export const territoryDataActions = {
  ...territoryDataSlice.actions,
};

const adapterSelectors = territoryDataAdapter.getSelectors(
  (state) => state.entities.territoryData
);

const selectByVariantId = createSelector(
  mapDataSelectors.selectByVariantId,
  adapterSelectors.selectAll,
  (mapData, territoryData) =>
    territoryData.filter((t) => mapData[0].territory_data.includes(t.id))
);

export const territoryDataSelectors = {
  ...adapterSelectors,
  selectByVariantId,
};

export default territoryDataSlice.reducer;
