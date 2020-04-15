import * as actionTypes from './actionTypes';
import * as API from '../../api';
import axios from 'axios';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  }
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(
      API.LOGINURL,
      {
        username: username,
        password: password,
      },
    ).then(response => {
      const token = response.data.token;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(token));
      dispatch(checkAuthTimeout(3600));
    }).catch(error => {
      dispatch(authFail(error));
    })
  }
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(
      API.REGISTERURL,
      {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      },
    ).then(response => {
      // TODO dedupe by moving to convenience method
      const token = response.data.token;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(token));
      dispatch(checkAuthTimeout(3600));
    }).catch(error => {
      dispatch(authFail(error));
    })
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
};
