import * as API from '../api';

function getHeaders(token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  return headers;
}

function handleResponse(response) {
  if (!response.ok) {
    const { status, statusText } = response;
    const error = { status, statusText };
    return Promise.reject(error);
  }
  return response.json().then((data) => {
    return data;
  });
}

function listFlags() {
  const headers = getHeaders();
  const url = API.LISTNATIONFLAGSURL;
  const options = { method: 'GET', headers };
  return fetch(url, options).then(handleResponse);
}

const flagService = {
  listFlags,
};

export default flagService;
