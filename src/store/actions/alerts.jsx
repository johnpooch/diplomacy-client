import { alertConstants } from './actionTypes';

function success(alert) {
  const { message } = alert;
  return {
    type: alertConstants.SUCCESS,
    message,
  };
}

function error(alert) {
  const { message } = alert;
  return {
    type: alertConstants.ERROR,
    message,
  };
}

function clear(id) {
  return {
    type: alertConstants.CLEAR,
    id,
  };
}

function clearAll() {
  return {
    type: alertConstants.CLEAR_ALL,
  };
}

const alertActions = {
  success,
  error,
  clear,
  clearAll,
};

export default alertActions;
