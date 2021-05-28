import { push } from 'connected-react-router';

import { alertActions } from './alerts';
import { authActions } from './auth';
import { gameDetailActions } from './gameDetail';
import { gameActions } from './games';
import { nationStateActions } from './nationStates';
import { orderActions } from './orders';
import { variantActions } from './variants';

const postLoadGameDetail = (dispatch, urlParams) => {
  dispatch(orderActions.listOrders({ urlParams }));
  dispatch(nationStateActions.getOrdersFinalized({ urlParams }));
  dispatch(nationStateActions.getOrdersStatus({ urlParams }));
};

const alertsClear = (props) => {
  return (dispatch) => {
    dispatch(alertActions.alertsClear(props));
  };
};

const cancelOrder = (turnId, orderId) => {
  return (dispatch) => {
    dispatch(orderActions.destroyOrder({ urlParams: { orderId } })).then(() => {
      dispatch(orderActions.listOrders({ urlParams: { turnId } }));
    });
  };
};

const createOrder = (gameSlug, turnId, data) => {
  return (dispatch) => {
    dispatch(orderActions.createOrder({ urlParams: { gameSlug }, data })).then(
      () => {
        dispatch(orderActions.listOrders({ urlParams: { turnId } }));
      }
    );
  };
};

const changePassword = (data) => {
  return (dispatch) => {
    dispatch(authActions.changePassword({ data })).then(() => {
      dispatch(push('/'));
    });
  };
};

const clearGameDetail = () => {
  return (dispatch) => {
    dispatch(gameDetailActions.clearGameDetail());
  };
};

const createGame = (data) => {
  return (dispatch) => {
    dispatch(gameActions.createGame({ data })).then(() => {
      dispatch(push('/'));
    });
  };
};

const finalizeOrders = (gameSlug, nationStateId) => {
  return (dispatch) => {
    dispatch(
      nationStateActions.finalizeOrders({ urlParams: { nationStateId } })
    ).then(() => {
      dispatch(gameActions.getGameDetail({ urlParams: { gameSlug } })).then(
        ({ payload }) => {
          const { id: turnId } = payload.turns.find(
            (t) => t.currentTurn === true
          );
          postLoadGameDetail(dispatch, { turnId });
        }
      );
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

const loadGameDetail = (gameSlug) => {
  return (dispatch) => {
    dispatch(variantActions.listVariants({})).then(() => {
      dispatch(gameActions.getGameDetail({ urlParams: { gameSlug } })).then(
        ({ payload }) => {
          const { id: turnId } = payload.turns.find(
            (t) => t.currentTurn === true
          );
          postLoadGameDetail(dispatch, { turnId });
        }
      );
    });
  };
};

const login = (data) => {
  return (dispatch) => {
    dispatch(authActions.login({ data }));
  };
};

const register = (data) => {
  return (dispatch) => {
    dispatch(authActions.register({ data }));
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

const setActiveTurn = (turnId) => {
  return (dispatch) => {
    dispatch(gameDetailActions.setActiveTurn(turnId));
  };
};

export default {
  alertsClear,
  cancelOrder,
  clearGameDetail,
  changePassword,
  createGame,
  createOrder,
  finalizeOrders,
  joinGame,
  leaveGame,
  loadBrowseGames,
  loadGameDetail,
  login,
  logout,
  register,
  resetPassword,
  resetPasswordConfirm,
  setActiveTurn,
};
