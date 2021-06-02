import React from 'react';

import GameParticipant from '../GameParticipant/GameParticipant';
import UserSpace from '../UserSpace/UserSpace';

import { GameParticipantListComponentProps } from './GameParticipantList.types';

const GameParticipantList: React.FC<GameParticipantListComponentProps> = ({
  joinable,
  participants,
}) => {
  return (
    <div>
      {participants.map((p) => (
        <GameParticipant
          username={p.username}
          nation={p.nation}
          isCurrentUser={p.isCurrentUser}
          key={p.username}
        />
      ))}
      {joinable && <UserSpace />}
    </div>
  );
};

export default GameParticipantList;
