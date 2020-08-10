import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import login from './login';
import register from './register';
import alerts from './alerts';
import flags from './flags';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login,
    register,
    alerts,
    flags,
  });

export default createRootReducer;
