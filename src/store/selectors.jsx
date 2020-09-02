export const getGames = (state) => {
  // Gets all games as an ordered list
  const { games } = state.entities;
  return games.allIds.map((id) => games.byId[id]);
};

export const getGame = (state, slug) => {
  /*
  Gets a game from the store by the given slug.
  */
  const { games } = state.entities;
  return Object.values(games.byId).find((g) => g.slug === slug);
};

export const getVariants = (state) => {
  // Gets all variants as an ordered list
  const { variants } = state.entities;
  return variants.allIds.map((id) => variants.byId[id]);
};

export const getUserNation = (state, game, user) => {
  /* 
  Given a game and a user, gets the nation user is playing as in that game. 
  Returns null if user is not playing or if the game has not started yet.
  */
  const { nations, nationStates, turns } = state.entities;
  const turn = turns.byId[game.current_turn];
  if (!turn) return null;

  let nationId = null;
  Object.values(nationStates.byId).forEach((ns) => {
    if (turn.nation_states.includes(ns.id) && ns.user === user.id) {
      nationId = ns.nation;
    }
  });
  return nationId ? nations.byId[nationId] : null;
};

export const getParticipatingUsers = (state, game) => {
  /* 
  Given a game, get the users which are participating.
  */
  const { participants } = game;
  const { users } = state.entities;
  const participatingUsers = [];
  participants.forEach((p) => participatingUsers.push(users.byId[p]));
  return participatingUsers;
};

export const getCurrentTurn = (state, game) => {
  /* 
  Gets the current turn of a game.
  */
  if (!game) return null;
  const { current_turn: turn } = game;
  const { turns } = state.entities;
  return turns.byId[turn];
};
