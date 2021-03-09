import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorMessages } from '../copy';

const re = /:([a-zA-z]+)/g;

export const getOptions = (token = null, method = 'GET', data = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  const options = { method, headers };
  if (['POST', 'PATCH'].includes(method)) {
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

export const apiRequest = async (url, options, { rejectWithValue }) => {
  const fullUrl = process.env.SERVICE_URI + url;
  try {
    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      throw response;
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
      localStorage.removeItem('user');
      localStorage.removeItem('token');
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
      const { getState } = thunkApi;
      const { token } = getState().auth;
      let url = substituteUrlParams(urlConf.urlPattern, urlParams);
      const options = getOptions(token, urlConf.method, data);
      if (queryParams) {
        const queryParamsString = new URLSearchParams(queryParams).toString();
        url = url.concat(`?${queryParamsString}`);
      }
      return apiRequest(url, options, thunkApi);
    }
  );
