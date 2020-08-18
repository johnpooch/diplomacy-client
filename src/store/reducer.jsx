import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import login from './reducers/login';
import register from './reducers/register';
import alerts from './alerts';
import flags from './reducers/flags';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    login,
    register,
    alerts,
    flags,
  });
