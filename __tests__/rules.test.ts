import {
  canBuild,
  canOrder,
  canRetreat,
  checkMustSpecifyTargetCoast,
  checkMustSpecifyViaConvoy,
  getNextOrderAttribute,
  getOrderTypeOptions,
  getPieceTypeOptions,
  orderComplete,
  pieceCanReachTerritory,
  requiresConvoy,
} from '../src/game/rules';
import {
  Order,
  OrderAttr,
  OrderType,
  Piece,
  PieceType,
  Territory,
  TerritoryType,
} from '../src/game/types';

const ADJACENT_TERRITORY = 'standard-adjacent-territory';
const AUX = 'standard-aux';
const ENGLAND = 'standard-england';
const FRANCE = 'standard-france';
const NAMED_COAST = 'standard-named-coast';
const SOURCE = 'standard-source';
const TARGET = 'standard-target';

const setNeighbours = (t1: Territory, t2: Territory) => {
  t1.neighbours.push(t2.id);
  t2.neighbours.push(t1.id);
};

const setSharedCoast = (t1: Territory, t2: Territory) => {
  t1.sharedCoasts.push(t2.id);
  t2.sharedCoasts.push(t1.id);
};

describe('pieceCanReachTerritory', () => {
  let source: Territory;
  let target: Territory;
  const army: Piece = {
    mustRetreat: false,
    nation: ENGLAND,
    territory: SOURCE,
    type: PieceType.ARMY,
  };
  const fleet: Piece = {
    mustRetreat: false,
    nation: ENGLAND,
    territory: SOURCE,
    type: PieceType.FLEET,
  };
  beforeEach(() => {
    source = {
      id: SOURCE,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.COASTAL,
    };
    target = {
      id: TARGET,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.COASTAL,
    };
  });

  it('true if territories are coastal neighbours and piece is army', () => {
    setNeighbours(source, target);
    expect(pieceCanReachTerritory(army, source, target)).toBe(true);
  });
  it('true if territories are inland neighbours and piece is army', () => {
    source.type = TerritoryType.INLAND;
    target.type = TerritoryType.INLAND;
    setNeighbours(source, target);
    expect(pieceCanReachTerritory(army, source, target)).toBe(true);
  });
  it('true if territories are inland and coastal neighbours and piece is army', () => {
    source.type = TerritoryType.COASTAL;
    target.type = TerritoryType.INLAND;
    setNeighbours(source, target);
    expect(pieceCanReachTerritory(army, source, target)).toBe(true);
  });
  it('true if territories are coastal and not neighbours and piece is army', () => {
    source.type = TerritoryType.COASTAL;
    target.type = TerritoryType.COASTAL;
    expect(pieceCanReachTerritory(army, source, target)).toBe(true);
  });
  it('false if territories are coastal and sea neighbours and piece is army', () => {
    target.type = TerritoryType.SEA;
    expect(pieceCanReachTerritory(army, source, target)).toBe(false);
  });
  it('false if territories are inland and not neighbours and piece is army', () => {
    source.type = TerritoryType.INLAND;
    target.type = TerritoryType.INLAND;
    expect(pieceCanReachTerritory(army, source, target)).toBe(false);
  });
  it('false if territories are inland and coastal not neighbours and piece is army', () => {
    source.type = TerritoryType.INLAND;
    target.type = TerritoryType.COASTAL;
    expect(pieceCanReachTerritory(army, source, target)).toBe(false);
  });
  it('true if territories are sea neighbours and piece is fleet', () => {
    source.type = TerritoryType.SEA;
    target.type = TerritoryType.SEA;
    setNeighbours(source, target);
    expect(pieceCanReachTerritory(fleet, source, target)).toBe(true);
  });
  it('true if territories are sea and coastal neighbours and piece is fleet', () => {
    source.type = TerritoryType.SEA;
    target.type = TerritoryType.COASTAL;
    setNeighbours(source, target);
    expect(pieceCanReachTerritory(fleet, source, target)).toBe(true);
  });
  it('true if territories are coastal neighbours and piece is fleet and shared coasts', () => {
    source.type = TerritoryType.COASTAL;
    target.type = TerritoryType.COASTAL;
    setNeighbours(source, target);
    setSharedCoast(source, target);
    expect(pieceCanReachTerritory(fleet, source, target)).toBe(true);
  });
  it('false if territories are coastal neighbours and piece is fleet and not shared coasts', () => {
    source.type = TerritoryType.COASTAL;
    target.type = TerritoryType.COASTAL;
    setNeighbours(source, target);
    expect(pieceCanReachTerritory(fleet, source, target)).toBe(false);
  });
  it('false if territories are coastal and not neighbours and piece is fleet', () => {
    source.type = TerritoryType.COASTAL;
    target.type = TerritoryType.COASTAL;
    expect(pieceCanReachTerritory(fleet, source, target)).toBe(false);
  });
});

describe('checkMustSpecifyViaConvoy', () => {
  let source: Territory;
  let target: Territory;
  let adjacentTerritory: Territory;
  let territories: { [key: string]: Territory };
  let pieces: Piece[];
  const army: Piece = {
    mustRetreat: false,
    nation: ENGLAND,
    territory: ADJACENT_TERRITORY,
    type: PieceType.ARMY,
  };
  const fleet: Piece = {
    mustRetreat: false,
    nation: ENGLAND,
    territory: ADJACENT_TERRITORY,
    type: PieceType.FLEET,
  };
  beforeEach(() => {
    source = {
      id: SOURCE,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.COASTAL,
    };
    target = {
      id: TARGET,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.COASTAL,
    };
    adjacentTerritory = {
      id: ADJACENT_TERRITORY,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: false,
      type: TerritoryType.SEA,
    };
    territories = {};
    pieces = [];
  });
  const callFunction = (
    orderType: OrderType = OrderType.MOVE,
    piece: Piece = army
  ) =>
    checkMustSpecifyViaConvoy(
      territories,
      pieces,
      piece,
      orderType,
      source,
      target
    );

  it('true if territories are coastal neighbours, piece is army, and adjacent territory has fleet and is sea', () => {
    setNeighbours(source, target);
    setNeighbours(source, adjacentTerritory);
    setNeighbours(target, adjacentTerritory);
    territories[ADJACENT_TERRITORY] = adjacentTerritory;
    pieces.push(fleet);
    expect(callFunction()).toBe(true);
  });
  it('false if territories are not neighbours', () => {
    setNeighbours(source, adjacentTerritory);
    setNeighbours(target, adjacentTerritory);
    territories[ADJACENT_TERRITORY] = adjacentTerritory;
    pieces.push(fleet);
    expect(callFunction()).toBe(false);
  });
  it('false if adjacent not shared neighbour', () => {
    setNeighbours(source, target);
    setNeighbours(source, adjacentTerritory);
    territories[ADJACENT_TERRITORY] = adjacentTerritory;
    pieces.push(fleet);
    expect(callFunction()).toBe(false);
  });
  it('false if adjacent not sea', () => {
    setNeighbours(source, target);
    setNeighbours(source, adjacentTerritory);
    setNeighbours(target, adjacentTerritory);
    adjacentTerritory.type = TerritoryType.COASTAL;
    territories[ADJACENT_TERRITORY] = adjacentTerritory;
    pieces.push(fleet);
    expect(callFunction()).toBe(false);
  });
  it('false if adjacent no fleet', () => {
    setNeighbours(source, target);
    setNeighbours(source, adjacentTerritory);
    setNeighbours(target, adjacentTerritory);
    territories[ADJACENT_TERRITORY] = adjacentTerritory;
    expect(callFunction()).toBe(false);
  });
  it('false if piece is fleet', () => {
    setNeighbours(source, target);
    setNeighbours(source, adjacentTerritory);
    setNeighbours(target, adjacentTerritory);
    territories[ADJACENT_TERRITORY] = adjacentTerritory;
    pieces.push(fleet);
    expect(callFunction(OrderType.MOVE, fleet)).toBe(false);
  });
  it('false if orderType is not move', () => {
    setNeighbours(source, target);
    setNeighbours(source, adjacentTerritory);
    setNeighbours(target, adjacentTerritory);
    territories[ADJACENT_TERRITORY] = adjacentTerritory;
    pieces.push(fleet);
    expect(callFunction(OrderType.SUPPORT)).toBe(false);
  });
});

describe('checkMustSpecifyTargetCoast', () => {
  let target: Territory;
  beforeEach(() => {
    target = {
      id: TARGET,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: false,
      type: TerritoryType.COASTAL,
    };
  });
  it('true if order is move and territory has named coasts', () => {
    target.namedCoasts.push(NAMED_COAST);
    expect(checkMustSpecifyTargetCoast(target, OrderType.MOVE)).toBe(true);
  });
  it('false if order is not move and territory has named coasts', () => {
    target.namedCoasts.push(NAMED_COAST);
    expect(checkMustSpecifyTargetCoast(target, OrderType.SUPPORT)).toBe(false);
  });
  it('false if order is move and territory does not have named coasts', () => {
    expect(checkMustSpecifyTargetCoast(target, OrderType.SUPPORT)).toBe(false);
  });
});

describe('requiresConvoy', () => {
  let order: Order;
  let source: Territory;
  let target: Territory;
  beforeEach(() => {
    source = {
      id: SOURCE,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.COASTAL,
    };
    target = {
      id: TARGET,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.COASTAL,
    };
    order = {
      type: OrderType.MOVE,
      viaConvoy: false,
      viaConvoySelected: false,
    };
  });
  it('true if territories are not neighbours and order is move', () => {
    expect(requiresConvoy(order, source, target)).toBe(true);
  });
  it('false if territories are not neighbours and order is not move', () => {
    order.type = OrderType.SUPPORT;
    expect(requiresConvoy(order, source, target)).toBe(false);
  });
  it('true if territories are neighbours and order is move', () => {
    setNeighbours(source, target);
    expect(requiresConvoy(order, source, target)).toBe(false);
  });
});

describe('orderComplete', () => {
  let order: Order;
  beforeEach(() => {
    order = {
      type: OrderType.MOVE,
      viaConvoy: false,
      viaConvoySelected: false,
    };
  });
  it('true if build, source and pieceType', () => {
    order.type = OrderType.BUILD;
    order.source = SOURCE;
    order.pieceType = PieceType.ARMY;
    expect(orderComplete(order, false, false)).toBe(true);
  });
  it('false if build and not pieceType', () => {
    order.type = OrderType.BUILD;
    order.source = SOURCE;
    expect(orderComplete(order, false, false)).toBe(false);
  });
  it('true if hold and source', () => {
    order.type = OrderType.HOLD;
    order.source = SOURCE;
    expect(orderComplete(order, false, false)).toBe(true);
  });
  it('false if hold and not source', () => {
    order.type = OrderType.HOLD;
    expect(orderComplete(order, false, false)).toBe(false);
  });
  it('true if move and source and target', () => {
    order.source = SOURCE;
    order.target = TARGET;
    expect(orderComplete(order, false, false)).toBe(true);
  });
  it('false if move and source source but not target', () => {
    order.source = SOURCE;
    expect(orderComplete(order, false, false)).toBe(false);
  });
  it('false if move and mustSpecifyTargetCoast and not targetCoast', () => {
    order.source = SOURCE;
    order.target = TARGET;
    expect(orderComplete(order, false, true)).toBe(false);
  });
  it('true if move and mustSpecifyTargetCoast and targetCoast', () => {
    order.source = SOURCE;
    order.target = TARGET;
    order.targetCoast = NAMED_COAST;
    expect(orderComplete(order, false, true)).toBe(true);
  });
  it('false if move and mustSpecifyViaConvoy and not viaConvoySelected', () => {
    order.source = SOURCE;
    order.target = TARGET;
    expect(orderComplete(order, true, false)).toBe(false);
  });
  it('true if move and mustSpecifyViaConvoy and viaConvoySelected', () => {
    order.source = SOURCE;
    order.target = TARGET;
    order.viaConvoySelected = true;
    expect(orderComplete(order, true, false)).toBe(true);
  });
  it('true if support and source, target, and aux', () => {
    order.type = OrderType.SUPPORT;
    order.source = SOURCE;
    order.target = TARGET;
    order.aux = AUX;
    expect(orderComplete(order, false, false)).toBe(true);
  });
  it('false if support and source and target but not aux', () => {
    order.type = OrderType.SUPPORT;
    order.source = SOURCE;
    order.target = TARGET;
    expect(orderComplete(order, false, false)).toBe(false);
  });
});

describe('getNextOrderAttribute', () => {
  let order: Order;
  beforeEach(() => {
    order = {
      viaConvoy: false,
      viaConvoySelected: false,
    };
  });
  it('source if source not selected', () => {
    expect(getNextOrderAttribute(order, false, false)).toBe(OrderAttr.SOURCE);
  });
  it('type if source and not type', () => {
    order.source = SOURCE;
    expect(getNextOrderAttribute(order, false, false)).toBe(OrderAttr.TYPE);
  });
  it('target if source and is move and not target', () => {
    order.source = SOURCE;
    order.type = OrderType.MOVE;
    expect(getNextOrderAttribute(order, false, false)).toBe(OrderAttr.TARGET);
  });
  it('target if source and is move and not target', () => {
    order.source = SOURCE;
    order.type = OrderType.MOVE;
    expect(getNextOrderAttribute(order, false, false)).toBe(OrderAttr.TARGET);
  });
  it('aux if source and is support and not aux', () => {
    order.source = SOURCE;
    order.type = OrderType.SUPPORT;
    expect(getNextOrderAttribute(order, false, false)).toBe(OrderAttr.AUX);
  });
  it('target if aux and is support and not target', () => {
    order.source = SOURCE;
    order.aux = AUX;
    order.type = OrderType.SUPPORT;
    expect(getNextOrderAttribute(order, false, false)).toBe(OrderAttr.TARGET);
  });
  it('targetCoast if mustSpecifyTargetCoast', () => {
    order.source = SOURCE;
    order.target = TARGET;
    order.type = OrderType.MOVE;
    expect(getNextOrderAttribute(order, false, true)).toBe(
      OrderAttr.TARGET_COAST
    );
  });
  it('viaConvoy if mustSpecifyViaConvoy', () => {
    order.source = SOURCE;
    order.target = TARGET;
    order.type = OrderType.MOVE;
    expect(getNextOrderAttribute(order, true, false)).toBe(
      OrderAttr.VIA_CONVOY
    );
  });
  it('exception if already complete', () => {
    order.source = SOURCE;
    order.target = TARGET;
    order.type = OrderType.MOVE;
    expect(() => getNextOrderAttribute(order, false, false)).toThrow(Error);
  });
});

describe('getOrderTypeOptions', () => {
  let army: Piece;
  let fleet: Piece;
  let territory: Territory;
  let orderTypes: string[];
  beforeEach(() => {
    territory = {
      id: SOURCE,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.INLAND,
    };
    army = {
      mustRetreat: false,
      nation: ENGLAND,
      territory: SOURCE,
      type: PieceType.ARMY,
    };
    fleet = {
      mustRetreat: false,
      nation: ENGLAND,
      territory: SOURCE,
      type: PieceType.FLEET,
    };
    orderTypes = [OrderType.HOLD, OrderType.MOVE, OrderType.SUPPORT];
  });
  it('hold, move, support if army', () => {
    expect(JSON.stringify(getOrderTypeOptions(territory, army))).toBe(
      JSON.stringify(orderTypes)
    );
  });
  it('hold, move, support if fleet on coast', () => {
    expect(JSON.stringify(getOrderTypeOptions(territory, fleet))).toBe(
      JSON.stringify(orderTypes)
    );
  });
  it('hold, move, support, and convoy if fleet on sea', () => {
    territory.type = TerritoryType.SEA;
    orderTypes.push(OrderType.CONVOY);
    expect(JSON.stringify(getOrderTypeOptions(territory, fleet))).toBe(
      JSON.stringify(orderTypes)
    );
  });
});

describe('getPieceTypeOptions', () => {
  let territory: Territory;
  let pieceTypes: PieceType[];
  beforeEach(() => {
    territory = {
      id: SOURCE,
      namedCoasts: [],
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.INLAND,
    };
    pieceTypes = [PieceType.ARMY];
  });
  it('army if not coastal', () => {
    expect(JSON.stringify(getPieceTypeOptions(territory))).toBe(
      JSON.stringify(pieceTypes)
    );
  });
  it('army and fleet if coastal', () => {
    territory.type = TerritoryType.COASTAL;
    pieceTypes.push(PieceType.FLEET);
    expect(JSON.stringify(getPieceTypeOptions(territory))).toBe(
      JSON.stringify(pieceTypes)
    );
  });
});

describe('canOrder', () => {
  let army: Piece;
  beforeEach(() => {
    army = {
      mustRetreat: false,
      nation: ENGLAND,
      territory: SOURCE,
      type: PieceType.ARMY,
    };
  });
  it('true if piece belongs to nation', () => {
    expect(canOrder(army, ENGLAND)).toBe(true);
  });
  it('false if piece belongs to other nation', () => {
    expect(canOrder(army, FRANCE)).toBe(false);
  });
  it('false if not piece', () => {
    army.mustRetreat = false;
    expect(canOrder(null, ENGLAND)).toBe(false);
  });
});

describe('canBuild', () => {
  let territory: Territory;
  const army: Piece = {
    mustRetreat: false,
    nation: ENGLAND,
    territory: SOURCE,
    type: PieceType.ARMY,
  };
  beforeEach(() => {
    territory = {
      id: SOURCE,
      controlledBy: ENGLAND,
      namedCoasts: [],
      nationality: ENGLAND,
      neighbours: [],
      sharedCoasts: [],
      supplyCenter: true,
      type: TerritoryType.INLAND,
    };
  });
  it('true if territory empty and controlled by nation and nationality is nation', () => {
    expect(canBuild(territory, ENGLAND, null)).toBe(true);
  });
  it('false if territory controlled by other nation', () => {
    territory.controlledBy = FRANCE;
    expect(canBuild(territory, ENGLAND, null)).toBe(false);
  });
  it('false if territory nationality other nation', () => {
    territory.nationality = FRANCE;
    expect(canBuild(territory, ENGLAND, null)).toBe(false);
  });
  it('false if piece', () => {
    expect(canBuild(territory, ENGLAND, army)).toBe(false);
  });
  it('false if not supply center', () => {
    territory.supplyCenter = false;
    expect(canBuild(territory, ENGLAND, army)).toBe(false);
  });
});

describe('canRetreat', () => {
  let army: Piece;
  beforeEach(() => {
    army = {
      mustRetreat: true,
      nation: ENGLAND,
      territory: SOURCE,
      type: PieceType.ARMY,
    };
  });
  it('true if piece must retreat and belongs to nation', () => {
    expect(canRetreat(army, ENGLAND)).toBe(true);
  });
  it('false if piece must retreat and belongs to other nation', () => {
    expect(canRetreat(army, FRANCE)).toBe(false);
  });
  it('false if not piece must retreat', () => {
    army.mustRetreat = false;
    expect(canRetreat(army, ENGLAND)).toBe(false);
  });
  it('false if not piece', () => {
    army.mustRetreat = false;
    expect(canRetreat(null, ENGLAND)).toBe(false);
  });
});
