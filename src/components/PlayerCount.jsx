import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale } from '@fortawesome/free-solid-svg-icons';

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
`;

const PlayerCount = (props) => {
  const { numParticipants, numPlayers } = props;
  return (
    <div className="player-count">
      <StyledIcon icon={faMale} />
      <span className="count">
        {numParticipants} / {numPlayers}
      </span>
    </div>
  );
};

export default PlayerCount;
