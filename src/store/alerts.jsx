/* eslint-disable no-param-reassign */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const alertAdapter = createEntityAdapter();

const getNextId = (state) => {
  return state.ids.length !== 0 ? state.ids[state.ids.length - 1] + 1 : 1;
};

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

const clearAndPromoteAlerts = (payload) => {
  return (dispatch) => {
    dispatch(alertsSlice.actions.alertsClearActive(payload));
    dispatch(alertsSlice.actions.alertsPromotePending(payload));
  };
};

export const alertActions = { ...alertsSlice.actions, clearAndPromoteAlerts };
export const alertSelectors = alertAdapter.getSelectors(
  (state) => state.alerts
);

export default alertsSlice.reducer;
