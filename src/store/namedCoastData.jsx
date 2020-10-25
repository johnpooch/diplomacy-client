/* eslint-disable no-param-reassign */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const namedCoastDataAdapter = createEntityAdapter();

const namedCoastDataSlice = createSlice({
  name: 'named_coasts',
  initialState: namedCoastDataAdapter.getInitialState(),
  reducers: {
    namedCoastDataReceived: namedCoastDataAdapter.setAll,
  },
});

export const namedCoastDataActions = {
  ...namedCoastDataSlice.actions,
};

export const namedCoastDataSelectors = namedCoastDataAdapter.getSelectors(
  (state) => state.entities.namedCoastDatas
);

export default namedCoastDataSlice.reducer;
