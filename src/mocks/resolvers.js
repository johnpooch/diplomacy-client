import { errorMessages } from '../copy';

import createGameData from './data/createGame.json';
import createOrderData from './data/createOrder.json';
import gameDetailData from './data/gameDetail.json';
import getGameFilterChoicesData from './data/gameFilterChoices.json';
import listGamesData from './data/games.json';
import orderData from './data/orders.json';
import moreOrderData from './data/orders2.json';
import userData from './data/user.json';
import listVariantsData from './data/variants.json';

// TODO centralize expected error messages

const errorServerError = (_, res, ctx) => res(ctx.status(500));
const errorUnauthorized = (_, res, ctx) => res(ctx.status(401));
const errorNotFound = (_, res, ctx) => res(ctx.status(404));
const token =
  'faketokencdd6b6112b47176e410d1d6f0fc0a4b879286e5c93405ce89685929';

export const changePassword = {
  success: (_, res, ctx) => res(ctx.status(200), ctx.json({})),
  errorIncorrectPassword: (_, res, ctx) => {
    const responseData = {
      current_password: [errorMessages.changePasswordIncorrectPassword],
    };
    return res(ctx.status(400), ctx.json(responseData));
  },
  errorPasswordsDoNotMatch: (_, res, ctx) => {
    const responseData = {
      non_field_errors: [errorMessages.changePasswordPasswordsDoNotMatch],
    };
    return res(ctx.status(400), ctx.json(responseData));
  },
  errorServerError,
};

export const createGame = {
  success: (_, res, ctx) => res(ctx.status(201), ctx.json(createGameData)),
  errorNameTooLong: (_, res, ctx) => {
    const responseData = {
      name: [errorMessages.createGameNameTooLong],
    };
    return res(ctx.status(400), ctx.json(responseData));
  },
  errorServerError,
};

export const createOrder = {
  success: (_, res, ctx) => res(ctx.status(201), ctx.json(createOrderData)),
  errorServerError,
};

export const destroyOrder = {
  success: (_, res, ctx) => res(ctx.status(204)),
  errorNotFound,
  errorServerError,
  randomizer: (_, res, ctx) => {
    if (Math.random() < 0.5) {
      return res(ctx.status(204));
    }
    return res(ctx.status(500));
  },
};

export const finalizeOrders = {
  success: (_, res, ctx) => res(ctx.status(201), ctx.json({})),
  errorServerError,
};

export const listOrders = {
  success: (_, res, ctx) => res(ctx.status(200), ctx.json(orderData)),
  successOneDeleted: (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Array.from(orderData).splice(1))),
  successMultiple: (_, res, ctx) =>
    res(ctx.status(200), ctx.json(moreOrderData)),
  errorServerError,
};

export const login = {
  success: (_, res, ctx) => {
    const responseData = {
      user: userData,
      token,
    };
    return res(ctx.status(200), ctx.json(responseData));
  },
  errorNoMatchingAccount: (_, res, ctx) => {
    const responseData = {
      non_field_errors: [errorMessages.loginNoMatchingAccount],
    };
    return res(ctx.status(400), ctx.json(responseData));
  },
  errorServerError,
};

export const register = {
  success: (_, res, ctx) => {
    const responseData = {
      user: userData,
      token,
    };
    return res(ctx.status(200), ctx.json(responseData));
  },
  errorUserWithEmailExists: (_, res, ctx) => {
    const responseData = {
      email: [errorMessages.registerEmailAlreadyExists],
    };
    return res(ctx.status(400), ctx.json(responseData));
  },
  errorUserWithUsernameExists: (_, res, ctx) => {
    const responseData = {
      email: [errorMessages.registerUsernameAlreadyExists],
    };
    return res(ctx.status(400), ctx.json(responseData));
  },
  errorServerError,
};

export const resetPassword = {
  success: (_, res, ctx) => res(ctx.status(200), ctx.json({})),
  errorNoMatchingAccount: (_, res, ctx) => {
    const responseData = {
      email: [errorMessages.resetPasswordNoAssociatedUser],
    };
    return res(ctx.status(400), ctx.json(responseData));
  },
  errorServerError,
};

export const resetPasswordConfirm = {
  success: (_, res, ctx) => res(ctx.status(200), ctx.json({})),
  errorServerError,
};

export const getGameDetail = {
  success: (req, res, ctx) =>
    res(ctx.status(200), ctx.json(gameDetailData[req.params.gameSlug])),
  errorServerError,
};

export const getGameFilterChoices = {
  success: (_, res, ctx) =>
    res(ctx.status(200), ctx.json(getGameFilterChoicesData)),
  errorServerError,
};

export const listGames = {
  success: (_, res, ctx) => res(ctx.status(200), ctx.json(listGamesData)),
  successPendingGame: (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(listGamesData.filter((g) => g.slug === 'new-game'))
    ),
  successActiveGame: (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(listGamesData.filter((g) => g.slug === 'first-turn'))
    ),
  errorUnauthorized,
  errorServerError,
};

export const listVariants = {
  success: (_, res, ctx) => res(ctx.status(200), ctx.json(listVariantsData)),
  errorServerError,
};
