import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as API from '../../api';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    username,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('username');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const setLoggedIn = (token, username) => {
  // an hour from now
  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('username', username);
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(API.LOGINURL, {
        username,
        password,
      })
      .then((response) => {
        const { token } = response.data;
        setLoggedIn(token, username);
        dispatch(authSuccess(token, username));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const authSignup = (username, email, password) => {
  return (dispatch) => {
    console.log('hfahlfghalkfghalkfhglka  A');
    dispatch(authStart());
    console.log('kjsdhfgklsfhgklshfdlgshlkjdgfh ');
    axios
      .post(API.REGISTERURL, {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log('YEAHGHGHGHGHG');
        const { token } = response.data;
        setLoggedIn(token, username);
        console.log('AGGGHHH');
        dispatch(authSuccess(token, username));
        dispatch(checkAuthTimeout(3600));
        console.log('FINISHED');
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token === undefined || username === undefined) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, username));
    }
  };
};
