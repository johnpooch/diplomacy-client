import {
  initialGameFormState,
  OrderTypeChoices,
  OrderTypes,
  PieceTypeChoices,
  PieceTypes,
  Phases,
} from '../src/game/base';
import GameInterface from '../src/game/gameInterface';
import BuildInterface from '../src/game/BuildInterface';
import DisbandInterface from '../src/game/DisbandInterface';
import RetreatInterface from '../src/game/RetreatInterface';
import { makeSelectTerritoryStateByMapDataId } from '../src/store/selectors';

let mockPostOrder;
let mockSetGameForm;

let ENGLISH_CHANNEL;
let LONDON;
let WALES;
let UNPLAYABLE;

let InterfaceClass;
let gameForm;
let state;
let turn;
let userNation;

const selectTerritoryStateById = makeSelectTerritoryStateByMapDataId();
const getTerritory = (id) => selectTerritoryStateById(state, id, turn.id);

const setUp = () => {
  mockPostOrder = jest.fn();
  mockSetGameForm = jest.fn();

  userNation = {
    id: 1,
    name: 'England',
    nation: 'standard-england',
    numBuilds: 0,
    numDisbands: 0,
    numOrders: 3,
    numSupplyCenters: 3,
    ordersFinalized: null,
    supplyDelta: 0,
    surrenders: [],
    user: 7,
  };

  turn = {
    currentTurn: true,
    draws: [],
    game: 1,
    id: 1,
    nationStates: [1],
    nextTurn: null,
    orders: [],
    phase: Phases.ORDER,
    pieceStates: [1],
    previousTurn: null,
    season: 'spring',
    territoryStates: [1],
    turnend: null,
    year: 1901,
  };

  state = {
    entities: {
      territories: {
        ids: ['standard-london', 'standard-wales', 'standard-english-channel'],
        entities: {
          'standard-london': {
            id: 'standard-london',
            name: 'london',
            namedCoasts: [],
            supplyCenter: true,
            type: 'coastal',
            nationality: 'standard-england',
          },
          'standard-wales': {
            id: 'standard-wales',
            name: 'wales',
            namedCoasts: [],
            supplyCenter: false,
            type: 'coastal',
            nationality: 'standard-england',
          },
          'standard-english-channel': {
            id: 'standard-english-channel',
            name: 'english channel',
            namedCoasts: [],
            supplyCenter: false,
            type: 'sea',
            nationality: null,
          },
        },
      },
      territoryStates: {
        ids: [1, 2],
        entities: {
          1: {
            id: 1,
            territory: 'standard-london',
            controlledBy: 'standard-england',
          },
          2: {
            id: 2,
            territory: 'standard-wales',
            controlledBy: 'standard-england',
          },
        },
      },
      turns: {
        entities: {
          1: {
            id: 1,
            game: 1,
            nextTurn: null,
            previousTurn: null,
            currentTurn: true,
            year: 1901,
            season: 'spring',
            phase: 'Order',
            turnend: null,
            territoryStates: [1],
          },
        },
      },
      pieceStates: {
        ids: [1],
        entities: {
          1: {
            id: 1,
            turn: 1,
            piece: 1,
            territory: 'standard-london',
            namedCoast: null,
            dislodged: false,
            dislodgedBy: null,
            attackerTerritory: null,
            mustRetreat: false,
          },
        },
      },
      pieces: {
        ids: [1],
        entities: {
          1: {
            id: 1,
            nation: 'standard-england',
            type: 'army',
          },
        },
      },
    },
  };

  gameForm = { ...initialGameFormState };

  LONDON = getTerritory('standard-london');
  WALES = getTerritory('standard-wales');
  ENGLISH_CHANNEL = getTerritory('standard-english-channel');
  UNPLAYABLE = getTerritory('standard-unplayable');
};

const getGameInterface = (form = null) =>
  new InterfaceClass(
    { postOrder: mockPostOrder },
    form || gameForm,
    mockSetGameForm,
    turn,
    userNation,
    state
  );

describe('Order Interface', () => {
  beforeEach(() => {
    InterfaceClass = GameInterface;
    setUp();
  });

  it('do not show context menu without source', async () => {
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(false);
    expect(gameInterface.getOptions()).toBe(null);
  });

  it('sets source on click territory', async () => {
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
    });
  });

  it('do nothing on click territory with no piece', async () => {
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(WALES);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });

  it('do nothing on click territory with foreign piece', async () => {
    state.entities.pieces.entities[1].nation = 'standard-france';
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });

  it('do nothing on click non-playable territory', async () => {
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(UNPLAYABLE);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });
  it('show context menu when source (army land, orders)', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(true);
    expect(gameInterface.getOptions()).toEqual([
      OrderTypeChoices.hold,
      OrderTypeChoices.move,
      OrderTypeChoices.support,
    ]);
  });
  it('show context menu when source (fleet land, orders)', async () => {
    gameForm.source = LONDON.id;
    state.entities.pieces.entities[1].type = PieceTypes.FLEET;
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(true);
    expect(gameInterface.getOptions()).toEqual([
      OrderTypeChoices.hold,
      OrderTypeChoices.move,
      OrderTypeChoices.support,
    ]);
  });
  it('show context menu when source (fleet sea, orders)', async () => {
    gameForm.source = ENGLISH_CHANNEL.id;
    state.entities.pieces.entities[1].type = PieceTypes.FLEET;
    state.entities.pieceStates.entities[1].territory = ENGLISH_CHANNEL.id;
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(true);
    expect(gameInterface.getOptions()).toEqual([
      OrderTypeChoices.hold,
      OrderTypeChoices.move,
      OrderTypeChoices.support,
      OrderTypeChoices.convoy,
    ]);
  });

  it('set source to null on click other territory before order type', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(WALES);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual(initialGameFormState);
  });
  it('set source to null on click same territory before order type', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual(initialGameFormState);
  });

  it('set order type and create order on click order type (hold)', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(OrderTypes.HOLD);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
      type: OrderTypes.HOLD,
    });
    // re-initialize interface to trigger postOrder
    getGameInterface({
      ...initialGameFormState,
      source: LONDON.id,
      type: OrderTypes.HOLD,
    });
    expect(mockPostOrder).toHaveBeenCalled();
  });
  it('set order type on click order type (move)', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(OrderTypes.MOVE);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
      type: OrderTypes.MOVE,
    });
  });
  it('set order type on click order type (support)', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(OrderTypes.SUPPORT);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
      type: OrderTypes.SUPPORT,
    });
  });
  it('set order type on click order type (convoy)', async () => {
    gameForm.source = ENGLISH_CHANNEL.id;
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(OrderTypes.CONVOY);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: ENGLISH_CHANNEL.id,
      type: OrderTypes.CONVOY,
    });
  });
  it('set target on click territory after order type choice (move)', async () => {
    gameForm.source = LONDON.id;
    gameForm.type = OrderTypes.MOVE;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(WALES);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
      target: WALES.id,
      type: OrderTypes.MOVE,
    });
  });
  it('post order once target (move)', async () => {
    getGameInterface({
      ...initialGameFormState,
      source: LONDON.id,
      target: WALES.id,
      type: OrderTypes.MOVE,
    });
    expect(mockPostOrder).toHaveBeenCalled();
  });
  it('set aux on click territory after order type choice (support)', async () => {
    gameForm.source = LONDON.id;
    gameForm.type = OrderTypes.SUPPORT;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(WALES);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      aux: WALES.id,
      source: LONDON.id,
      type: OrderTypes.SUPPORT,
    });
  });
  it('set target on click territory after target choice (support)', async () => {
    gameForm.source = LONDON.id;
    gameForm.aux = WALES.id;
    gameForm.type = OrderTypes.SUPPORT;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(WALES);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      aux: WALES.id,
      source: LONDON.id,
      target: WALES.id,
      type: OrderTypes.SUPPORT,
    });
  });
  it('set aux on click territory after order type choice (convoy)', async () => {
    gameForm.source = ENGLISH_CHANNEL.id;
    gameForm.type = OrderTypes.CONVOY;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(WALES);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      aux: WALES.id,
      source: ENGLISH_CHANNEL.id,
      type: OrderTypes.CONVOY,
    });
  });
  it('set target on click territory after target choice (convoy)', async () => {
    gameForm.source = ENGLISH_CHANNEL.id;
    gameForm.aux = LONDON.id;
    gameForm.type = OrderTypes.CONVOY;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(WALES);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      aux: LONDON.id,
      source: ENGLISH_CHANNEL.id,
      target: WALES.id,
      type: OrderTypes.CONVOY,
    });
  });
  it('post order once target (support)', async () => {
    getGameInterface({
      ...initialGameFormState,
      aux: WALES.id,
      source: LONDON.id,
      target: WALES.id,
      type: OrderTypes.SUPPORT,
    });
    expect(mockPostOrder).toHaveBeenCalled();
  });
  it('post order once target (convoy)', async () => {
    getGameInterface({
      ...initialGameFormState,
      aux: LONDON.id,
      source: ENGLISH_CHANNEL.id,
      target: LONDON.id,
      type: OrderTypes.CONVOY,
    });
    expect(mockPostOrder).toHaveBeenCalled();
  });
});

describe('Retreat Interface', () => {
  beforeEach(() => {
    InterfaceClass = RetreatInterface;
    state = {};
    setUp();
    // Set phase to retreat and set London piece to retreat
    state.entities.pieceStates.entities[1].mustRetreat = true;
    state.entities.turns.entities[1].phase = Phases.RETREAT;
  });

  it('do not show context menu without source', async () => {
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(false);
    expect(gameInterface.getOptions()).toBe(null);
  });

  it('set source on click territory with piece must retreat', async () => {
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
    });
  });

  it('do nothing on click territory with no piece', async () => {
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(WALES);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });

  it('do nothing on click territory with foreign piece', async () => {
    state.entities.pieces.entities[1].nation = 'standard-france';
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });

  it('do nothing on click territory with non retreating piece', async () => {
    state.entities.pieceStates.entities[1].mustRetreat = false;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });

  it('show context menu when source (army land, must retreat)', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(true);
    expect(gameInterface.getOptions()).toEqual([
      OrderTypeChoices.retreat,
      OrderTypeChoices.disband,
    ]);
  });
  it('show context menu when source (fleet land, must retreat)', async () => {
    gameForm.source = LONDON.id;
    state.entities.pieces.entities[1].type = PieceTypes.FLEET;
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(true);
    expect(gameInterface.getOptions()).toEqual([
      OrderTypeChoices.retreat,
      OrderTypeChoices.disband,
    ]);
  });
  it('show context menu when source (army land, no retreat)', async () => {
    gameForm.source = LONDON.id;
    state.entities.pieceStates.entities[1].mustRetreat = false;
    const gameInterface = getGameInterface();
    expect(gameInterface.getOptions()).toBeNull();
  });
});

describe('Build Interface', () => {
  beforeEach(() => {
    InterfaceClass = BuildInterface;
    state = {};
    setUp();
    state.entities.pieceStates.ids = [];
    state.entities.pieceStates.entities = {};
    userNation.supplyDelta = 1;
  });

  it('do not show context menu without source', async () => {
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(false);
  });

  it('set source on click empty home territory with supply center when surplus', async () => {
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
    });
  });
  it('do nothing on click empty controlled home territory without supply center when surplus', async () => {
    const gameInterface = getGameInterface();
    LONDON.supplyCenter = false;
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm).not.toBeCalled();
  });
  it('do nothing on click empty controlled non-home territory with supply center when surplus', async () => {
    const gameInterface = getGameInterface();
    LONDON.nationality = 'standard-france';
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm).not.toBeCalled();
  });
  it('do nothing on click home territory with supply center controlled by other nation when surplus', async () => {
    const gameInterface = getGameInterface();
    LONDON.controlledBy = 'standard-france';
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm).not.toBeCalled();
  });
  it('do nothing on click home territory with supply center with piece', async () => {
    state.entities.pieceStates = {
      ids: [1],
      entities: {
        1: {
          id: 1,
          turn: 1,
          piece: 1,
          territory: 'standard-london',
        },
      },
    };
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(mockSetGameForm).not.toBeCalled();
  });
  it('show army and fleet when source is coastal', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(gameInterface.getOptions()).toEqual([
      PieceTypeChoices[PieceTypes.ARMY],
      PieceTypeChoices[PieceTypes.FLEET],
    ]);
  });
  it('show army only when source is inland', async () => {
    gameForm.source = LONDON.id;
    state.entities.territories.entities[LONDON.id].type = 'inland';
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(LONDON);
    expect(gameInterface.getOptions()).toEqual([
      PieceTypeChoices[PieceTypes.ARMY],
    ]);
  });
  it('set piece type on click army', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(PieceTypes.ARMY);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
      pieceType: PieceTypes.ARMY,
      type: OrderTypes.BUILD,
    });
  });
  it('set piece type on click fleet', async () => {
    gameForm.source = LONDON.id;
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(PieceTypes.FLEET);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      ...initialGameFormState,
      source: LONDON.id,
      pieceType: PieceTypes.FLEET,
      type: OrderTypes.BUILD,
    });
  });
  it('post order once piece type is set', async () => {
    gameForm.source = LONDON.id;
    gameForm.type = OrderTypes.BUILD;
    gameForm.pieceType = PieceTypes.ARMY;
    getGameInterface();
    expect(mockPostOrder).toHaveBeenCalled();
  });
});

describe('Disband Interface', () => {
  beforeEach(() => {
    InterfaceClass = DisbandInterface;
    state = {};
    setUp();
    state.entities.pieceStates.ids = [];
    state.entities.pieceStates.entities = {};
    userNation.supplyDelta = 1;
  });

  it('set source on click territory with friendly piece deficit', async () => {});
  it('do nothing on click territory with foreign piece deficit', async () => {});
  it('do nothing on click empty home territory with supply center deficit', async () => {});
});

describe('Dummy interface', () => {});
