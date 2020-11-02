import { combineReducers } from 'redux';

import games from './games';
import namedCoasts from './namedCoasts';
import nationStates from './nationStates';
import nations from './nations';
import orders from './orders';
import pieces from './pieces';
import pieceStates from './pieceStates';
import territories from './territories';
import territoryStates from './territoryStates';
import turns from './turns';
import users from './users';
import variants from './variants';

export default combineReducers({
  games,
  namedCoasts,
  nationStates,
  nations,
  orders,
  pieces,
  pieceStates,
  territories,
  territoryStates,
  turns,
  users,
  variants,
});
