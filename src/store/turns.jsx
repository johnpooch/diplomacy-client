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
  },
  extraReducers: {
    [LIST_ORDERS_FULFILLED]: (state, { payload, meta }) => {
      const { id: turnId } = meta.arg;
      const turn = state.entities[turnId];
      turn.orders = payload.map((o) => o.id);
      return state;
    },
    [CREATE_ORDER_FULFILLED]: (state, { payload }) => {
      const { old_order: oldOrder, ...newOrder } = payload;
      const { id: turnId } = newOrder.turn;
      const turn = state.entities[turnId];
      turn.orders = turn.orders.filter((o) => o !== oldOrder);
      turn.orders.push(newOrder.id);
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

export const turnSelectors = {
  ...adapterSelectors,
  selectGameCurrentTurn,
};

export default turnSlice.reducer;
