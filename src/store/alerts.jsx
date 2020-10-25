/* eslint-disable no-param-reassign */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const alertAdapter = createEntityAdapter();

const getNextId = (state) =>
  state.ids.length !== 0 ? state[state.length - 1].id + 1 : 1;

const alertsSlice = createSlice({
  name: 'alert',
  initialState: alertAdapter.getInitialState(),
  reducers: {
    alertsAdd: (state, action) => {
      action.payload.id = getNextId(state);
      alertAdapter.addOne(state, action);
    },
    alertsClear: alertAdapter.removeOne,
    alertsClearActive: (state) => {
      const alertsToClear = state.ids.filter(
        (id) => state.entities[id].pending !== true
      );
      alertAdapter.removeMany(state, alertsToClear);
    },
    alertsClearAll: alertAdapter.removeAll,
    alertsPromotePending: (state) => {
      Object.values(state.entities).forEach((a) => {
        a.pending = false;
      });
    },
  },
});

export const alertActions = { ...alertsSlice.actions };
export const alertSelectors = alertAdapter.getSelectors(
  (state) => state.alerts
);

export default alertsSlice.reducer;
