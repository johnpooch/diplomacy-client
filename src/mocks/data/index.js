import createGameData from './current/createGame.json';
import gamesData from './current/games.json';
import gameDetailData from './current/gameDetail.json';
import gameFilterChoicesData from './current/gameFilterChoices.json';
import joinGameData from './current/joinGame.json';
import orderData from './current/orders.json';
import userData from './current/user.json';
import variantsData from './current/variants.json';

const getCreateGameData = (statusCode) => {
  return statusCode === 201 ? createGameData : null;
};

const getJoinGameData = (statusCode) => {
  return statusCode === 200 ? joinGameData : null;
};

const getLoginData = (statusCode) => {
  if (statusCode === 200) {
    return {
      user: userData,
      token: 'faketokencdd6b6112b47176e410d1d6f0fc0a4b879286e5c93405ce89685929',
    };
  }
  if (statusCode === 400) {
    return {
      non_field_errors: [
        'The username or password you entered do not match an account. Please try again.',
      ],
    };
  }
  return null;
};

const getRegisterData = (statusCode) => {
  if (statusCode === 200) {
    return {
      user: userData,
      token: 'faketokencdd6b6112b47176e410d1d6f0fc0a4b879286e5c93405ce89685929',
    };
  }
  if (statusCode === 400) {
    // We should probably return different messages depending on given params
    return {
      email: ['user with this email address already exists.'],
    };
  }
  return null;
};

const getResetPasswordConfirm = (statusCode) => {
  if (statusCode === 400) {
    // We should probably return different messages depending on given params
    return {
      password: [
        'This password is too short. It must contain at least 8 characters.',
      ],
    };
  }
  return null;
};

const getFinalizeOrdersData = (statusCode, params) => {
  return statusCode === 200 ? { id: params.nationStateId } : null;
};

const getGamesData = (statusCode) => {
  return statusCode === 200 ? gamesData : null;
};

const getGameDetailData = (statusCode, params) => {
  return statusCode === 200 ? gameDetailData[params.gameSlug] : null;
};

const getGameFilterChoicesData = (statusCode) => {
  return statusCode === 200 ? gameFilterChoicesData : null;
};

const getOrderData = (statusCode, params) => {
  return statusCode === 200 ? orderData[params.turnId] : null;
};

const getVariantsData = (statusCode) => {
  return statusCode === 200 ? variantsData : null;
};

export default {
  getCreateGameData,
  getFinalizeOrdersData,
  getGameDetailData,
  getGameFilterChoicesData,
  getGamesData,
  getJoinGameData,
  getLoginData,
  getOrderData,
  getRegisterData,
  getResetPasswordConfirm,
  getVariantsData,
};
