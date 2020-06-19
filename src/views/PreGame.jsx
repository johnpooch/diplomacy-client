import React from 'react';

import JoinGame from '../components/JoinGame';
import JoinedGame from '../components/JoinedGame';
import Page from '../components/Page';
import PlayerList from '../components/PlayerList';

const PreGame = (props) => {
  const { game, isLoaded, toggleJoinGame, user } = props;
  const players = game ? game.participants : [];
  const playerIds = players.map((p) => p.id);
  const userJoined = playerIds.includes(user.id);

  const formComponent = userJoined ? (
    <JoinedGame onClickLeave={toggleJoinGame} />
  ) : (
    <JoinGame onClickJoin={toggleJoinGame} />
  );

  return (
    <Page headingText={game ? game.name : null} isLoaded={isLoaded}>
      <h2>Players</h2>
      <PlayerList players={players} />
      {formComponent}
    </Page>
  );
};

export default PreGame;
