import { authConstants } from './actionTypes';
import authService from '../../services/auth';
import alertActions from './alert';

function login(username, password, redirect) {
  return (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST, username });

    authService.login(username, password).then(
      (response) => {
        const { user, token } = response;
        dispatch({ type: authConstants.LOGIN_SUCCESS, user, token });
        console.log(redirect);
        redirect();
        dispatch(
          alertActions.success({ message: 'Logged in successfully. Welcome!' })
        );
      },
      (error) => {
        dispatch({ type: authConstants.LOGIN_FAILURE });
        dispatch(alertActions.error(error));
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
        dispatch(alertActions.success({ message: 'Registration successful!' }));
      },
      (error) => {
        dispatch({ type: authConstants.REGISTER_FAILURE });
        dispatch(alertActions.error(error));
      }
    );
  };
}

function logout() {
  return (dispatch) => {
    authService.logout();
    dispatch({ type: authConstants.LOGOUT });
    // message
  };
}

const authActions = {
  login,
  logout,
  register,
};

export default authActions;
