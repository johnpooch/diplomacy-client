const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== 'API_CALL_START') {
    return next(action);
  }
  const { url, method, data, onSuccess, onError } = action.payload;

  next(action);
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method,
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, options);
    const body = await response.json();
    return dispatch({ type: onSuccess, payload: body });
  } catch ({ message }) {
    return dispatch({ type: onError, payload: message });
  }
};

export default api;
