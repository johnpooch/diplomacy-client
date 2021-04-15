import React from 'react';
import styled from 'styled-components';

import Game from './Game';

const StyledGames = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: ${(p) => p.theme.space[5]};
  grid-column-gap: ${(p) => p.theme.space[5]};
`;

const Games = ({ games }) => {
  if (!games) return null;
  if (!games.length) return <p>No games found!</p>;
  const elements = games.map((game) => {
    return <Game key={game.id} game={game} />;
  });
  return <StyledGames>{elements}</StyledGames>;
};

export default Games;
