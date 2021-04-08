import { rest } from 'msw';
import { methods, urlConf } from '../urls';
import {
  changePassword,
  createGame,
  createOrder,
  destroyOrder,
  finalizeOrders,
  getGameDetail,
  getGameFilterChoices,
  listGames,
  listOrders,
  listVariants,
  login,
  register,
  resetPassword,
  resetPasswordConfirm,
} from './resolvers';

const serviceURI = process.env.SERVICE_URI;

export const restMethods = {
  [methods.DELETE]: rest.delete,
  [methods.GET]: rest.get,
  [methods.POST]: rest.post,
  [methods.PATCH]: rest.patch,
  [methods.PUT]: rest.put,
};

const handlers = [
  // Auth
  [urlConf.changePassword, changePassword.success],
  [urlConf.login, login.success],
  [urlConf.register, register.success],
  [urlConf.resetPassword, resetPassword.success],
  [urlConf.resetPasswordConfirm, resetPasswordConfirm.success],

  // Games
  [urlConf.createGame, createGame.success],
  [urlConf.getGameFilterChoices, getGameFilterChoices.success],
  [urlConf.listGames, listGames.success],
  [urlConf.listVariants, listVariants.success],

  // GameDetail
  [urlConf.createOrder, createOrder.success],
  [urlConf.destroyOrder, destroyOrder.success],
  [urlConf.finalizeOrders, finalizeOrders.success],
  [urlConf.getGameDetail, getGameDetail.success],
  [urlConf.listOrders, listOrders.success],
];

export default Object.values(handlers).map(([url, resolver]) => {
  const method = restMethods[url.method];
  return method(`${serviceURI}${url.urlPattern}`, resolver);
});
