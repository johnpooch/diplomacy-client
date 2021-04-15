export const methods = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
};

const listGames = {
  name: 'listGames',
  method: methods.GET,
  urlPattern: 'games',
};
const getGameFilterChoices = {
  name: 'getGameFilterChoices',
  method: methods.GET,
  urlPattern: 'game-filter-choices',
};
const createGame = {
  name: 'createGame',
  method: methods.POST,
  urlPattern: 'games/create',
};
const getGameDetail = {
  name: 'getGameDetail',
  method: methods.GET,
  urlPattern: 'game/:gameSlug',
};
const joinGame = {
  name: 'joinGame',
  method: methods.PATCH,
  urlPattern: 'game/:gameSlug/join',
};
const createOrder = {
  name: 'createOrder',
  method: methods.POST,
  urlPattern: 'game/:gameSlug/order',
};
const destroyOrder = {
  name: 'destroyOrder',
  method: methods.DELETE,
  urlPattern: 'game/order/:orderId',
};
const listOrders = {
  name: 'listOrders',
  method: methods.GET,
  urlPattern: 'game/:turnId/orders',
};
const finalizeOrders = {
  name: 'finalizeOrders',
  method: methods.PATCH,
  urlPattern: 'game/finalize/:nationStateId',
};
const toggleSurrender = {
  name: 'toggleSurrender',
  method: methods.PATCH,
  urlPattern: 'surrender/:turnId',
};
const listVariants = {
  name: 'listVariants',
  method: methods.GET,
  urlPattern: 'variants',
};
const resetPassword = {
  name: 'resetPassword',
  method: methods.POST,
  urlPattern: 'password_reset/',
};
const resetPasswordConfirm = {
  name: 'resetPasswordConfirm',
  method: methods.POST,
  urlPattern: 'password_reset/confirm/',
};
const login = {
  name: 'login',
  method: methods.POST,
  urlPattern: 'auth/login',
};
const register = {
  name: 'register',
  method: methods.POST,
  urlPattern: 'auth/register',
};
const changePassword = {
  name: 'changePassword',
  method: methods.PUT,
  urlPattern: 'auth/change_password',
};
const cancelDrawResponse = {
  name: 'cancelDrawResponse',
  method: methods.DELETE,
  urlPattern: 'draw-response/:drawId/:responseId',
};
const setDrawResponse = {
  name: 'setDrawResponse',
  method: methods.POST,
  urlPattern: 'draw-response/:drawId',
};

export const urlConf = {
  cancelDrawResponse,
  changePassword,
  createGame,
  createOrder,
  destroyOrder,
  finalizeOrders,
  getGameDetail,
  getGameFilterChoices,
  joinGame,
  listGames,
  listOrders,
  listVariants,
  login,
  resetPassword,
  resetPasswordConfirm,
  register,
  setDrawResponse,
  toggleSurrender,
};
