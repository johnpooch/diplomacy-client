import { OrderTypeChoices, OrderTypes, PieceTypes } from '../src/game/base';
import GameInterface from '../src/game/gameInterface';
import { makeSelectTerritoryStateByMapDataId } from '../src/store/selectors';

describe('Order phase', () => {
  let turn;
  let gameForm;
  let state;
  const userNation = {
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
  let mockPostOrder;
  let mockSetGameForm;

  beforeEach(() => {
    mockPostOrder = jest.fn();
    mockSetGameForm = jest.fn();

    // Set up basic data
    turn = {
      currentTurn: true,
      draws: [],
      game: 1,
      id: 1,
      nationStates: [1],
      nextTurn: null,
      orders: [],
      phase: 'Order',
      pieceStates: [1],
      previousTurn: null,
      season: 'spring',
      territoryStates: [1],
      turnend: null,
      year: 1901,
    };
    gameForm = {
      action: null,
      aux: null,
      nation: null,
      source: null,
      target: null,
      targetCoast: null,
      type: null,
    };
    state = {
      entities: {
        territories: {
          ids: [
            'standard-london',
            'standard-wales',
            'standard-english-channel',
          ],
          entities: {
            'standard-london': {
              id: 'standard-london',
              name: 'london',
              namedCoasts: [],
              supplyCenter: true,
              type: 'coastal',
            },
            'standard-wales': {
              id: 'standard-wales',
              name: 'wales',
              namedCoasts: [],
              supplyCenter: false,
              type: 'coastal',
            },
            'standard-english-channel': {
              id: 'standard-english-channel',
              name: 'english channel',
              namedCoasts: [],
              supplyCenter: false,
              type: 'sea',
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
              type: 'fleet',
            },
          },
        },
      },
    };
  });

  const getGameInterface = (form = null) =>
    new GameInterface(
      { postOrder: mockPostOrder },
      form || gameForm,
      mockSetGameForm,
      turn,
      userNation,
      state
    );

  const selectTerritoryStateById = makeSelectTerritoryStateByMapDataId();

  it('do not show context menu without source', async () => {
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(false);
  });

  it('no order type options without source', async () => {
    const gameInterface = getGameInterface();
    expect(gameInterface.getOptions()).toBe(null);
  });

  it('sets source on click territory', async () => {
    const gameInterface = getGameInterface();
    const territory = selectTerritoryStateById(state, 52, turn.id);
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: null,
      nation: null,
      source: 'standard-london',
      target: null,
      targetCoast: null,
      type: null,
    });
  });

  it('do nothing on click territory with no piece', async () => {
    const gameInterface = getGameInterface();
    const territory = selectTerritoryStateById(state, 53, turn.id);
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });

  it('do nothing on click territory with foreign piece', async () => {
    state.entities.pieces.entities[1].nation = 'standard-france';
    const gameInterface = getGameInterface();
    const territory = selectTerritoryStateById(state, 52, turn.id);
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });

  it('do nothing on click non-playable territory', async () => {
    const gameInterface = getGameInterface();
    const territory = selectTerritoryStateById(state, 79, turn.id);
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls).toEqual([]);
  });
  it('show context menu when source (army land, orders)', async () => {
    gameForm.source = 'standard-london';
    const gameInterface = getGameInterface();
    expect(gameInterface.showContextMenu()).toBe(true);
    expect(gameInterface.getOptions()).toEqual([
      OrderTypeChoices.hold,
      OrderTypeChoices.move,
      OrderTypeChoices.support,
    ]);
  });
  it('show context menu when source (fleet land, orders)', async () => {
    gameForm.source = 'standard-london';
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
    gameForm.source = 'standard-english-channel';
    state.entities.pieces.entities[1].type = PieceTypes.FLEET;
    state.entities.pieceStates.entities[1].territory =
      'standard-english-channel';
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
    gameForm.source = 'standard-london';
    const territory = selectTerritoryStateById(state, 53, turn.id);
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: null,
      nation: null,
      source: null,
      target: null,
      targetCoast: null,
      type: null,
    });
  });
  it('set source to null on click same territory before order type', async () => {
    gameForm.source = 'standard-london';
    const territory = selectTerritoryStateById(state, 52, turn.id);
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: null,
      nation: null,
      source: null,
      target: null,
      targetCoast: null,
      type: null,
    });
  });

  it('set order type and create order on click order type (hold)', async () => {
    gameForm.source = 'standard-london';
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(OrderTypes.HOLD);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: null,
      nation: null,
      source: 'standard-london',
      target: null,
      targetCoast: null,
      type: OrderTypes.HOLD,
    });
    // re-initialize interface to trigger postOrder
    getGameInterface({
      action: null,
      aux: null,
      nation: null,
      source: 'standard-london',
      target: null,
      targetCoast: null,
      type: OrderTypes.HOLD,
    });
    expect(mockPostOrder).toHaveBeenCalled();
  });
  it('set order type on click order type (move)', async () => {
    gameForm.source = 'standard-london';
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(OrderTypes.MOVE);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: null,
      nation: null,
      source: 'standard-london',
      target: null,
      targetCoast: null,
      type: OrderTypes.MOVE,
    });
  });
  it('set order type on click order type (support)', async () => {
    gameForm.source = 'standard-london';
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(OrderTypes.SUPPORT);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: null,
      nation: null,
      source: 'standard-london',
      target: null,
      targetCoast: null,
      type: OrderTypes.SUPPORT,
    });
  });
  it('set order type on click order type (convoy)', async () => {
    gameForm.source = 'standard-english-channel';
    const gameInterface = getGameInterface();
    gameInterface.onOptionSelected(OrderTypes.CONVOY);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: null,
      nation: null,
      source: 'standard-english-channel',
      target: null,
      targetCoast: null,
      type: OrderTypes.CONVOY,
    });
  });
  it('set target on click territory after order type choice (move)', async () => {
    gameForm.source = 'standard-london';
    gameForm.type = OrderTypes.MOVE;
    const territory = selectTerritoryStateById(state, 53, turn.id);
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: null,
      nation: null,
      source: 'standard-london',
      target: 'standard-wales',
      targetCoast: null,
      type: OrderTypes.MOVE,
    });
  });
  it('post order once target (move)', async () => {
    getGameInterface({
      action: null,
      aux: null,
      nation: null,
      source: 'standard-london',
      target: 'standard-wales',
      targetCoast: null,
      type: OrderTypes.MOVE,
    });
    expect(mockPostOrder).toHaveBeenCalled();
  });
  it('set aux on click territory after order type choice (support)', async () => {
    gameForm.source = 'standard-london';
    gameForm.type = OrderTypes.SUPPORT;
    const territory = selectTerritoryStateById(state, 53, turn.id);
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: 'standard-wales',
      nation: null,
      source: 'standard-london',
      target: null,
      targetCoast: null,
      type: OrderTypes.SUPPORT,
    });
  });
  it('set target on click territory after target choice (support)', async () => {
    gameForm.source = 'standard-london';
    gameForm.aux = 'standard-wales';
    gameForm.type = OrderTypes.SUPPORT;
    const territory = selectTerritoryStateById(state, 53, turn.id);
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: 'standard-wales',
      nation: null,
      source: 'standard-london',
      target: 'standard-wales',
      targetCoast: null,
      type: OrderTypes.SUPPORT,
    });
  });
  it('set aux on click territory after order type choice (convoy)', async () => {
    gameForm.source = 'standard-english-channel';
    gameForm.type = OrderTypes.CONVOY;
    const territory = selectTerritoryStateById(state, 53, turn.id);
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: 'standard-wales',
      nation: null,
      source: 'standard-english-channel',
      target: null,
      targetCoast: null,
      type: OrderTypes.CONVOY,
    });
  });
  it('set target on click territory after target choice (convoy)', async () => {
    gameForm.source = 'standard-english-channel';
    gameForm.aux = 'standard-london';
    gameForm.type = OrderTypes.CONVOY;
    const territory = selectTerritoryStateById(state, 53, turn.id);
    const gameInterface = getGameInterface();
    gameInterface.onClickTerritory(territory);
    expect(mockSetGameForm.mock.calls[0][0]).toEqual({
      action: null,
      aux: 'standard-london',
      nation: null,
      source: 'standard-english-channel',
      target: 'standard-wales',
      targetCoast: null,
      type: OrderTypes.CONVOY,
    });
  });
  it('post order once target (support)', async () => {
    getGameInterface({
      action: null,
      aux: 'standard-wales',
      nation: null,
      source: 'standard-london',
      target: 'standard-wales',
      targetCoast: null,
      type: OrderTypes.SUPPORT,
    });
    expect(mockPostOrder).toHaveBeenCalled();
  });
  it('post order once target (convoy)', async () => {
    getGameInterface({
      action: null,
      aux: 'standard-london',
      nation: null,
      source: 'standard-english-channel',
      target: 'standard-london',
      targetCoast: null,
      type: OrderTypes.CONVOY,
    });
    expect(mockPostOrder).toHaveBeenCalled();
  });

  // TODO
  it('show context menu click named coast territory after order type choice (move)', async () => {});

  // TODO in separate test case
  // it('show context menu when source (army land, must retreat)', async () => {});
  // it('show context menu when source (fleet land, must retreat)', async () => {});
  // it('show context menu when source (army land, no retreat)', async () => {});
  // it('show context menu when source (fleet land, no retreat)', async () => {});
  // it('show context menu when source (fleet sea, no retreat)', async () => {});
});
