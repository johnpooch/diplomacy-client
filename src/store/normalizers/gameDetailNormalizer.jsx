import { normalize, schema } from 'normalizr';

const pieceState = new schema.Entity('pieceStates');

const user = new schema.Entity('users');

const surrender = new schema.Entity('surrenders', {
  user,
});

const nationState = new schema.Entity('nationStates', {
  surrenders: [surrender],
  user,
});

const territoryState = new schema.Entity('territoryStates');

const orders = new schema.Entity('orders');

const turn = new schema.Entity('turns', {
  nationStates: [nationState],
  orders: [orders],
  pieceStates: [pieceState],
  territoryStates: [territoryState],
});

const piece = new schema.Entity('pieces');

const game = new schema.Entity('game', {
  turns: [turn],
  pieces: [piece],
});

const gameDetailNormalizer = (gameData) => normalize(gameData, game);
export default gameDetailNormalizer;
