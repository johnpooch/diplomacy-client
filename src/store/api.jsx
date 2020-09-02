export const API_REQUEST = '[api] API Request';

export const apiRequest = (method, url, token, body, onSuccess, onError) => ({
  type: API_REQUEST,
  payload: body,
  meta: { method, url, token, onSuccess, onError },
});
