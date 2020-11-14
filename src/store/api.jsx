const serviceURI = process.env.SERVICE_URI;

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
  const fullUrl = serviceURI + url;
  try {
    const response = await fetch(fullUrl, options);
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

export const urls = {
  ALL_GAMES: 'games',
  GAME_FILTER_CHOICES: 'game-filter-choices',
  CREATE_GAME: 'games/create',
  GAME_STATE: 'game/<game>',
  JOIN_GAME: 'game/<game>/join',
  CREATE_ORDER: 'game/<game>/order',
  DESTROY_ORDER: 'game/<game>/order/<pk>',
  LIST_ORDERS: 'game/<pk>/orders',
  RETRIEVE_PRIVATE_NATION_STATE: 'game/<game>/nation-state',
  FINALIZE_ORDERS: 'game/finalize/<pk>',
  SURRENDER: 'surrender/<turn>',
  LIST_VARIANTS: 'variants',
  PASSWORD_RESET: 'password_reset',
  PASSWORD_RESET_CONFIRM: 'password_reset/confirm',
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
};
