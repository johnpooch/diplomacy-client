import React from 'react';

import ParticipantPending from './ParticipantPending';
import ParticipantActive from './ParticipantActive';

const ParticipantList = ({ game }) => {
  const { participants } = game;
  const participantDivs = [];
  const { current_turn: turn } = game;
  if (!turn) {
    participants.forEach((participant) => {
      const { username } = participant;
      participantDivs.push(
        <ParticipantPending
          key={`${game.id} ${participant.id}`}
          username={username}
        />
      );
    });
    return <div>{participantDivs}</div>;
  }
  participants.forEach((participant) => {
    participantDivs.push(
      <ParticipantActive
        key={`${game.id} ${participant.id}`}
        game={game}
        participant={participant}
      />
    );
  });

  return <div>{participantDivs}</div>;
};

export default ParticipantList;
