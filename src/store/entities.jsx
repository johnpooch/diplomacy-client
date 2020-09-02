import { combineReducers } from 'redux';

import flags from './flags';
import games from './games';
import mapData from './mapData';
import namedCoasts from './namedCoasts';
import namedCoastData from './namedCoastData';
import nationStates from './nationStates';
import nations from './nations';
import orders from './orders';
import pieces from './pieces';
import pieceStates from './pieceStates';
import territories from './territories';
import territoryData from './territoryData';
import territoryStates from './territoryStates';
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
  orders,
  pieces,
  pieceStates,
  territories,
  territoryData,
  territoryStates,
  turns,
  users,
  variants,
});
