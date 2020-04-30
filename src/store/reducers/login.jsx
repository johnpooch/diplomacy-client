import { authConstants } from '../actions/actionTypes';

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));

const initialState = user
  ? { loggedIn: true, user, token }
  : { loggedIn: false, user: {}, token: null };

// TODO use update
function login(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        token: action.token,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        user: {},
        token: null,
      };
    case authConstants.LOGOUT:
      return {
        loggedIn: false,
        user: {},
        token: null,
      };
    default:
      return state;
  }
}

export default login;
