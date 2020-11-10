import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');

const nationState = new schema.Entity('nationStates', {
  user,
});

const turn = new schema.Entity('turns', {
  nationStates: [nationState],
});

const game = new schema.Entity('games', {
  participants: [user],
  currentTurn: turn,
});

const gameList = new schema.Array(game);

const gameListNormalizer = (gameData) => normalize(gameData, gameList);
export default gameListNormalizer;
