/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { gameSelectors } from './games';

// use string literal to avoid import loop
const LIST_ORDERS_FULFILLED = 'orders/listOrdersStatus/fulfilled';
const CREATE_ORDER_FULFILLED = 'orders/createOrderStatus/fulfilled';
const SET_SURRENDER_FULFILLED = 'surrenders/setSurrender/fulfilled';

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
    [CREATE_ORDER_FULFILLED]: (state, { payload }) => {
      const { oldOrder, ...newOrder } = payload;
      const { id: turnId } = newOrder.turn;
      const turn = state.entities[turnId];
      turn.orders = turn.orders.filter((o) => o !== oldOrder);
      turn.orders.push(newOrder.id);
      return state;
    },
    [SET_SURRENDER_FULFILLED]: (state, { payload }) => {
      const { turn, id } = payload;
      const turnToUpdate = state.entities[turn];
      turnToUpdate.surrenders.push(id);
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

export const turnSelectors = {
  ...adapterSelectors,
  selectGameCurrentTurn,
  selectByNationStateId,
};

export default turnSlice.reducer;
