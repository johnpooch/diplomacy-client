/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { turnSelectors } from './turns';

const SET_DRAW_RESPONSE_FULFILLED = 'draws/setDrawResponseStatus/fulfilled';
const CANCEL_DRAW_RESPONSE_FULFILLED =
  'draws/cancelDrawResponseStatus/fulfilled';

const drawAdapter = createEntityAdapter();

const drawSlice = createSlice({
  name: 'draws',
  initialState: drawAdapter.getInitialState(),
  reducers: {
    drawsReceived: drawAdapter.setAll,
  },
  extraReducers: {
    [SET_DRAW_RESPONSE_FULFILLED]: (state, { payload }) => {
      const { draw: drawId, id } = payload;
      const draw = state.entities[drawId];
      draw.drawResponses.push(id);
      return state;
    },
    [CANCEL_DRAW_RESPONSE_FULFILLED]: (state, { meta }) => {
      const { draw: drawId, response } = meta.arg;
      const draw = state.entities[drawId];
      draw.drawResponses = draw.drawResponses.filter((r) => r !== response);
    },
  },
});

export const drawActions = {
  ...drawSlice.actions,
};

const adapterSelectors = drawAdapter.getSelectors(
  (state) => state.entities.draws
);

const selectByTurnId = createSelector(
  turnSelectors.selectById,
  adapterSelectors.selectAll,
  (turn, draws) => draws.filter((t) => turn.draws.includes(t.id))
);

export const drawSelectors = {
  ...adapterSelectors,
  selectByTurnId,
};

export default drawSlice.reducer;
