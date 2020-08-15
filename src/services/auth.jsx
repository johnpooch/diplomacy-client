import * as API from '../api';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

function handleResponse(response) {
  return response.json().then((json) => {
    const data = json;
    if (!response.ok) {
      const { status, statusText } = response;
      const message = json[Object.keys(json)[0]];
      const error = { status, statusText, message };
      return Promise.reject(error);
    }
    return data;
  });
}

function login(username, password) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };
  return fetch(API.LOGINURL, options)
    .then(handleResponse)
    .then((response) => {
      const { user, token } = response;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      return response;
    });
}

function register(username, email, password) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  };
  return fetch(API.REGISTERURL, options).then(handleResponse);
}

function passwordReset(email) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  };
  return fetch(API.PASSWORDRESET, options).then(handleResponse);
}

function passwordResetConfirm(password, token) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  };
  return fetch(API.PASSWORDRESETCONFIRM, options).then(handleResponse);
}

const authService = {
  login,
  logout,
  register,
  passwordReset,
  passwordResetConfirm,
};

export default authService;
