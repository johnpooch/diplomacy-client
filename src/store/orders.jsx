import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import apiActions from './apiActions';

const { createOrder, destroyOrder, listOrders } = apiActions;

const orderAdapter = createEntityAdapter();

const ordersSlice = createSlice({
  name: 'order',
  initialState: orderAdapter.getInitialState(),
  reducers: {
    addOrder: orderAdapter.addOne,
    ordersReceived: orderAdapter.upsertMany,
    removeOrder: orderAdapter.removeOne,
  },
  extraReducers: {
    // Need to remove orders for this turn and set new ones
    [destroyOrder.pending]: (state, { meta }) => {
      const { orderId } = meta.arg.urlParams;
      const changes = { loading: true };
      orderAdapter.updateOne(state, { id: orderId, changes });
    },
    [destroyOrder.rejected]: (state, { meta }) => {
      const { orderId } = meta.arg.urlParams;
      const changes = { loading: false };
      orderAdapter.updateOne(state, { id: orderId, changes });
    },
    [listOrders.fulfilled]: (state, { meta, payload }) => {
      // Remove current turn orders before adding
      const { turnId } = meta.arg.urlParams;
      const ordersToRemove = Object.values(state.entities)
        .filter((o) => o.turn === turnId)
        .map((o) => o.id);
      orderAdapter.removeMany(state, ordersToRemove);

      const entities = payload.map((o) => {
        return { ...o, loading: false };
      });
      orderAdapter.addMany(state, entities);
    },
  },
});

export const orderActions = {
  ...ordersSlice.actions,
  createOrder,
  destroyOrder,
  listOrders,
};

const adapterSelectors = orderAdapter.getSelectors(
  (state) => state.entities.orders
);

export const orderSelectors = {
  ...adapterSelectors,
};

export default ordersSlice.reducer;
