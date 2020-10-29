import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { variantSelectors } from './variants';

const mapDataAdapter = createEntityAdapter();

const mapDataSlice = createSlice({
  name: 'map_data',
  initialState: mapDataAdapter.getInitialState(),
  reducers: {
    mapDataReceived: mapDataAdapter.setAll,
  },
});

export default mapDataSlice.reducer;

const adapterSelectors = mapDataAdapter.getSelectors(
  (state) => state.entities.mapData
);

const selectByVariantId = createSelector(
  variantSelectors.selectById,
  adapterSelectors.selectAll,
  (variant, mapData) => mapData.filter((t) => variant.map_data.includes(t.id))
);

export const mapDataSelectors = {
  ...adapterSelectors,
  selectByVariantId,
};

export const mapDataActions = {
  ...mapDataSlice.actions,
};
