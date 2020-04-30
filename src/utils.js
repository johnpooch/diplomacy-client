import { createBrowserHistory } from 'history';

export function getObjectByKey(pk, objs, key = 'pk') {
  const id = parseInt(pk, 10);
  return objs.find((obj) => {
    return obj[key] === id;
  });
}

export const history = createBrowserHistory();

export function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
