import { API_REQUEST } from '../api';
import { authLogout } from '../auth';

function getHeaders(token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  return headers;
}

const api = ({ dispatch }) => (next) => (action) => {
  if (action.type === API_REQUEST) {
    const { method, url, token, onSuccess, onError } = action.meta;
    const headers = getHeaders(token);

    fetch(url, { method, headers })
      .then((response) => {
        // Throw exception if response is not okay
        if (!response.ok) {
          const { status, statusText } = response;
          const error = { status, statusText };
          return Promise.reject(error);
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: onSuccess, payload: data });
      })
      .catch((error) => {
        // Dispatch onError action
        dispatch({ type: onError, payload: error });

        // Dispatch authLogout if not authorized (token expired)
        if (error.status === 401) dispatch(authLogout());
      });
  }
  return next(action);
};

export default [api];
