import { alertActions } from './alerts';
import { authActions } from './auth';
import { gameActions } from './games';
import { variantActions } from './variants';

const alertsClear = (props) => {
  return (dispatch) => {
    dispatch(alertActions.alertsClear(props));
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
    dispatch(gameActions.listGames({}));
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
    dispatch(gameActions.listGames({}));
  };
};

const loadBrowseGames = () => {
  return (dispatch) => {
    dispatch(variantActions.listVariants({}));
    dispatch(gameActions.listGames({}));
  };
};

const logout = () => {
  return (dispatch) => {
    dispatch(authActions.logout());
  };
};

export default {
  alertsClear,
  joinGame,
  leaveGame,
  loadBrowseGames,
  logout,
};
