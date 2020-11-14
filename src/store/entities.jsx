import { combineReducers } from 'redux';

import games from './games';
import namedCoasts from './namedCoasts';
import nationStates from './nationStates';
import nations from './nations';
import orders from './orders';
import pieceStates from './pieceStates';
import pieces from './pieces';
import surrenders from './surrenders';
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
  pieceStates,
  pieces,
  surrenders,
  territories,
  territoryStates,
  turns,
  users,
  variants,
});
