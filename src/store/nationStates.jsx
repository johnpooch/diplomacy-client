/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import apiActions from './apiActions';
import { turnSelectors } from './turns';

const { finalizeOrders, getOrdersFinalized, getOrdersStatus } = apiActions;

const nationStateAdapter = createEntityAdapter();

const nationStateSlice = createSlice({
  name: 'nationStates',
  initialState: nationStateAdapter.getInitialState(),
  reducers: {
    nationStatesReceived: nationStateAdapter.upsertMany,
  },
  extraReducers: {
    [finalizeOrders.pending]: (state, { meta }) => {
      const { nationStateId } = meta.arg.urlParams;
      const changes = { loading: true };
      nationStateAdapter.updateOne(state, { id: nationStateId, changes });
    },
    [finalizeOrders.fulfilled]: (state, { meta, payload }) => {
      const { nationStateId } = meta.arg.urlParams;
      const { ordersFinalized } = payload;
      const changes = { loading: false, ordersFinalized };
      nationStateAdapter.updateOne(state, { id: nationStateId, changes });
    },
    [finalizeOrders.rejected]: (state, { meta }) => {
      const { nationStateId } = meta.arg.urlParams;
      const changes = { loading: false };
      nationStateAdapter.updateOne(state, { id: nationStateId, changes });
    },
    [getOrdersFinalized.fulfilled]: (state, { payload }) => {
      const { id, ...changes } = payload;
      nationStateAdapter.updateOne(state, { id, changes });
    },
    [getOrdersStatus.fulfilled]: (state, { payload }) => {
      const { id, ...changes } = payload;
      nationStateAdapter.updateOne(state, { id, changes });
    },
  },
});

export const nationStateActions = {
  ...nationStateSlice.actions,
  finalizeOrders,
  getOrdersFinalized,
  getOrdersStatus,
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

const selectByUserId = createSelector(
  adapterSelectors.selectAll,
  (_, id) => id,
  (nationStates, id) => nationStates.find((n) => n.user === id)
);

export const nationStateSelectors = {
  ...adapterSelectors,
  selectByTurnId,
  selectByUserId,
};

export default nationStateSlice.reducer;
