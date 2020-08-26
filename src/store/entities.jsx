import { combineReducers } from 'redux';
import flags from './flags';
import games from './games';
import territories from './territories';
import variants from './variants';

export default combineReducers({
  flags,
  games,
  territories,
  variants,
});
