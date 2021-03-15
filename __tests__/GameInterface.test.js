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
          ids: ['standard-london', 'standard-wales'],
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

  const getGameInterface = () =>
    new GameInterface(
      { mockPostOrder },
      gameForm,
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
  it('show context menu when source (army land)', async () => {});
  it('show context menu when source (fleet land)', async () => {});
  it('show context menu when source (fleet sea)', async () => {});

  it('set source to null on click territory before order type', async () => {});
});
