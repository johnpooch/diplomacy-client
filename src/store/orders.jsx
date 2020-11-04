import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { turnSelectors } from './turns';

import * as API from '../api';
import { apiRequest, getOptions } from './api';

const listOrders = createAsyncThunk(
  'orders/listOrdersStatus',
  async ({ token, id }, thunkApi) => {
    const url = API.LISTORDERSURL.replace('<pk>', id);
    const options = getOptions(token);
    return apiRequest(url, options, thunkApi);
  }
);

const createOrder = createAsyncThunk(
  'orders/createOrderStatus',
  async ({ token, slug, data }, thunkApi) => {
    const url = API.CREATEORDERURL.replace('<game>', slug);
    const options = getOptions(token, 'POST', data);
    return apiRequest(url, options, thunkApi);
  }
);

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
    [listOrders.fulfilled]: orderAdapter.upsertMany,
    [createOrder.fulfilled]: (state, { payload }) => {
      const { old_order: oldOrder, ...newOrder } = payload;
      orderAdapter.removeOne(state, oldOrder);
      orderAdapter.addOne(state, newOrder);
    },
  },
});

export const orderActions = { ...ordersSlice.actions, createOrder, listOrders };

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
