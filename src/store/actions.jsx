import { push } from 'connected-react-router';

import { alertActions } from './alerts';
import { authActions } from './auth';
import { gameActions } from './games';
import { variantActions } from './variants';

const alertsClear = (props) => {
  return (dispatch) => {
    dispatch(alertActions.alertsClear(props));
  };
};

const changePassword = (data) => {
  return (dispatch) => {
    dispatch(authActions.changePassword({ data })).then(() => {
      dispatch(push('/'));
    });
  };
};

const createGame = (data) => {
  return (dispatch) => {
    dispatch(gameActions.createGame({ data })).then(() => {
      dispatch(push('/'));
    });
  };
};

const joinGame = (gameSlug) => {
  return (dispatch) => {
    dispatch(gameActions.joinGame({ urlParams: { gameSlug } })).then(
      ({ payload }) => {
        const { name } = payload;
        const message = `You have joined ${name}!`;
        dispatch(gameActions.listGames({}));
        dispatch(alertActions.alertsAdd({ message, category: 'success' }));
      }
    );
  };
};

const leaveGame = (gameSlug) => {
  return (dispatch) => {
    dispatch(gameActions.joinGame({ urlParams: { gameSlug } })).then(
      ({ payload }) => {
        const { name } = payload;
        const message = `You have left ${name}.`;
        dispatch(gameActions.listGames({}));
        dispatch(alertActions.alertsAdd({ message, category: 'success' }));
      }
    );
  };
};

const loadBrowseGames = () => {
  return (dispatch) => {
    dispatch(variantActions.listVariants({})).then(() => {
      dispatch(gameActions.listGames({}));
    });
  };
};

const login = (props) => {
  return (dispatch) => {
    dispatch(authActions.login(props));
  };
};

const logout = () => {
  return (dispatch) => {
    dispatch(authActions.logout());
  };
};

const resetPassword = (data) => {
  return (dispatch) => {
    dispatch(authActions.resetPassword({ data })).then(() => {
      dispatch(push('/login'));
    });
  };
};

const resetPasswordConfirm = (data) => {
  return (dispatch) => {
    dispatch(authActions.resetPasswordConfirm({ data })).then(() => {
      dispatch(push('/login'));
    });
  };
};

export default {
  alertsClear,
  changePassword,
  createGame,
  joinGame,
  leaveGame,
  loadBrowseGames,
  login,
  logout,
  resetPassword,
  resetPasswordConfirm,
};
