import * as API from '../api';

function getHeaders(token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  return headers;
}

function handleResponse(response) {
  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to connect to service');
  }
  return response.json().then((json) => {
    // TODO if response is 401 token may have expired - log out?
    console.log(json);
    return json;
  });
}

function getGame(token, id) {
  const headers = getHeaders(token);
  const url = API.GAMESTATEURL.replace('<int:game>', id);
  const options = { method: 'GET', headers };
  return fetch(url, options).then(handleResponse);
}

function listPlayerOrders(token, id) {
  /* Get all of the orders that a player has created for the current turn */
  const headers = getHeaders(token);
  const url = API.LISTORDERSURL.replace('<int:game>', id);
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

function toggleFinalizeOrders(token) {
  const headers = getHeaders(token);
  const options = { method: 'GET', headers };
  return fetch(API.FINALIZEORDERSURL, options).then(handleResponse);
}

const gameService = {
  getGame,
  getGames,
  getChoices,
  getCreateGameForm,
  create,
  createOrder,
  listPlayerOrders,
  toggleFinalizeOrders,
};

export default gameService;
