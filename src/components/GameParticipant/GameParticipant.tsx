import React from 'react';

import CircleFlag from '../CircleFlag/CircleFlag';
import Tooltip from '../Tooltip/Tooltip';
import UserCircle from '../UserCircle/UserCircle';

import { GameParticipantComponentProps } from './GameParticipant.types';

const GameParticipant: React.FC<GameParticipantComponentProps> = ({
  isCurrentUser,
  nation,
  username,
}) => {
  const tooltipTitle = nation ? `${username} • ${nation.name}` : username;
  return (
    <Tooltip title={tooltipTitle}>
      <svg width={40} height={40}>
        <UserCircle username={username} isCurrentUser={isCurrentUser} />
        {nation && (
          <g transform="translate(20, 20)" width="24">
            <CircleFlag nation={nation} showTooltip={false} size="sm" />
          </g>
        )}
      </svg>
    </Tooltip>
  );
};

export default GameParticipant;
