import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { turnSelectors } from './turns';

import { apiRequest, getOptions, urls } from './api';

const listOrders = createAsyncThunk(
  'orders/listOrdersStatus',
  async ({ token, id }, thunkApi) => {
    const url = urls.LIST_ORDERS.replace('<pk>', id);
    const options = getOptions(token);
    return apiRequest(url, options, thunkApi);
  }
);

const createOrder = createAsyncThunk(
  'orders/createOrderStatus',
  async ({ token, slug, data }, thunkApi) => {
    const url = urls.CREATE_ORDER.replace('<game>', slug);
    const options = getOptions(token, 'POST', data);
    return apiRequest(url, options, thunkApi);
  }
);

const destroyOrder = createAsyncThunk(
  'orders/destroyOrderStatus',
  async ({ token, slug, id }, thunkApi) => {
    const url = urls.DESTROY_ORDER.replace('<game>', slug).replace('<pk>', id);
    const options = getOptions(token, 'DELETE');
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
      const { oldOrder, ...newOrder } = payload;
      orderAdapter.removeOne(state, oldOrder);
      orderAdapter.addOne(state, newOrder);
    },
    [destroyOrder.fulfilled]: (state, { meta }) => {
      const { arg } = meta;
      const { id } = arg;
      orderAdapter.removeOne(state, id);
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
