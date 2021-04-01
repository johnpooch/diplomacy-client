/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import apiActions from './apiActions';

const {
  changePassword,
  login,
  register,
  resetPassword,
  resetPasswordConfirm,
} = apiActions;

const userInStorage = JSON.parse(localStorage.getItem('user'));
const tokenInStorage = JSON.parse(localStorage.getItem('token'));

const initialState = userInStorage
  ? {
      loggedIn: true,
      user: userInStorage,
      token: tokenInStorage,
      loading: false,
    }
  : { loggedIn: false, user: {}, token: null, loading: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: () => {
      return {
        loggedIn: false,
        user: {},
        token: null,
      };
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      return { user, token, loggedIn: true, loading: false };
    },
    [login.rejected]: () => {
      return {
        loggedIn: false,
        user: {},
        token: null,
      };
    },
  },
});

export default authSlice.reducer;

const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(authSlice.actions.authLogout());
  };
};

export const authActions = {
  ...authSlice.actions,
  changePassword,
  login,
  logout,
  register,
  resetPassword,
  resetPasswordConfirm,
};
