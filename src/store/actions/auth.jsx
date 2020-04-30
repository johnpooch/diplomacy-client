import { authConstants } from './actionTypes';
import authService from '../../services/auth';
import alertActions from './alert';
import { history } from '../../utils';

function login(username, password) {
  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user, token) {
    return { type: authConstants.LOGIN_SUCCESS, user, token };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request({ username }));

    authService.login(username, password).then(
      (response) => {
        const { user, token } = response;
        dispatch(success(user, token));
        history.push('/');
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function register(username, email, password) {
  function request(user) {
    return { type: authConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.REGISTER_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request({ username }));

    authService.register(username, email, password).then(
      () => {
        dispatch(success());
        dispatch(alertActions.success('Registration successful'));
        history.push('/login');
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}

const authActions = {
  login,
  logout,
  register,
};

export default authActions;
