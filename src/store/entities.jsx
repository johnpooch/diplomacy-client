import { combineReducers } from 'redux';
import flags from './flags';
import games from './games';

export default combineReducers({
  flags,
  games,
});
