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
    [listOrders.fulfilled]: (state, { payload }) => {
      const changes = payload.map((o) => {
        o.loading = false;
        return o;
      });
      orderAdapter.setAll(state, changes);
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
