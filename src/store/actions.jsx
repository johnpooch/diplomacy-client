import { alertActions } from './alerts';
import { authActions } from './auth';
import { gameActions } from './games';
import { variantActions } from './variants';

const alertsClear = (props) => {
  return (dispatch) => {
    dispatch(alertActions.alertsClear(props));
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
  loadBrowseGames,
  logout,
};
