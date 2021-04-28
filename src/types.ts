import { OrderType, Phase } from './game/types';

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
