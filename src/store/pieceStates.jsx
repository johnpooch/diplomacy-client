/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { turnSelectors } from './turns';

const pieceStateAdapter = createEntityAdapter();

const pieceStateSlice = createSlice({
  name: 'pieceStates',
  initialState: pieceStateAdapter.getInitialState(),
  reducers: {
    pieceStatesReceived: pieceStateAdapter.setAll,
    addPieceState: pieceStateAdapter.addOne,
  },
});

export const pieceStateActions = {
  ...pieceStateSlice.actions,
};

const adapterSelectors = pieceStateAdapter.getSelectors(
  (state) => state.entities.pieceStates
);

const selectByTurnId = createSelector(
  turnSelectors.selectById,
  adapterSelectors.selectAll,
  (turn, pieceStates) =>
    pieceStates.filter((p) => turn.piece_states.includes(p.id))
);

export const pieceStateSelectors = {
  ...adapterSelectors,
  selectByTurnId,
};

export default pieceStateSlice.reducer;
