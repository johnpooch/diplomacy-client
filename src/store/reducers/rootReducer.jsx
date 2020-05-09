import { combineReducers } from 'redux';

import login from './login';
import register from './register';
import alert from './alert';

const rootReducer = combineReducers({
  login,
  register,
  alert,
});

export default rootReducer;
