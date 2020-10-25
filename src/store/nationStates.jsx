/* eslint-disable no-param-reassign */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { turnSelectors } from './turns';
import { apiRequest, getOptions } from './api';
import * as API from '../api';

const finalizeOrders = createAsyncThunk(
  'games/finalizeOrdersStatus',
  async ({ token, id }, thunkApi) => {
    const url = API.FINALIZEORDERSURL.replace('<pk>', id);
    const options = getOptions(token, 'PATCH', { id });
    return apiRequest(url, options, thunkApi);
  }
);

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
    nationStates.filter((n) => turn.nation_states.includes(n.id))
);

export const nationStateSelectors = {
  ...adapterSelectors,
  selectByTurnId,
};

export default nationStateSlice.reducer;
