import shortid from 'shortid';

import updateObject from '../utility';
import * as actionTypes from '../actions/actionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_FLASH_MESSAGE:
      return updateObject(state, {
        id: shortid.generate(),
        type: action.message.type,
        text: action.message.text,
      });
    default:
      return state;
  }
};
