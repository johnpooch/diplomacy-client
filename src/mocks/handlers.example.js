/* Use this file to configure the behavior of the mock service worker during
 * development. Make sure that you are editing a local copy of the script
 * instead of the handers.example.js file.
 *
 * Each endpoint is configured using a 'handler'. You can customize the handler
 * configuration during development as you wish. You can change the behavior of
 * the endpoint using the following attributes:
 *
 * statusCode: Determines what status code the endpoint returns. Note that we
 * can adjust the data that is returned from the endpoint based on the
 * statusCode. Defaults to 200 if not specified.
 *
 * latency: Adds a delay to the response. Useful for testing loading screens or
 * simulating slow responses from the server. Defaults to 200 (ms).
 *
 * getData: A function which returns data for the endpoint. Should accept
 * statusCode and params as arguments.
 */

import { rest } from 'msw';
import data from './data';
import resolver from './resolver';
import { methods, urlConf } from '../urls';

const serviceURI = process.env.SERVICE_URI;

const restMethods = {
  [methods.DELETE]: rest.delete,
  [methods.GET]: rest.get,
  [methods.POST]: rest.post,
  [methods.PATCH]: rest.patch,
};

const DEFAULT_STATUS_CODE = 200;
const DEFAULT_LATENCY = 200;

const handlers = [
  {
    url: urlConf.login,
    getData: data.getLoginData,
  },
  {
    url: urlConf.register,
    getData: data.getRegisterData,
  },
  {
    url: urlConf.resetPassword,
  },
  {
    url: urlConf.resetPasswordConfirm,
    getData: data.getResetPasswordConfirm,
  },
  {
    url: urlConf.getGameFilterChoices,
    getData: data.getGameFilterChoicesData,
  },
  {
    url: urlConf.listGames,
    getData: data.getGamesData,
  },
  {
    url: urlConf.getGameDetail,
    getData: data.getGameDetailData,
  },
  {
    url: urlConf.listOrders,
    getData: data.getOrderData,
  },
  {
    url: urlConf.createOrder,
  },
  {
    url: urlConf.finalizeOrders,
    getData: data.getFinalizeOrdersData,
  },
  {
    url: urlConf.destroyOrder,
    statusCode: 204,
  },
  {
    url: urlConf.listVariants,
    getData: data.getVariantsData,
  },
  {
    url: urlConf.toggleSurrender,
    statusCode: 201,
  },
  {
    url: urlConf.createGame,
    getData: data.getCreateGameData,
    statusCode: 201,
  },
  {
    url: urlConf.joinGame,
    getData: data.getJoinGameData,
  },
];

export default Object.values(handlers).map(({ url, ...values }) => {
  const method = restMethods[url.method];
  const statusCode = values.statusCode
    ? values.statusCode
    : DEFAULT_STATUS_CODE;
  const latency = values.latency ? values.latency : DEFAULT_LATENCY;
  const { getData } = values;
  return method(
    `${serviceURI}${url.urlPattern}`,
    resolver({ statusCode, latency, getData })
  );
});
