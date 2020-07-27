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
          territory: 21,
          controlled_by: 7,
        },
      ],
      piece_states: [
        {
          piece: 1,
          territory: 21,
          named_coast: null,
          dislodged: false,
          dislodged_by: null,
          attacker_territory: null,
          must_retreat: false,
        },
      ],
      nation_states: [
        {
          user: 7,
          nation: 1,
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
    { id: 3, type: 'fleet', nation: 2 },
    { id: 4, type: 'army', nation: 7 },
    { id: 5, type: 'fleet', nation: 1 },
    { id: 6, type: 'fleet', nation: 3 },
    { id: 7, type: 'fleet', nation: 1 },
    { id: 8, type: 'army', nation: 1 },
    { id: 9, type: 'army', nation: 2 },
    { id: 10, type: 'fleet', nation: 5 },
    { id: 11, type: 'army', nation: 5 },
    { id: 12, type: 'fleet', nation: 6 },
    { id: 13, type: 'army', nation: 7 },
    { id: 14, type: 'fleet', nation: 4 },
    { id: 15, type: 'army', nation: 5 },
    { id: 16, type: 'army', nation: 4 },
    { id: 17, type: 'army', nation: 6 },
    { id: 18, type: 'army', nation: 3 },
    { id: 19, type: 'army', nation: 2 },
    { id: 20, type: 'army', nation: 4 },
    { id: 21, type: 'army', nation: 6 },
    { id: 22, type: 'fleet', nation: 6 },
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
            territory: 21,
            text_x: 1368.800048828125,
            text_y: 1115.5,
            type: 'land',
          },
        ],
      },
    ],
    territories: [
      {
        id: 21,
        name: 'ankara',
        named_coasts: [],
        supply_center: true,
        type: 'coastal',
      },
    ],
  },
};

test('User is set as attribute.', () => {
  const game = new GameAdapter(turnId, user, data);
  expect(game.user).toBe(user);
});

test('Territories available as attribute.', () => {
  const game = new GameAdapter(turnId, user, data);
  expect(game.territories[0].name).toBe('ankara');
});

test("Territory's piece available as attribute.", () => {
  const game = new GameAdapter(turnId, user, data);
  expect(game.territories[0].piece.x).toBe(1313);
});
