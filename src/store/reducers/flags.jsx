import { flagConstants } from '../actions/actionTypes';

function getFlags(state = {}, action) {
  switch (action.type) {
    case flagConstants.FLAGS_REQUEST:
      return state;
    case flagConstants.FLAGS_SUCCESS:
      return action.data;
    case flagConstants.FLAGS_FAILURE:
      return {};
    default:
      return state;
  }
}

export default getFlags;
