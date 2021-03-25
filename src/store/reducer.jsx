import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';

import auth from './auth';
import alerts from './alerts';
import choices from './choices';
import entities from './entities';
import errors from './errors';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    alerts,
    browser: responsiveStateReducer,
    choices,
    entities,
    errors,
  });
