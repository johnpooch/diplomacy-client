import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { apiRequest, getOptions } from './api';
import { urlConf } from '../urls';

import { nationStateSelectors } from './nationStates';

const cancelSurrender = createAsyncThunk(
  'surrenders/cancelSurrenderStatus',
  async ({ token, turn, id }, thunkApi) => {
    let url = urlConf.toggleSurrender.urlPattern.replace(':turnId', turn);
    url = `${url}/${id}`;
    const options = getOptions(token, urlConf.toggleSurrender.method, {});
    return apiRequest(url, options, thunkApi);
  }
);

const setSurrender = createAsyncThunk(
  'surrenders/setSurrenderStatus',
  async ({ token, turn }, thunkApi) => {
    const url = urlConf.toggleSurrender.urlPattern.replace(':turnId', turn);
    const options = getOptions(token, urlConf.toggleSurrender.method, {});
    return apiRequest(url, options, thunkApi);
  }
);

const surrenderAdapter = createEntityAdapter({
  // Sort surrenders by createdAt
  sortComparer: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
});

const surrenderSlice = createSlice({
  name: 'surrenders',
  initialState: surrenderAdapter.getInitialState(),
  reducers: {
    surrendersReceived: surrenderAdapter.upsertMany,
  },
  extraReducers: {
    [cancelSurrender.pending]: (state, { meta }) => {
      const { id } = meta.arg;
      const changes = { loading: true };
      surrenderAdapter.updateOne(state, { id, changes });
    },
    [cancelSurrender.fulfilled]: (state, { payload }) => {
      const { id, ...surrender } = payload;
      const changes = { ...surrender, loading: false };
      surrenderAdapter.updateOne(state, { id, changes });
    },
    [cancelSurrender.rejected]: (state, { meta }) => {
      const { id } = meta.arg;
      const changes = { loading: false };
      surrenderAdapter.updateOne(state, { id, changes });
    },
  },
});

export default surrenderSlice.reducer;

const adapterSelectors = surrenderAdapter.getSelectors(
  (state) => state.entities.surrenders
);

const selectByNationState = createSelector(
  nationStateSelectors.selectById,
  adapterSelectors.selectAll,
  (ns, surrenders) =>
    surrenders.find((s) => s.nationState === ns.id && s.status === 'pending')
);

export const surrenderSelectors = {
  ...adapterSelectors,
  selectByNationState,
};

export const surrenderActions = {
  ...surrenderSlice.actions,
  cancelSurrender,
  setSurrender,
};
