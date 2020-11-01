import { normalize, schema } from 'normalizr';

const pieceState = new schema.Entity('pieceStates');

const nationState = new schema.Entity('nationStates');

const territoryState = new schema.Entity('territoryStates');

const orders = new schema.Entity('orders');

const turn = new schema.Entity('turns', {
  nation_states: [nationState],
  orders: [orders],
  piece_states: [pieceState],
  territory_states: [territoryState],
});

const piece = new schema.Entity('pieces');

const game = new schema.Entity('game', {
  turns: [turn],
  pieces: [piece],
});

const gameDetailNormalizer = (gameData) => normalize(gameData, game);
export default gameDetailNormalizer;