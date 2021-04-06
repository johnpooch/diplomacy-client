import { createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { alertActions } from './alerts';
import { errorMessages } from '../copy';

const re = /:([a-zA-z]+)/g;

export const getOptions = (token = null, method = 'GET', data = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  const options = { method, headers };
  if (['POST', 'PATCH', 'PUT'].includes(method)) {
    options.body = JSON.stringify(data);
  }
  return options;
};

const substituteUrlParams = (urlPattern, urlParams) => {
  const matches = [...urlPattern.matchAll(re)];
  let newUrl = urlPattern;
  matches.forEach((m) => {
    newUrl = newUrl.replace(m[0], urlParams[m[1]]);
  });
  return newUrl;
};

export const apiRequest = async (url, options, thunkApi, successMessage) => {
  const { dispatch, rejectWithValue } = thunkApi;
  const fullUrl = process.env.SERVICE_URI + url;
  try {
    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      throw response;
    }
    if (successMessage) {
      const category = 'success';
      const pending = false;
      dispatch(alertActions.alertsClearActive());
      dispatch(
        alertActions.alertsAdd({ message: successMessage, category, pending })
      );
    }
    // 204 and `response.json()` don't seem to get along
    if (response.status === 204) {
      return {};
    }
    const data = await response.json();
    return data;
  } catch (response) {
    // Logout if 401
    if (response.status === 401) {
      // NOTE using string to avoid import loop
      dispatch({ type: 'auth/authLogout' });
    }
    let data = {};
    if (response.status === 500) {
      data.non_field_errors = [errorMessages.internalServerError];
    } else if (response.status === 404) {
      data.non_field_errors = [errorMessages.notFound];
    } else {
      data = await response.json();
    }
    return rejectWithValue(data);
  }
};

export const apiAction = (urlConf) =>
  createAsyncThunk(
    `${urlConf.name}Status`,
    async ({ data, urlParams, queryParams }, thunkApi) => {
      const state = thunkApi.getState();
      const { token } = state.auth;
      let url = substituteUrlParams(urlConf.urlPattern, urlParams);
      const options = getOptions(token, urlConf.method, data);
      if (queryParams) {
        const queryParamsString = new URLSearchParams(queryParams).toString();
        url = url.concat(`?${queryParamsString}`);
      }
      const successMessage = urlConf.getSuccessMessage
        ? urlConf.getSuccessMessage(state, { data, urlParams, queryParams })
        : null;
      return apiRequest(url, options, thunkApi, successMessage);
    }
  );
