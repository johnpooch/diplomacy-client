import { combineReducers } from 'redux';

import flags from './flags';
import games from './games';
import mapData from './mapData';
import namedCoasts from './namedCoasts';
import namedCoastData from './namedCoastData';
import nationStates from './nationStates';
import nations from './nations';
import territories from './territories';
import territoryData from './territoryData';
import turns from './turns';
import users from './users';
import variants from './variants';

export default combineReducers({
  flags,
  games,
  mapData,
  namedCoasts,
  namedCoastData,
  nationStates,
  nations,
  territories,
  territoryData,
  turns,
  users,
  variants,
});
