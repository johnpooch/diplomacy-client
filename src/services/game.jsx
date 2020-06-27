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

function getGame(token, id) {
  const headers = getHeaders(token);
  const url = API.GAMESTATEURL.replace('<int:game>', id);
  const options = { method: 'GET', headers };
  return fetch(url, options).then(handleResponse);
}

function joinGame(token, id) {
  const headers = getHeaders(token);
  const url = API.JOINGAMEURL.replace('<int:game>', id);
  const options = { method: 'PATCH', headers };
  return fetch(url, options).then(handleResponse);
}

function listPlayerOrders(token, id) {
  /* Get all of the orders that a player has created for the current turn */
  const headers = getHeaders(token);
  const url = API.LISTORDERSURL.replace('<int:game>', id);
  const options = { method: 'GET', headers };
  return fetch(url, options).then(handleResponse);
}

function retrievePrivateNationState(token, id) {
  const headers = getHeaders(token);
  const url = API.RETRIEVEPRIVATENATIONSTATE.replace('<int:game>', id);
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

function createOrder(token, gameId, data) {
  const url = API.CREATEORDERURL.replace('<int:game>', gameId);
  const headers = getHeaders(token);
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  };
  return fetch(url, options).then(handleResponse);
}

function destroyOrder(token, gameId, orderId) {
  let url = API.DESTROYORDERURL.replace('<int:game>', gameId);
  url = url.replace('<int:pk>', orderId);
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
  const url = API.FINALIZEORDERSURL.replace('<int:pk>', nationStateId);
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
