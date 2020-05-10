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

function create(token, data) {
  headers.Authorization = `token ${token}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  };
  return fetch(API.CREATEORDERURL, options).then(handleResponse);
}

const orderService = {
  create,
};

export default orderService;
