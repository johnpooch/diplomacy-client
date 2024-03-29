import namedCoastData from './data/standard/namedCoasts.json';
import { PieceTypeChoices } from './game/choices';
import { OrderType } from './game/types';
import { authActions } from './store/auth';
import { gameActions } from './store/games';
import { nationStateActions } from './store/nationStates';
import { orderActions } from './store/orders';
import { selectPieceByTerritory } from './store/selectors';
import { territorySelectors } from './store/territories';
import { turnSelectors } from './store/turns';

const getTargetCoastMessage = (targetCoast) => {
  return targetCoast ? ` (${targetCoast.abbreviation})` : '';
};

const holdMessage = ({ piece, source, type }) =>
  `${PieceTypeChoices[piece.type]} ${source.name} will ${type}`;
const moveMessage = ({ piece, source, target, targetCoast, type }) =>
  `${PieceTypeChoices[piece.type]} ${source.name} will ${type} to ${
    target.name
  }${getTargetCoastMessage(targetCoast)}`;
const supportMessage = ({ aux, piece, source, target, type }) =>
  `${PieceTypeChoices[piece.type]} ${source.name} will ${type} ${aux.name} to ${
    target.name
  }`;
const disbandMessage = ({ piece, source }) =>
  `${PieceTypeChoices[piece.type]} ${source.name} will be disbanded`;
const buildMessage = ({ source, pieceType, targetCoast }) =>
  `${PieceTypeChoices[pieceType]} will be built in ${
    source.name
  }${getTargetCoastMessage(targetCoast)}`;

export const orderTypeMessageMap = {
  [OrderType.HOLD]: holdMessage,
  [OrderType.MOVE]: moveMessage,
  [OrderType.SUPPORT]: supportMessage,
  [OrderType.CONVOY]: supportMessage,
  [OrderType.RETREAT]: moveMessage,
  [OrderType.BUILD]: buildMessage,
  [OrderType.DISBAND]: disbandMessage,
};

export default {
  [authActions.register.fulfilled]: {
    getMessage: (_, { payload }) =>
      `Account created! Welcome ${payload.user.username}`,
    pending: true,
  },
  [authActions.resetPassword.fulfilled]: {
    getMessage: (_, action) => {
      const { email } = action.meta.arg.data;
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
    getMessage: (_, { payload }) => {
      const { ordersFinalized } = payload;
      return ordersFinalized ? 'Orders finalized' : 'Orders un-finalized';
    },
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
      const targetCoast = namedCoastData.find(
        (ncd) => ncd.id === data.targetCoast
      );
      const piece = selectPieceByTerritory(state, source.id, turn.id);
      return orderTypeMessageMap[type]({
        aux,
        source,
        piece,
        pieceType,
        target,
        targetCoast,
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
