import * as API from '../api';

const headers = { 'Content-Type': 'application/json' };

function handleResponse(response) {
  return response.json().then((json) => {
    const data = json;
    if (!response.ok) {
      throw new Error('Failed to connect to service');
    }
    return data;
  });
}

function get(filters) {
  const options = { method: 'GET', headers };
  let url = API.ALLGAMESURL;
  if (filters) {
    const queryParams = new URLSearchParams(filters).toString();
    url = url.concat(`?${queryParams}`);
  }
  return fetch(url, options).then(handleResponse);
}

function getChoices() {
  const options = { method: 'GET', headers };
  return fetch(API.GAMEFILTERCHOICESURL, options).then(handleResponse);
}

function getCreateGameForm() {
  const options = { method: 'GET', headers };
  return fetch(API.CREATEGAMEURL, options).then(handleResponse);
}

function create(token, data) {
  headers.Authorization = `token ${token}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  };
  return fetch(API.CREATEGAMEURL, options).then(handleResponse);
}

function createOrder(token, data) {
  headers.Authorization = `token ${token}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  };
  return fetch(API.CREATEORDERURL, options).then(handleResponse);
}

function finalizeOrders(token) {
  headers.Authorization = `token ${token}`;
  const options = { method: 'GET', headers };
  return fetch(API.FINALIZEORDERSURL, options).then(handleResponse);
}

function unfinalizeOrders(token) {
  headers.Authorization = `token ${token}`;
  const options = { method: 'GET', headers };
  return fetch(API.UNFINALIZEORDERSURL, options).then(handleResponse);
}

const gameService = {
  get,
  getChoices,
  getCreateGameForm,
  create,
  createOrder,
  finalizeOrders,
  unfinalizeOrders,
};

export default gameService;
