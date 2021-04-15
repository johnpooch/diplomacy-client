/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { gameSelectors } from './games';

// use string literal to avoid import loop
// TODO we actually don't need the two way relation between turns and orders
const LIST_ORDERS_FULFILLED = 'orders/listOrdersStatus/fulfilled';

const turnAdapter = createEntityAdapter();

const turnSlice = createSlice({
  name: 'turns',
  initialState: turnAdapter.getInitialState(),
  reducers: {
    turnsReceived: turnAdapter.setAll,
    turnDetailsReceived: turnAdapter.upsertMany,
    addOrder: (state, { payload }) => {
      const { id, order } = payload;
      const turn = state.entities[id];
      turn.orders.push(order);
    },
    addPieceState: (state, { payload }) => {
      const { id, pieceState } = payload;
      const turn = state.entities[id];
      turn.pieceStates.push(pieceState);
    },
    removeOrder: (state, { payload }) => {
      const { id, order } = payload;
      const turn = state.entities[id];
      turn.orders = turn.orders.filter((o) => o !== order);
    },
    removePieceState: (state, { payload }) => {
      const { id, pieceState } = payload;
      const turn = state.entities[id];
      turn.pieceStates = turn.pieceStates.filter((ps) => ps !== pieceState);
    },
  },
  extraReducers: {
    [LIST_ORDERS_FULFILLED]: (state, { payload, meta }) => {
      const { id: turnId } = meta.arg;
      const turn = state.entities[turnId];
      turn.orders = payload.map((o) => o.id);
      return state;
    },
  },
});

export const turnActions = {
  ...turnSlice.actions,
};

const adapterSelectors = turnAdapter.getSelectors(
  (state) => state.entities.turns
);

const selectGameCurrentTurn = createSelector(
  gameSelectors.selectById,
  adapterSelectors.selectAll,
  (game, turns) => turns.find((t) => game.current_turn === t.id)
);

const selectByNationStateId = (state, nationStateId) => {
  const turns = adapterSelectors.selectAll(state);
  return turns.find((t) => t.nationStates.includes(nationStateId));
};

const selectByGame = createSelector(
  (_, id) => id,
  adapterSelectors.selectAll,
  (id, turns) => turns.filter((t) => t.game === id)
);

export const turnSelectors = {
  ...adapterSelectors,
  selectGameCurrentTurn,
  selectByNationStateId,
  selectByGame,
};

export default turnSlice.reducer;
