/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { turnSelectors } from './turns';

const territoryStateAdapter = createEntityAdapter();

const territoryStateSlice = createSlice({
  name: 'territoryStates',
  initialState: territoryStateAdapter.getInitialState(),
  reducers: {
    territoryStatesReceived: territoryStateAdapter.setAll,
  },
});

export const territoryStateActions = {
  ...territoryStateSlice.actions,
};

const adapterSelectors = territoryStateAdapter.getSelectors(
  (state) => state.entities.territoryStates
);

const selectByTurnId = createSelector(
  turnSelectors.selectById,
  adapterSelectors.selectAll,
  (turn, territoryStates) =>
    territoryStates.filter((t) => turn.territoryStates.includes(t.id))
);

export const territoryStateSelectors = {
  ...adapterSelectors,
  selectByTurnId,
};

export default territoryStateSlice.reducer;
