/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { turnSelectors } from './turns';
import apiActions from './apiActions';

const { finalizeOrders } = apiActions;

const SET_SURRENDER_FULFILLED = 'surrenders/setSurrender/fulfilled';

const nationStateAdapter = createEntityAdapter();

const nationStateSlice = createSlice({
  name: 'nationStates',
  initialState: nationStateAdapter.getInitialState(),
  reducers: {
    nationStatesReceived: nationStateAdapter.upsertMany,
  },
  extraReducers: {
    [finalizeOrders.pending]: (state, { meta }) => {
      const { id } = meta.arg;
      const changes = { loading: true };
      nationStateAdapter.updateOne(state, { id, changes });
    },
    [finalizeOrders.fulfilled]: (state, { payload }) => {
      const { id, ...nationState } = payload;
      const changes = { ...nationState, loading: false };
      nationStateAdapter.updateOne(state, { id, changes });
    },
    [finalizeOrders.rejected]: (state, { meta }) => {
      const { id } = meta.arg;
      const changes = { loading: false };
      nationStateAdapter.updateOne(state, { id, changes });
    },
    [SET_SURRENDER_FULFILLED]: (state, { payload }) => {
      const { nationState, id } = payload;
      const nationStateToUpdate = state.entities[nationState];
      nationStateToUpdate.surrenders.push(id);
    },
  },
});

export const nationStateActions = {
  ...nationStateSlice.actions,
  finalizeOrders,
};

const adapterSelectors = nationStateAdapter.getSelectors(
  (state) => state.entities.nationStates
);

const selectByTurnId = createSelector(
  turnSelectors.selectById,
  adapterSelectors.selectAll,
  (turn, nationStates) =>
    nationStates.filter((n) => turn.nationStates.includes(n.id))
);

export const nationStateSelectors = {
  ...adapterSelectors,
  selectByTurnId,
};

export default nationStateSlice.reducer;
