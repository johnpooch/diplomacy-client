import { push } from 'connected-react-router';

import { authConstants } from './actionTypes';
import authService from '../../services/auth';
import alertActions from './alerts';

function login(username, password) {
  return (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST, username });
    authService.login(username, password).then(
      (response) => {
        const { user, token } = response;
        dispatch({ type: authConstants.LOGIN_SUCCESS, user, token });
        dispatch(
          alertActions.add({
            message: 'Logged in. Welcome!',
            category: 'success',
            pending: true,
          })
        );
        dispatch(push('/'));
      },
      (error) => {
        dispatch({ type: authConstants.LOGIN_FAILURE });
        dispatch(
          alertActions.add({
            message: error.message,
            category: 'error',
          })
        );
      }
    );
  };
}

function register(username, email, password) {
  return (dispatch) => {
    dispatch({ type: authConstants.REGISTER_REQUEST });

    authService.register(username, email, password).then(
      () => {
        dispatch({ type: authConstants.REGISTER_SUCCESS });
        dispatch(
          alertActions.add({
            message: 'Created a new account. Please log in.',
            category: 'success',
            pending: true,
          })
        );
        dispatch(push('/login'));
      },
      (error) => {
        dispatch({ type: authConstants.REGISTER_FAILURE });
        dispatch(
          alertActions.add({
            message: error.message,
            category: 'error',
          })
        );
      }
    );
  };
}

function logout() {
  return (dispatch) => {
    authService.logout();
    dispatch({ type: authConstants.LOGOUT });
    dispatch(
      alertActions.add({
        message: 'Logged out.',
        category: 'success',
        pending: true,
      })
    );
    dispatch(push('/login'));
  };
}

const authActions = {
  login,
  logout,
  register,
};

export default authActions;
