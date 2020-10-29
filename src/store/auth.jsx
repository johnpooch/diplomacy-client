/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as API from '../api';
import { apiRequest, getOptions } from './api';

const userInStorage = JSON.parse(localStorage.getItem('user'));
const tokenInStorage = JSON.parse(localStorage.getItem('token'));

const forgotPassword = createAsyncThunk(
  'auth/forgotPasswordStatus',
  async (data, thunkApi) => {
    const url = API.PASSWORDRESET;
    const options = getOptions(null, 'POST', data);
    return apiRequest(url, options, thunkApi);
  }
);

const login = createAsyncThunk('auth/loginStatus', async (data, thunkApi) => {
  const url = API.LOGINURL;
  const options = getOptions(null, 'POST', data);
  return apiRequest(url, options, thunkApi);
});

const register = createAsyncThunk(
  'auth/registerStatus',
  async (data, thunkApi) => {
    const url = API.REGISTERURL;
    const options = getOptions(null, 'POST', data);
    return apiRequest(url, options, thunkApi);
  }
);

const resetPassword = createAsyncThunk(
  'auth/resetPasswordStatus',
  async (data, thunkApi) => {
    const url = API.PASSWORDRESETCONFIRM;
    const options = getOptions(null, 'POST', data);
    return apiRequest(url, options, thunkApi);
  }
);

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
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
};
