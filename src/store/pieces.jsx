/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { gameSelectors } from './games';

const pieceAdapter = createEntityAdapter();

const pieceSlice = createSlice({
  name: 'piece',
  initialState: pieceAdapter.getInitialState(),
  reducers: {
    piecesReceived: pieceAdapter.setAll,
    addPiece: pieceAdapter.addOne,
    removePiece: pieceAdapter.removeOne,
  },
});

export const pieceActions = {
  ...pieceSlice.actions,
};

const adapterSelectors = pieceAdapter.getSelectors(
  (state) => state.entities.pieces
);

const selectByGameId = createSelector(
  gameSelectors.selectById,
  adapterSelectors.selectAll,
  (game, pieces) => pieces.filter((p) => game.pieces.includes(p.id))
);

export const pieceSelectors = {
  ...adapterSelectors,
  selectByGameId,
};

export default pieceSlice.reducer;
