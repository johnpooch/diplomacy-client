import React from 'react';
import styled from '@emotion/styled';

import Alert from './Alert';
import BrowseGame from './BrowseGame';

const StyledList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

class GamesList extends React.Component {
  static getDateDisplayFormat() {
    return {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
  }

  render() {
    const { games } = this.props;
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
    if (!games || !games.length) {
      return <Alert text="No games found" type="error" />;
    }
    return <StyledList>{gamesList}</StyledList>;
  }
}

export default GamesList;
