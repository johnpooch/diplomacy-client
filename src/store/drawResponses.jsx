/* eslint-disable no-param-reassign */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { apiRequest, getOptions, urls } from './api';
import { drawSelectors } from './draws';

const setDrawResponse = createAsyncThunk(
  'draws/setDrawResponseStatus',
  async ({ token, draw, response }, thunkApi) => {
    const url = urls.DRAW_RESPONSE.replace('<draw>', draw);
    const options = getOptions(token, 'POST', { response });
    return apiRequest(url, options, thunkApi);
  }
);

const cancelDrawResponse = createAsyncThunk(
  'draws/cancelDrawResponseStatus',
  async ({ token, draw, response }, thunkApi) => {
    const url = `${urls.DRAW_RESPONSE.replace('<draw>', draw)}/${response}`;
    const options = getOptions(token, 'DELETE');
    return apiRequest(url, options, thunkApi);
  }
);

const drawResponseAdapter = createEntityAdapter();

const drawResponseSlice = createSlice({
  name: 'drawResponses',
  initialState: drawResponseAdapter.getInitialState({
    loading: false,
  }),
  reducers: {
    drawResponsesReceived: drawResponseAdapter.setAll,
  },
  extraReducers: {
    [setDrawResponse.pending]: (state) => ({ ...state, loading: true }),
    [setDrawResponse.fulfilled]: (state, { payload }) => {
      drawResponseAdapter.addOne(state, payload);
      state.loading = false;
    },
    [setDrawResponse.rejected]: (state) => ({ ...state, loading: true }),
    [cancelDrawResponse.pending]: (state) => ({ ...state, loading: true }),
    [cancelDrawResponse.fulfilled]: (state, { meta }) => {
      const { response } = meta.arg;
      drawResponseAdapter.removeOne(state, response);
      state.loading = false;
    },
    [cancelDrawResponse.rejected]: (state) => ({ ...state, loading: true }),
  },
});

export const drawResponseActions = {
  ...drawResponseSlice.actions,
  cancelDrawResponse,
  setDrawResponse,
};

const adapterSelectors = drawResponseAdapter.getSelectors(
  (state) => state.entities.drawResponses
);

const selectByDrawId = createSelector(
  drawSelectors.selectById,
  adapterSelectors.selectAll,
  (draw, drawResponses) =>
    drawResponses.filter((dr) => draw.drawResponses.includes(dr.id))
);

export const drawResponseSelectors = {
  ...adapterSelectors,
  selectByDrawId,
};

export default drawResponseSlice.reducer;
