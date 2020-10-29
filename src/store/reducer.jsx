import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import alerts from './alerts';
import choices from './choices';
import entities from './entities';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    alerts,
    choices,
    entities,
  });
