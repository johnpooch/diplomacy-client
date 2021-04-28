import {
  NamedCoast,
  Order,
  OrderAttr,
  OrderType,
  Piece,
  PieceType,
  Territory,
  TerritoryType,
} from './types';

const isCoastal = (territory: Territory): boolean =>
  territory.type === TerritoryType.COASTAL;
const isSea = (territory: Territory): boolean =>
  territory.type === TerritoryType.SEA;

const isArmy = (piece: Piece): boolean => piece.type === PieceType.ARMY;
const isFleet = (piece: Piece): boolean => piece.type === PieceType.FLEET;

const isHold = (order: Order): boolean => order.type === OrderType.HOLD;
const isBuild = (order: Order): boolean => order.type === OrderType.BUILD;
const isMove = (order: Order): boolean => order.type === OrderType.MOVE;
const isMoveOrRetreat = (order: Order): boolean =>
  [OrderType.MOVE, OrderType.RETREAT].includes(order.type);
const isSupportOrConvoy = (order: Order): boolean =>
  [OrderType.SUPPORT, OrderType.CONVOY].includes(order.type);

const areNeighbours = (t1: Territory, t2: Territory): boolean =>
  t1.neighbours.includes(t2.id);
const haveSharedCoast = (t1: Territory, t2: Territory): boolean =>
  t1.sharedCoasts.includes(t2.id);

export const pieceCanReachTerritory = (
  piece: Piece,
  source: Territory,
  target: Territory,
  isRetreat = false
): boolean => {
  if (isArmy(piece) && isCoastal(source) && isCoastal(target) && !isRetreat)
    return true;
  if (isFleet(piece) && isCoastal(source) && isCoastal(target))
    return haveSharedCoast(source, target);
  return areNeighbours(source, target);
};

export const checkMustSpecifyViaConvoy = (
  territories: { [key: string]: Territory },
  pieces: Piece[],
  piece: Piece,
  orderType: OrderType,
  t1: Territory,
  t2: Territory
): boolean => {
  if (
    isFleet(piece) ||
    !t1.neighbours.includes(t2.id) ||
    [t1, t2].find((t) => !isCoastal(t)) ||
    orderType !== OrderType.MOVE
  )
    return false;

  const sharedNeighbours = t1.neighbours
    .filter((t) => t !== t2.id)
    .map((t) => territories[t])
    .filter((t) => areNeighbours(t, t2));

  const seaNeighbourWithFleet = sharedNeighbours.find(
    (t) => isSea(t) && pieces.find((p) => p.territory === t.id && isFleet(p))
  );
  return Boolean(seaNeighbourWithFleet);
};

export const checkMustSpecifyTargetCoast = (
  territory: Territory,
  orderType: OrderType,
  pieceType: PieceType
): boolean =>
  [OrderType.MOVE, OrderType.BUILD].includes(orderType) &&
  pieceType === PieceType.FLEET &&
  Boolean(territory.namedCoasts.length);

export const requiresConvoy = (
  order: Order,
  t1: Territory,
  t2: Territory
): boolean => !areNeighbours(t1, t2) && isMove(order);

export const orderComplete = (
  order: Order,
  mustSpecifyViaConvoy: boolean,
  mustSpecifyTargetCoast: boolean
): boolean => {
  if (isBuild(order))
    return Boolean(
      order.pieceType && mustSpecifyTargetCoast === Boolean(order.targetCoast)
    );
  if (isHold(order)) return Boolean(order.source);
  if (isMoveOrRetreat(order)) {
    return Boolean(
      order.target &&
        mustSpecifyTargetCoast === Boolean(order.targetCoast) &&
        mustSpecifyViaConvoy === Boolean(order.viaConvoySelected)
    );
  }
  if (isSupportOrConvoy(order)) return Boolean(order.target && order.aux);
  return false;
};

export const getNextOrderAttribute = (
  order: Order,
  mustSpecifyViaConvoy: boolean,
  mustSpecifyTargetCoast: boolean
): OrderAttr => {
  if (!order.source) return OrderAttr.SOURCE;
  if (!order.type) return OrderAttr.TYPE;
  if (isBuild(order) && !order.pieceType) return OrderAttr.PIECE_TYPE;
  if (mustSpecifyTargetCoast) return OrderAttr.TARGET_COAST;
  if (mustSpecifyViaConvoy) return OrderAttr.VIA_CONVOY;
  if (isMoveOrRetreat(order) && !order.target) return OrderAttr.TARGET;
  if (isSupportOrConvoy(order) && !order.aux) return OrderAttr.AUX;
  if (isSupportOrConvoy(order) && !order.target) return OrderAttr.TARGET;
  throw Error(
    'This method should not be called if the order is already complete'
  );
};

export const getOrderTypeOptions = (
  territory: Territory,
  piece: Piece
): OrderType[] => {
  const options = [OrderType.HOLD, OrderType.MOVE, OrderType.SUPPORT];
  if (isFleet(piece) && isSea(territory)) options.push(OrderType.CONVOY);
  return options;
};

export const getPieceTypeOptions = (territory: Territory): PieceType[] => {
  return isCoastal(territory)
    ? [PieceType.ARMY, PieceType.FLEET]
    : [PieceType.ARMY];
};

export const getTargetCoastOptions = (
  territory: Territory,
  namedCoasts: { [key: string]: NamedCoast }
): NamedCoast[] => {
  return territory.namedCoasts.map((nc) => namedCoasts[nc]);
};

export const getViaConvoyOptions = (): boolean[] => [true, false];

export const canOrder = (piece: Piece | null, nation: string): boolean => {
  return Boolean(piece && piece.nation === nation);
};

export const canMoveTo = (source: Territory, target: Territory): boolean => {
  return source.id !== target.id;
};

export const canBuild = (
  territory: Territory,
  nation: string,
  piece?: Piece
): boolean => {
  return (
    territory.controlledBy === nation &&
    territory.nationality === nation &&
    territory.supplyCenter &&
    Boolean(!piece)
  );
};

export const canRetreat = (piece: Piece | null, nation: string): boolean => {
  return Boolean(piece && piece.mustRetreat && piece.nation === nation);
};

export const canRetreatTo = (
  piece: Piece,
  source: Territory,
  target: Territory
): boolean => {
  return pieceCanReachTerritory(piece, source, target, true);
};
