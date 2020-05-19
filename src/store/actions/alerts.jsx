import { alertConstants } from './actionTypes';

function add(alert) {
  const { message, category, pending } = alert;
  return {
    type: alertConstants.ADD,
    message,
    category,
    pending,
  };
}

function clear(id) {
  return {
    type: alertConstants.CLEAR,
    id,
  };
}

function clearActive() {
  return {
    type: alertConstants.CLEAR_ACTIVE,
  };
}

function clearAll() {
  return {
    type: alertConstants.CLEAR_ALL,
  };
}

function promotePending() {
  return {
    type: alertConstants.PROMOTE_PENDING,
  };
}

const alertActions = {
  add,
  clear,
  clearActive,
  clearAll,
  promotePending,
};

export default alertActions;
