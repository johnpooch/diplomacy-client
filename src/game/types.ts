export enum GameStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  ENDED = 'ended',
}

export enum OrderAttr {
  AUX = 'aux',
  PIECE_TYPE = 'pieceType',
  SOURCE = 'source',
  TARGET = 'target',
  TARGET_COAST = 'targetCoast',
  TYPE = 'type',
  VIA_CONVOY = 'viaConvoy',
}

export enum OrderType {
  HOLD = 'hold',
  MOVE = 'move',
  SUPPORT = 'support',
  CONVOY = 'convoy',
  DISBAND = 'disband',
  RETREAT = 'retreat',
  BUILD = 'build',
}

export enum Phase {
  ORDER = 'order',
  RETREAT = 'retreat',
  BUILD = 'build',
}

export enum PieceType {
  ARMY = 'army',
  FLEET = 'fleet',
}

export enum TerritoryType {
  INLAND = 'inland',
  COASTAL = 'coastal',
  SEA = 'sea',
}

export interface NamedCoast {
  id: string;
  name: string;
}

export interface Order {
  aux?: string;
  pieceType?: PieceType;
  source?: string;
  target?: string;
  targetCoast?: string;
  type?: OrderType;
  viaConvoy: boolean;
  viaConvoySelected: boolean;
}

export interface Piece {
  id: number;
  attackerTerritory: string | null;
  dislodged: boolean;
  dislodgedBy: number | null;
  mustRetreat: boolean;
  nation: string;
  namedCoast: string;
  territory: string;
  turn: number;
  type: PieceType;
}

export interface Territory {
  id?: string;
  controlledBy?: string;
  name: string;
  namedCoasts: string[];
  nationality?: string;
  neighbours: string[];
  sharedCoasts: string[];
  supplyCenter: boolean;
  type: TerritoryType;
}

export interface TerritoryMap {
  [key: string]: Territory;
}
