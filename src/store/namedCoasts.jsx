/* eslint-disable no-param-reassign */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

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

export const namedCoastSelectors = namedCoastAdapter.getSelectors(
  (state) => state.entities.namedCoasts
);

export default namedCoastSlice.reducer;
