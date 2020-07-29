import GameAdapter from '../GameAdapter';

const turnId = 1;

const user = {
  id: 1,
  username: 'testuser',
  email: 'test-user@test.com',
};

const data = {
  name: 'Test game name',
  description: 'Test game description.',
  turns: [
    {
      id: 1,
      current_turn: true,
      next_turn: null,
      previous_turn: null,
      year: 1901,
      season: 'spring',
      phase: 'Order',
      territory_states: [
        {
          territory: 1,
          controlled_by: 7,
        },
      ],
      orders: [
        {
          id: 1,
          type: 'move',
          nation: 1,
          source: 1,
          target: 42,
          target_coast: null,
          aux: null,
          piece_type: null,
          via_convoy: false,
        },
      ],
      piece_states: [
        {
          piece: 1,
          territory: 1,
          named_coast: null,
          dislodged: false,
          dislodged_by: null,
          attacker_territory: null,
          must_retreat: false,
        },
        {
          piece: 2,
          territory: 1,
          named_coast: null,
          dislodged: false,
          dislodged_by: null,
          attacker_territory: null,
          must_retreat: true,
        },
      ],
      nation_states: [
        {
          user: 7,
          nation: {
            id: 1,
          },
          surrendered: false,
          supply_delta: 0,
          build_territories: null,
          num_builds: 0,
          num_disbands: 0,
        },
      ],
    },
  ],
  participants: [
    { username: 'angelicadavis', id: 1 },
    { username: 'desireejohns', id: 2 },
    { username: 'marychapman', id: 3 },
    { username: 'robertford', id: 4 },
    { username: 'pamelahenderson', id: 5 },
    { username: 'angelamoore', id: 6 },
    { username: 'testuser', id: 7 },
  ],
  pieces: [
    { id: 1, type: 'fleet', nation: 7 },
    { id: 2, type: 'army', nation: 3 },
  ],
  variant: {
    id: 1,
    map_data: [
      {
        id: 1,
        height: 1360,
        identifier: '',
        territory_data: [
          {
            abbreviation: 'Ank',
            dislodged_piece_x: 1300.5,
            dislodged_piece_y: 1107.5,
            name: 'Ankara',
            path:
              'M 1424 1364 C 1437 1361 1448 1353 1459 1346 C 1464 1343 1470 1337 1475 1336 C 1482 1334 1492 1338 1499 1340 C 1510 1342 1518 1341 1528 1336 C 1544 1328 1555 1307 1575 1297 C 1587 1291 1598 1293 1611 1293 C 1614 1293 1621 1292 1624 1292 C 1646 1286 1638 1257 1637 1241 C 1618 1244 1604 1253 1583 1253 C 1566 1253 1565 1248 1554 1246 C 1553 1247 1553 1248 1551 1248 C 1548 1249 1541 1242 1538 1240 C 1535 1242 1529 1247 1526 1246 C 1521 1245 1517 1235 1511 1235 C 1507 1236 1507 1239 1497 1241 C 1483 1243 1471 1243 1457 1249 C 1450 1253 1440 1261 1435 1266 C 1433 1268 1421 1282 1420 1284 C 1419 1286 1419 1290 1419 1292 C 1419 1300 1423 1305 1425 1312 C 1428 1318 1430 1326 1431 1333 C 1432 1342 1427 1355 1424 1364 z',
            piece_x: 1313,
            piece_y: 1120,
            pk: 1,
            supply_center_x: 1271,
            supply_center_y: 1144,
            territory: 1,
            text_x: 1368,
            text_y: 1115.5,
            type: 'land',
          },
        ],
      },
    ],
    territories: [
      {
        id: 1,
        name: 'ankara',
        named_coasts: [
          {
            "id": 1,
            "parent": 1,
            "name": "ankara north coast"
          },
          {
            "id": 2,
            "parent": 1,
            "name": "ankara south coast"
          }
        ],
        supply_center: true,
        type: 'coastal',
      },
    ],
    nations: [
      {
        id: 1,
        name: 'England',
        flag_as_data: {
          viewBox: '0 0 252.39 168.26',
          paths: [],
        },
      },
    ],
  },
};

test('User', () => {
  const game = new GameAdapter(turnId, user, data);
  expect(game.user).toBe(user);
});

test('Territory name', () => {
  const game = new GameAdapter(turnId, user, data);
  expect(game.territories[0].name).toBe('Ankara');
});

test('Territory abbreviation', () => {
  const game = new GameAdapter(turnId, user, data);
  expect(game.territories[0].abbreviation).toBe('Ank');
});

test('Territory id', () => {
  const game = new GameAdapter(turnId, user, data);
  const territory = game.territories[0];
  expect(territory.id).toBe(1);
});

test('Territory piece', () => {
  const game = new GameAdapter(turnId, user, data);
  const territory = game.territories[0];
  expect(territory.piece.x).toBe(1313);
  expect(territory.piece.y).toBe(1120);
});

test('Territory dislodged piece', () => {
  const game = new GameAdapter(turnId, user, data);
  const territory = game.territories[0];
  expect(territory.dislodgedPiece.x).toBe(1300.5);
  expect(territory.dislodgedPiece.y).toBe(1107.5);
});

test('Territory supply center', () => {
  const game = new GameAdapter(turnId, user, data);
  const territory = game.territories[0];
  expect(territory.supplyCenter.x).toBe(1271);
  expect(territory.supplyCenter.y).toBe(1144);
});

test('Territory text', () => {
  const game = new GameAdapter(turnId, user, data);
  const territory = game.territories[0];
  expect(territory.text.x).toBe(1368);
  expect(territory.text.y).toBe(1115.5);
});

test('Territory type', () => {
  const game = new GameAdapter(turnId, user, data);
  const territory = game.territories[0];
  expect(territory.type).toBe('coastal');
});

test('Territory map type', () => {
  const game = new GameAdapter(turnId, user, data);
  const territory = game.territories[0];
  expect(territory.mapType).toBe('land');
});

test('Named coasts name', () => {
  const game = new GameAdapter(turnId, user, data);
  const territory = game.territories[0];
  const namedCoastNorth = territory.namedCoasts[0];
  expect(namedCoastNorth.name).toBe('ankara north coast');
  const namedCoastSouth = territory.namedCoasts[1];
  expect(namedCoastSouth.name).toBe('ankara south coast');
});

test('Orders', () => {
  const game = new GameAdapter(turnId, user, data);
  const order = game.orders[0];
  expect(order.type).toBe('move');
});

test('Order source', () => {
  const game = new GameAdapter(turnId, user, data);
  const order = game.orders[0];
  expect(order.source.id).toBe(1);
  expect(order.source.name).toBe('Ankara');
});
