import { flagConstants } from '../actions/actionTypes';

const data = JSON.parse(localStorage.getItem('flags'));

const initialState = data || null;

function getFlags(state = initialState, action) {
  switch (action.type) {
    case flagConstants.FLAGS_SUCCESS:
      return action.data;
    case flagConstants.FLAGS_FAILURE:
      return {};
    default:
      return state;
  }
}

export default getFlags;
