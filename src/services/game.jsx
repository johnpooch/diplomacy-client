import * as API from '../api';

function getHeaders(token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  return headers;
}

function handleResponse(response) {
  return response.json().then((json) => {
    const data = json;
    if (!response.ok) {
      throw new Error('Failed to connect to service');
    }
    // TODO if response is 401 token may have expired - log out?
    return data;
  });
}

function get(token, filters) {
  const headers = getHeaders(token);
  const options = { method: 'GET', headers };
  let url = API.ALLGAMESURL;
  if (filters) {
    const queryParams = new URLSearchParams(filters).toString();
    url = url.concat(`?${queryParams}`);
  }
  return fetch(url, options).then(handleResponse);
}

function getChoices() {
  const headers = getHeaders();
  const options = { method: 'GET', headers };
  return fetch(API.GAMEFILTERCHOICESURL, options).then(handleResponse);
}

function getCreateGameForm() {
  const headers = getHeaders();
  const options = { method: 'GET', headers };
  return fetch(API.CREATEGAMEURL, options).then(handleResponse);
}

function create(token, data) {
  const headers = getHeaders(token);
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  };
  return fetch(API.CREATEGAMEURL, options).then(handleResponse);
}

const gameService = {
  get,
  getChoices,
  getCreateGameForm,
  create,
  //   join,
};

export default gameService;
