import TerritoryAdapter from '../TerritoryAdapter';

const data = {
  abbreviation: 'Ank',
  dislodged_piece_x: 1300.5,
  dislodged_piece_y: 1107.5,
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
  controlled_by: 7,
  id: 21,
  name: 'ankara',
  named_coasts: [],
  supply_center: true,
  type: 'coastal',
};

test('Territory type, name, path are set as attribute', () => {
  const territory = new TerritoryAdapter(data);
  expect(territory.type).toBe('coastal');
  expect(territory.name).toBe('ankara');
  expect(territory.abbreviation).toBe('Ank');
});

test('Piece is available as attribute.', () => {
  const territory = new TerritoryAdapter(data);
  expect(territory.type).toBe('coastal');
  expect(territory.name).toBe('ankara');
  expect(territory.abbreviation).toBe('Ank');
});

test("Territory's piece available as attribute.", () => {
  const territory = new TerritoryAdapter(data);
  expect(territory.piece.x).toBe(1313);
});
