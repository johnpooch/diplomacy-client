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

function clear() {
  return {
    type: alertConstants.CLEAR,
  };
}

const alertActions = {
  success,
  error,
  clear,
};

export default alertActions;
