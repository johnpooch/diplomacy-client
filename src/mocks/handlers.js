import { rest } from 'msw';
import { methods, urlConf } from '../urls';
import {
  getGameDetail,
  getGameFilterChoices,
  listGames,
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
};

const handlers = [
  // Auth
  [urlConf.login, login.success],
  [urlConf.register, register.success],
  [urlConf.resetPassword, resetPassword.success],
  [urlConf.resetPasswordConfirm, resetPasswordConfirm.success],
  // Games
  [urlConf.getGameDetail, getGameDetail.success],
  [urlConf.getGameFilterChoices, getGameFilterChoices.success],
  [urlConf.listGames, listGames.success],
  [urlConf.listVariants, listVariants.success],
];

export default Object.values(handlers).map(([url, resolver]) => {
  const method = restMethods[url.method];
  return method(`${serviceURI}${url.urlPattern}`, resolver);
});
