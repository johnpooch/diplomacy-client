import React from 'react';
import Player from './Player';

const PlayerList = (props) => {
  const { players } = props;
  const participantItems = [];
  players.forEach((p) => {
    participantItems.push(
      <li key={p.id}>
        <Player username={p.username} />
      </li>
    );
  });
  return (
    <div>
      <h3>Players</h3>
      <ul>{participantItems}</ul>
    </div>
  );
};

export default PlayerList;
