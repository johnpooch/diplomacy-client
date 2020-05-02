import * as API from '../api';

// TODO make into class?
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
      if (status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }
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
  console.log(username, password, email);
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  };
  return fetch(API.REGISTERURL, options).then(handleResponse);
}

const authService = {
  login,
  logout,
  register,
};

export default authService;
