import { OrderTypes } from './game/base';
import { authActions } from './store/auth';
import { gameActions } from './store/games';
import { nationStateActions } from './store/nationStates';
import { orderActions } from './store/orders';
import { selectPieceByTerritory } from './store/selectors';
import { territorySelectors } from './store/territories';
import { turnSelectors } from './store/turns';

const holdMessage = ({ piece, source, type }) =>
  `${piece.type} ${source.name} will ${type}`;
const moveMessage = ({ piece, source, target, type }) =>
  `${piece.type} ${source.name} will ${type} to ${target.name}`;
const supportMessage = ({ aux, piece, source, target, type }) =>
  `${piece.type} ${source.name} will ${type} ${aux.name} to ${target.name}`;
const buildMessage = ({ source, pieceType }) =>
  `${pieceType} will be built in ${source.name}`;

export const orderTypeMessageMap = {
  [OrderTypes.HOLD]: holdMessage,
  [OrderTypes.MOVE]: moveMessage,
  [OrderTypes.SUPPORT]: supportMessage,
  [OrderTypes.CONVOY]: supportMessage,
  [OrderTypes.RETREAT]: moveMessage,
  [OrderTypes.BUILD]: buildMessage,
};

export default {
  [authActions.register.fulfilled]: {
    getMessage: () => 'Account created! Log in to continue.',
    pending: true,
  },
  [authActions.resetPassword.fulfilled]: {
    getMessage: (_, action) => {
      const { data } = action.meta.arg;
      const { email } = data;
      return `Thanks! Please check ${email} for a link to reset your password.`;
    },
    pending: true,
  },
  [authActions.resetPasswordConfirm.fulfilled]: {
    getMessage: () => 'Password updated!',
    pending: true,
  },
  [authActions.changePassword.fulfilled]: {
    getMessage: () => 'Password updated!',
    pending: true,
  },
  [gameActions.createGame.fulfilled]: {
    getMessage: (_, action) => {
      const { data } = action.meta.arg;
      const { name } = data;
      return `Game "${name}" created!`;
    },
    pending: true,
  },
  [nationStateActions.finalizeOrders.fulfilled]: {
    getMessage: () => 'Orders finalized',
    pending: false,
  },
  [orderActions.createOrder.fulfilled]: {
    getMessage: (state, action) => {
      const { data } = action.meta.arg;
      const { pieceType, type } = data;
      const game = state.entities.gameDetail;
      const turn = turnSelectors
        .selectByGame(state, game.id)
        .find((t) => t.currentTurn);
      const aux = territorySelectors.selectById(state, data.aux);
      const source = territorySelectors.selectById(state, data.source);
      const target = territorySelectors.selectById(state, data.target);
      const piece = selectPieceByTerritory(state, source.id, turn.id);
      return orderTypeMessageMap[type]({
        aux,
        source,
        piece,
        pieceType,
        target,
        type,
      });
    },
    pending: false,
  },
  [orderActions.destroyOrder.fulfilled]: {
    getMessage: () => 'Order cancelled',
    pending: false,
  },
};
