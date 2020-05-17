import { combineReducers } from 'redux';

import login from './login';
import register from './register';
import alerts from './alerts';

const rootReducer = combineReducers({
  login,
  register,
  alerts,
});

export default rootReducer;
