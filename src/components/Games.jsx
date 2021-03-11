import React from 'react';
import styled from '@emotion/styled';

import Game from './Game';
import { variables } from '../variables';

const StyledGames = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: ${variables.spacing[5]}px;
  grid-column-gap: ${variables.spacing[5]}px;
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
