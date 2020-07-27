import PieceAdapter from '../PieceAdapter';

const data = { id: 1, type: 'fleet', nation: 7 };

test('Piece type is set as attribute', () => {
  const piece = new PieceAdapter(data);
  expect(piece.type).toBe('fleet');
});
