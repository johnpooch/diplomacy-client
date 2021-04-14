import { OrderType, PieceType } from './types';

export const OrderTypeChoices = {
  [OrderType.HOLD]: 'Hold',
  [OrderType.MOVE]: 'Move',
  [OrderType.SUPPORT]: 'Support',
  [OrderType.CONVOY]: 'Convoy',
  [OrderType.RETREAT]: 'Retreat',
  [OrderType.BUILD]: 'Build',
  [OrderType.DISBAND]: 'Disband',
};

export const PieceTypeChoices = {
  [PieceType.ARMY]: 'Army',
  [PieceType.FLEET]: 'Fleet',
};

export const ViaConvoyChoices = {
  true: 'Via convoy',
  false: 'Via land',
};
