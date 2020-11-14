import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { apiRequest, getOptions, urls } from './api';

const cancelSurrender = createAsyncThunk(
  'surrenders/cancelSurrenderStatus',
  async ({ token, turn, id }, thunkApi) => {
    let url = urls.SURRENDER.replace('<turn>', turn);
    url = `${url}/${id}`;
    const options = getOptions(token, 'PATCH', {});
    return apiRequest(url, options, thunkApi);
  }
);

const setSurrender = createAsyncThunk(
  'surrenders/setSurrenderStatus',
  async ({ token, turn }, thunkApi) => {
    const url = urls.SURRENDER.replace('<turn>', turn);
    const options = getOptions(token, 'POST', {});
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
    [setSurrender.fulfilled]: surrenderAdapter.addOne,
  },
});

export default surrenderSlice.reducer;

const adapterSelectors = surrenderAdapter.getSelectors(
  (state) => state.entities.surrenders
);

export const surrenderSelectors = {
  ...adapterSelectors,
};

export const surrenderActions = {
  ...surrenderSlice.actions,
  cancelSurrender,
  setSurrender,
};
