import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { turnSelectors } from './turns';
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
      const { id } = meta.arg;
      const changes = { loading: true };
      orderAdapter.updateOne(state, { id, changes });
    },
    [listOrders.fulfilled]: (state, { payload }) => {
      const changes = payload.map((o) => {
        o.loading = false;
        return o;
      });
      orderAdapter.upsertMany(state, changes);
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

const selectByTurnId = createSelector(
  turnSelectors.selectById,
  adapterSelectors.selectAll,
  (turn, orders) => orders.filter((o) => turn.orders.includes(o.id))
);

export const orderSelectors = {
  ...adapterSelectors,
  selectByTurnId,
};

export default ordersSlice.reducer;
