import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');

const nationState = new schema.Entity('nationStates', {
  user,
});

const turn = new schema.Entity('turns', {
  nation_states: [nationState],
});

const game = new schema.Entity('games', {
  participants: [user],
  current_turn: turn,
});

const gameList = new schema.Array(game);

const gameNormalizer = (gameData) => normalize(gameData, gameList);
export default gameNormalizer;
