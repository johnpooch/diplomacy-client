import authService from '../services/auth';

const userInStorage = JSON.parse(localStorage.getItem('user'));
const tokenInStorage = JSON.parse(localStorage.getItem('token'));

const AUTH_RECEIVED = 'AUTH_RECEIVED';
const AUTH_REQUESTED = 'AUTH_REQUESTED';
const AUTH_REQUEST_FAILED = 'AUTH_REQUEST_FAILED';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

// Action creators
export const authReceived = (user, token) => ({
  type: AUTH_RECEIVED,
  payload: {
    user,
    token,
  },
});

export const authRequested = () => ({
  type: AUTH_REQUESTED,
});

export const authRequestFailed = () => ({
  type: AUTH_REQUEST_FAILED,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

const initialState = userInStorage
  ? {
      loggedIn: true,
      user: userInStorage,
      token: tokenInStorage,
      loading: false,
    }
  : { loggedIn: false, user: {}, token: null, loading: false };

// Reducer
const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_RECEIVED: {
      const { payload } = action;
      const { user, token } = payload;
      return {
        user,
        token,
        loggedIn: true,
        loading: false,
      };
    }
    case AUTH_REQUESTED:
      return { ...state, loading: true };
    case AUTH_REQUEST_FAILED:
      return {
        loggedIn: false,
        user: {},
        token: null,
        loading: false,
      };
    case AUTH_LOGOUT:
      return {
        loggedIn: false,
        user: {},
        token: null,
      };
    default:
      return state;
  }
};

// Public actions
export const login = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTH_REQUESTED });
    authService.login(username, password).then(
      (payload) => {
        dispatch({ type: AUTH_RECEIVED, payload });
      },
      () => {
        dispatch({ type: AUTH_REQUEST_FAILED });
      }
    );
  };
};

export const register = (username, email, password) => {
  return (dispatch) => {
    dispatch({ type: AUTH_REQUESTED });

    authService.register(username, email, password).then(
      (payload) => {
        dispatch({ type: AUTH_RECEIVED, payload });
      },
      () => {
        dispatch({ type: AUTH_REQUEST_FAILED });
      }
    );
  };
};

export const logout = () => {
  return (dispatch) => {
    authService.logout();
    dispatch({ type: AUTH_LOGOUT });
  };
};

export default auth;
