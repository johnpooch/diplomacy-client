import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import login from './login';
import register from './register';
import alerts from './alerts';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login,
    register,
    alerts,
  });

export default createRootReducer;
