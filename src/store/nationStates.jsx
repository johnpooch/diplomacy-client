/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { turnSelectors } from './turns';
import apiActions from './apiActions';

const { finalizeOrders } = apiActions;

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
    // [toggleSurrender.fulfilled]: (state, { payload }) => {
    //   const { nationState, id } = payload;
    //   const nationStateToUpdate = state.entities[nationState];
    //   nationStateToUpdate.surrenders.push(id);
    // },
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
