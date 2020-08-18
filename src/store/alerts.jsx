import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    add: (alerts, action) => {
      const { message, category, pending } = action;
      alerts.push({
        message,
        category,
        pending,
      });
    },
    clear: (alerts, action) => {
      const { id } = action;
      return alerts.filter((alert) => {
        return alert.id !== id;
      });
    },
    clearActive: (alerts, action) => {
      return alerts.filter((alert) => {
        return alert.pending === true;
      });
    },
    clearAll: (alerts, action) => {
      return [];
    },
    promotePending: (alerts, action) => {
      const newAlerts = [];
      alerts.forEach((alert) => {
        const newAlert = alert;
        newAlert.pending = false;
        newAlerts.push(newAlert);
      });
      return alerts;
    },
  },
});

export const {
  add,
  clear,
  clearActive,
  clearAll,
  promotePending,
} = slice.actions;
export default slice.reducer;
