import React from 'react';
import styled from '@emotion/styled';

import BrowseGame from './BrowseGame';

const StyledList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

function GamesList(props) {
  const { games } = props;
  if (!games || !games.length) {
    return null;
  }

  const gamesList = [];
  games.forEach((game) => {
    gamesList.push(
      <BrowseGame
        key={game.id}
        id={game.id}
        status={game.status}
        createdAt={game.created_at}
        createdBy={game.created_by}
        variant={game.variant}
        name={game.name}
      />
    );
  });
  return <StyledList>{gamesList}</StyledList>;
}

export default GamesList;
