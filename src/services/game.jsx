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

function getGame(token, slug) {
  const headers = getHeaders(token);
  const url = API.GAMESTATEURL.replace('<game>', slug);
  const options = { method: 'GET', headers };
  return fetch(url, options).then(handleResponse);
}

function joinGame(token, slug) {
  const headers = getHeaders(token);
  const url = API.JOINGAMEURL.replace('<game>', slug);
  const options = { method: 'PATCH', headers };
  return fetch(url, options).then(handleResponse);
}

function listPlayerOrders(token, slug) {
  /* Get all of the orders that a player has created for the current turn */
  const headers = getHeaders(token);
  const url = API.LISTORDERSURL.replace('<game>', slug);
  const options = { method: 'GET', headers };
  return fetch(url, options).then(handleResponse);
}

function retrievePrivateNationState(token, slug) {
  const headers = getHeaders(token);
  const url = API.RETRIEVEPRIVATENATIONSTATE.replace('<game>', slug);
  const options = { method: 'GET', headers };
  return fetch(url, options).then(handleResponse);
}

function getGames(token, filters) {
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

function createOrder(token, slug, data) {
  const url = API.CREATEORDERURL.replace('<game>', slug);
  const headers = getHeaders(token);
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  };
  return fetch(url, options).then(handleResponse);
}

function destroyOrder(token, slug, orderId) {
  let url = API.DESTROYORDERURL.replace('<game>', slug);
  url = url.replace('<pk>', orderId);
  const headers = getHeaders(token);
  const options = {
    method: 'DELETE',
    headers,
  };
  return fetch(url, options);
}

function toggleFinalizeOrders(token, nationStateId) {
  const headers = getHeaders(token);
  const options = { method: 'PUT', headers };
  const url = API.FINALIZEORDERSURL.replace('<pk>', nationStateId);
  return fetch(url, options).then(handleResponse);
}

const gameService = {
  getGame,
  getGames,
  getChoices,
  getCreateGameForm,
  create,
  createOrder,
  destroyOrder,
  joinGame,
  listPlayerOrders,
  retrievePrivateNationState,
  toggleFinalizeOrders,
};

export default gameService;
