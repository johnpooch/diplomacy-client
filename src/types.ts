import { Color } from '@material-ui/lab/Alert';

import { GameStatus, PieceType, OrderType, Phase } from './game/types';

export enum Outcome {
  MOVES = 'moves',
  RESOLVED = 'resolved',
  BOUNCED = 'bounced',
  AUX_FAILED = 'aux_failed',
  AUX_DOES_NOT_CORRESPOND = 'aux_does_not_correspond',
  SUCCEEDS = 'succeeds',
  GIVEN = 'given',
  FAILS = 'fails',
}

export type Alert = {
  id: number;
  message: string;
  category: Color;
};

export interface BrowseGame {
  id: number;
  joinable: boolean;
  name: string;
  participants: Participant[];
  rules: GameRules;
  slug: string;
  status: GameStatus;
  turn: TurnDisplay | null;
  userIsParticipant: boolean;
  variant: string;
}

export interface NationDisplay {
  id: string;
  name: string;
}

export interface NationOrderHistory {
  nation: NationDisplay;
  numSupplyCenters: number;
  orders: {
    order: OrderDisplay;
    outcome: OrderOutcomeDisplay;
  }[];
  username: string;
}

export interface GameRules {
  orderDeadline: string;
  retreatDeadline: string;
  buildDeadline: string;
}

export interface Participant {
  isCurrentUser: boolean;
  username: string;
  nation?: Nation;
}

export interface Nation {
  id: string;
  name: string;
  variant: string;
}

export interface NationState {
  id: number;
  nation: string;
  numBuilds: number;
  numDisbands: number;
  numOrders: number;
  numSupplyCenters: number;
  ordersFinalized: boolean | null;
  supplyDelta: number;
  surrenders: number[];
  user: number | null;
}

export interface Order {
  aux?: string;
  id: number;
  illegal: boolean;
  outcome: Outcome;
  nation: string;
  pieceType?: string;
  source: string;
  target?: string;
  targetCoast?: string;
  turn: number;
  type: OrderType;
  viaConvoy: boolean;
}

export interface OrderDisplay {
  id: number;
  aux: string | null;
  loading: boolean;
  orderType: OrderType;
  pieceType: PieceType;
  source: string;
  target: string | null;
  targetCoast: string | null;
}

export interface OrderOutcomeDisplay {
  outcome: string;
  message: string;
}

export interface TurnDisplay {
  phase: string;
  season: string;
  year: number;
}

export interface Turn {
  id: number;
  game: number;
  nextTurn: null | number;
  previousTurn: null | number;
  year: number;
  season: string;
  seasonDisplay: string;
  phase: Phase;
  phaseDisplay: string;
  orders: number[];
  draws: number[];
  turnEnd: null | string;
}
