export const getOptions = (token = null, method = 'GET', data = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  const options = { method, headers };
  if (['POST', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(data);
  }
  return options;
};

export const apiRequest = async (url, options, { rejectWithValue }) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw response;
    }
    const data = await response.json();
    return data;
  } catch (response) {
    // Logout if 401
    if (response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    const data = await response.json();
    return rejectWithValue(data);
  }
};
