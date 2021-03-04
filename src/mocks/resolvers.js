import gameDetailData from './data/gameDetail.json';
import getGameFilterChoicesData from './data/gameFilterChoices.json';
import listGamesData from './data/games.json';
import listVariantsData from './data/variants.json';
import userData from './data/user.json';

import { errorMessages } from '../copy';

// TODO centralize expected error messages

const errorServerError = (_, res, ctx) => res(ctx.status(500));
const token =
  'faketokencdd6b6112b47176e410d1d6f0fc0a4b879286e5c93405ce89685929';

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
  errorServerError,
};

export const listVariants = {
  success: (_, res, ctx) => res(ctx.status(200), ctx.json(listVariantsData)),
  errorServerError,
};
