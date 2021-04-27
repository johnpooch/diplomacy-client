import Interpreter, { initialOrderState } from '../src/game/BaseInterpreter';
import BuildInterpreter from '../src/game/BuildInterpreter';
import { OrderTypeChoices, PieceTypeChoices } from '../src/game/choices';
import DisbandInterpreter from '../src/game/DisbandInterpreter';
import OrderInterpreter from '../src/game/OrderInterpreter';
import RetreatInterpreter from '../src/game/RetreatInterpreter';
import {
  Order,
  OrderType,
  PieceType,
  Piece,
  Territory,
  TerritoryType,
  NamedCoast,
} from '../src/game/types';

let mockCreateOrder: jest.Mock;
let mockSetOrder: jest.Mock;

let order: Order;
let nation: string;
let piece: Piece;
let namedCoast: NamedCoast;
let pieces: Piece[];
let territories: { [key: string]: Territory };
let namedCoasts: { [key: string]: NamedCoast };

const ENGLAND = 'standard-england';
const FRANCE = 'standard-france';
const ENGLISH_CHANNEL = 'standard-english-channel';
const LONDON = 'standard-london';
const WALES = 'standard-wales';
const NAMED_COAST = 'standard-named-coast';

let getInterpreter: () => Interpreter;
let InterpreterClass;

const setUp = () => {
  mockCreateOrder = jest.fn();
  mockSetOrder = jest.fn();
  order = { ...initialOrderState };
  nation = ENGLAND;
  piece = {
    id: 1,
    turn: 1,
    territory: LONDON,
    namedCoast: null,
    dislodged: false,
    dislodgedBy: null,
    attackerTerritory: null,
    mustRetreat: false,
    type: PieceType.ARMY,
    nation: ENGLAND,
  };
  pieces = [piece];
  territories = {
    [LONDON]: {
      id: LONDON,
      controlledBy: ENGLAND,
      name: 'london',
      namedCoasts: [],
      nationality: ENGLAND,
      neighbours: [WALES, ENGLISH_CHANNEL],
      sharedCoasts: [WALES],
      supplyCenter: true,
      type: TerritoryType.COASTAL,
    },
    [WALES]: {
      id: WALES,
      controlledBy: ENGLAND,
      name: 'wales',
      namedCoasts: [],
      neighbours: [LONDON, ENGLISH_CHANNEL],
      sharedCoasts: [LONDON],
      supplyCenter: false,
      type: TerritoryType.COASTAL,
      nationality: ENGLAND,
    },
    [ENGLISH_CHANNEL]: {
      id: ENGLISH_CHANNEL,
      name: 'english channel',
      namedCoasts: [],
      neighbours: [WALES, ENGLISH_CHANNEL],
      sharedCoasts: [],
      supplyCenter: false,
      type: TerritoryType.SEA,
      nationality: null,
      controlledBy: null,
    },
  };
  namedCoast = {
    id: NAMED_COAST,
    name: 'Named Coast',
  };
  namedCoasts = {
    [NAMED_COAST]: namedCoast,
  };

  getInterpreter = (): OrderInterpreter => {
    return new InterpreterClass(
      order,
      nation,
      territories,
      pieces,
      namedCoasts,
      mockCreateOrder,
      mockSetOrder
    );
  };
};

describe('Order Interpreter', () => {
  beforeEach(() => {
    InterpreterClass = OrderInterpreter;
    setUp();
  });

  it('do not show context menu without source', async () => {
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(false);
  });
  it('sets source on click territory', async () => {
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
    });
  });
  it('do nothing on click territory with no piece', async () => {
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[WALES]);
    expect(mockSetOrder.mock.calls).toEqual([]);
  });
  it('do nothing on click territory with foreign piece', async () => {
    pieces[0].nation = FRANCE;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder.mock.calls).toEqual([]);
  });
  // it('do nothing on click non-playable territory', async () => {
  //   const gameInterpreter = getInterpreter();
  //   gameInterpreter.onClickTerritory(UNPLAYABLE);
  //   expect(mockSetOrder.mock.calls).toEqual([]);
  // });
  it('show context menu when source (army land, orders)', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(true);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [OrderType.HOLD, OrderTypeChoices.hold],
      [OrderType.MOVE, OrderTypeChoices.move],
      [OrderType.SUPPORT, OrderTypeChoices.support],
    ]);
  });
  it('show context menu when source (fleet land, orders)', async () => {
    order.source = LONDON;
    pieces[0].type = PieceType.FLEET;
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(true);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [OrderType.HOLD, OrderTypeChoices.hold],
      [OrderType.MOVE, OrderTypeChoices.move],
      [OrderType.SUPPORT, OrderTypeChoices.support],
    ]);
  });
  it('show context menu when source (fleet sea, orders)', async () => {
    order.source = ENGLISH_CHANNEL;
    pieces[0].type = PieceType.FLEET;
    pieces[0].territory = ENGLISH_CHANNEL;
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(true);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [OrderType.HOLD, OrderTypeChoices.hold],
      [OrderType.MOVE, OrderTypeChoices.move],
      [OrderType.SUPPORT, OrderTypeChoices.support],
      [OrderType.CONVOY, OrderTypeChoices.convoy],
    ]);
  });
  it('set source to null on click other territory before order type', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[WALES]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual(initialOrderState);
  });
  it('set source to null on click same territory before order type', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual(initialOrderState);
  });

  it('set order type and create order on click order type (hold)', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickOption(OrderType.HOLD);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
      type: OrderType.HOLD,
    });
    // re-initialize interpreter to trigger postOrder
    order.source = LONDON;
    order.type = OrderType.HOLD;
    getInterpreter();
    expect(mockCreateOrder).toHaveBeenCalled();
  });

  it('set order type on click order type (move)', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickOption(OrderType.MOVE);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
      type: OrderType.MOVE,
    });
  });
  it('set order type on click order type (support)', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickOption(OrderType.SUPPORT);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
      type: OrderType.SUPPORT,
    });
  });
  it('set order type on click order type (convoy)', async () => {
    order.source = ENGLISH_CHANNEL;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickOption(OrderType.CONVOY);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: ENGLISH_CHANNEL,
      type: OrderType.CONVOY,
    });
  });
  it('set target on click territory after order type choice (move)', async () => {
    order.source = LONDON;
    order.type = OrderType.MOVE;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[WALES]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
      target: WALES,
      type: OrderType.MOVE,
    });
  });
  it('post order once target (move)', async () => {
    order.source = LONDON;
    order.target = WALES;
    order.type = OrderType.MOVE;
    getInterpreter();
    expect(mockCreateOrder).toHaveBeenCalled();
  });
  it('do not post order once target if complex and not target coast fleet (move)', async () => {
    order.source = LONDON;
    order.target = WALES;
    order.type = OrderType.MOVE;
    piece.type = PieceType.FLEET;
    territories[WALES].namedCoasts.push(NAMED_COAST);
    getInterpreter();
    expect(mockCreateOrder).not.toHaveBeenCalled();
  });
  it('post order once target if complex and not target coast army (move)', async () => {
    order.source = LONDON;
    order.target = WALES;
    order.type = OrderType.MOVE;
    piece.type = PieceType.ARMY;
    territories[WALES].namedCoasts.push(NAMED_COAST);
    getInterpreter();
    expect(mockCreateOrder).toHaveBeenCalled();
  });
  it('set aux on click territory after order type choice (support)', async () => {
    order.source = LONDON;
    order.type = OrderType.SUPPORT;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[WALES]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      aux: WALES,
      source: LONDON,
      type: OrderType.SUPPORT,
    });
  });
  it('set target on click territory after aux choice (support)', async () => {
    order.source = LONDON;
    order.aux = WALES;
    order.type = OrderType.SUPPORT;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[WALES]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      aux: WALES,
      source: LONDON,
      target: WALES,
      type: OrderType.SUPPORT,
    });
  });
  it('set aux on click territory after order type choice (convoy)', async () => {
    order.source = ENGLISH_CHANNEL;
    order.type = OrderType.CONVOY;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[WALES]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      aux: WALES,
      source: ENGLISH_CHANNEL,
      type: OrderType.CONVOY,
    });
  });
  it('set target on click territory after target choice (convoy)', async () => {
    order.source = ENGLISH_CHANNEL;
    order.aux = LONDON;
    order.type = OrderType.CONVOY;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[WALES]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      aux: LONDON,
      source: ENGLISH_CHANNEL,
      target: WALES,
      type: OrderType.CONVOY,
    });
  });
  it('post order once target (support)', async () => {
    order.aux = WALES;
    order.source = LONDON;
    order.target = ENGLISH_CHANNEL;
    order.type = OrderType.SUPPORT;
    getInterpreter();
    expect(mockCreateOrder).toHaveBeenCalled();
  });
  it('post order once target (convoy)', async () => {
    piece.territory = ENGLISH_CHANNEL;
    order.aux = WALES;
    order.source = ENGLISH_CHANNEL;
    order.target = LONDON;
    order.type = OrderType.CONVOY;
    getInterpreter();
    expect(mockCreateOrder).toHaveBeenCalled();
  });
});

describe('Retreat Interpreter', () => {
  beforeEach(() => {
    InterpreterClass = RetreatInterpreter;
    setUp();
    // Set phase to retreat and set London piece to retreat
    pieces[0].mustRetreat = true;
  });

  it('do not show context menu without source', async () => {
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(false);
  });

  it('set source on click territory with piece must retreat', async () => {
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
    });
  });

  it('do nothing on click territory with no piece', async () => {
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[WALES]);
    expect(mockSetOrder.mock.calls).toEqual([]);
  });

  it('do nothing on click territory with foreign piece', async () => {
    pieces[0].nation = 'standard-france';
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder.mock.calls).toEqual([]);
  });

  it('do nothing on click territory with non retreating piece', async () => {
    pieces[0].mustRetreat = false;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder.mock.calls).toEqual([]);
  });

  it('show context menu when source (army land, must retreat)', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(true);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [OrderType.RETREAT, OrderTypeChoices.retreat],
      [OrderType.DISBAND, OrderTypeChoices.disband],
    ]);
  });
  it('show context menu when source (fleet land, must retreat)', async () => {
    order.source = LONDON;
    pieces[0].type = PieceType.FLEET;
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(true);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [OrderType.RETREAT, OrderTypeChoices.retreat],
      [OrderType.DISBAND, OrderTypeChoices.disband],
    ]);
  });
});

describe('Build Interpreter', () => {
  beforeEach(() => {
    InterpreterClass = BuildInterpreter;
    setUp();
    pieces = [];
  });

  it('do not show context menu without source', async () => {
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(false);
  });

  it('set source and type on click empty home territory with supply center when surplus', async () => {
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
      type: OrderType.BUILD,
    });
  });
  it('do nothing on click empty controlled home territory without supply center when surplus', async () => {
    const gameInterpreter = getInterpreter();
    territories[LONDON].supplyCenter = false;
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder).not.toBeCalled();
  });
  it('do nothing on click empty controlled non-home territory with supply center when surplus', async () => {
    const gameInterpreter = getInterpreter();
    territories[LONDON].nationality = 'standard-france';
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder).not.toBeCalled();
  });
  it('do nothing on click home territory with supply center controlled by other nation when surplus', async () => {
    const gameInterpreter = getInterpreter();
    territories[LONDON].controlledBy = 'standard-france';
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder).not.toBeCalled();
  });
  it('do nothing on click home territory with supply center with piece', async () => {
    pieces = [piece];
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder).not.toBeCalled();
  });
  it('show army and fleet when source is coastal', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [PieceType.ARMY, PieceTypeChoices[PieceType.ARMY]],
      [PieceType.FLEET, PieceTypeChoices[PieceType.FLEET]],
    ]);
  });
  it('show named coasts when source is complex and pieceType is fleet', async () => {
    territories[LONDON].namedCoasts.push(NAMED_COAST);
    order.source = LONDON;
    order.type = OrderType.BUILD;
    order.pieceType = PieceType.FLEET;
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(true);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [namedCoast.id, namedCoast.name],
    ]);
  });
  it('show army only when source is inland', async () => {
    order.source = LONDON;
    territories[LONDON].type = TerritoryType.INLAND;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [PieceType.ARMY, PieceTypeChoices[PieceType.ARMY]],
    ]);
  });
  it('set piece type on click army', async () => {
    order.source = LONDON;
    order.type = OrderType.BUILD;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickOption(PieceType.ARMY);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
      pieceType: PieceType.ARMY,
      type: OrderType.BUILD,
    });
  });
  it('set piece type on click fleet', async () => {
    order.source = LONDON;
    order.type = OrderType.BUILD;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickOption(PieceType.FLEET);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
      pieceType: PieceType.FLEET,
      type: OrderType.BUILD,
    });
  });
  it('post order once piece type is set', async () => {
    order.source = LONDON;
    order.type = OrderType.BUILD;
    order.pieceType = PieceType.ARMY;
    getInterpreter();
    expect(mockCreateOrder).toHaveBeenCalled();
  });
  it('do not post order once piece type is set if complex and fleet', async () => {
    order.source = LONDON;
    territories[LONDON].namedCoasts.push(NAMED_COAST);
    order.type = OrderType.BUILD;
    order.pieceType = PieceType.FLEET;
    getInterpreter();
    expect(mockCreateOrder).not.toHaveBeenCalled();
  });
  it('post order once piece type is set if complex and army', async () => {
    order.source = LONDON;
    territories[LONDON].namedCoasts.push(NAMED_COAST);
    order.type = OrderType.BUILD;
    order.pieceType = PieceType.ARMY;
    getInterpreter();
    expect(mockCreateOrder).toHaveBeenCalled();
  });
});

describe('Disband Interpreter', () => {
  beforeEach(() => {
    InterpreterClass = DisbandInterpreter;
    setUp();
  });

  it('set source on click territory with friendly piece deficit', async () => {
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder.mock.calls[0][0]).toEqual({
      ...initialOrderState,
      source: LONDON,
    });
  });
  it('do nothing on click territory with foreign piece deficit', async () => {
    pieces[0].nation = FRANCE;
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder).not.toHaveBeenCalled();
  });
  it('do nothing on click empty territory with supply center deficit', async () => {
    pieces = [];
    const gameInterpreter = getInterpreter();
    gameInterpreter.onClickTerritory(territories[LONDON]);
    expect(mockSetOrder).not.toHaveBeenCalled();
  });
  it('show context menu when source', async () => {
    order.source = LONDON;
    const gameInterpreter = getInterpreter();
    expect(gameInterpreter.showContextMenu()).toBe(true);
    expect(gameInterpreter.getContextMenuOptions()).toEqual([
      [OrderType.DISBAND, OrderTypeChoices.disband],
    ]);
  });
});
