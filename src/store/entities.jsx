import { combineReducers } from 'redux';

import drawResponses from './drawResponses';
import draws from './draws';
import gameDetail from './gameDetail';
import games from './games';
import namedCoasts from './namedCoasts';
import nations from './nations';
import nationStates from './nationStates';
import orders from './orders';
import pieces from './pieces';
import pieceStates from './pieceStates';
import surrenders from './surrenders';
import territories from './territories';
import territoryStates from './territoryStates';
import turns from './turns';
import users from './users';
import variants from './variants';

export default combineReducers({
  draws,
  drawResponses,
  gameDetail,
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
