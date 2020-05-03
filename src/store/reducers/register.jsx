import { authConstants } from '../actions/actionTypes';

function register(state = {}, action) {
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return { registering: true };
    case authConstants.REGISTER_SUCCESS:
      return { registered: true };
    case authConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}

export default register;
