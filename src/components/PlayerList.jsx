import React from 'react';
import styled from '@emotion/styled';

import Player from './Player';
import { spacing } from '../variables';

const StyledList = styled.ul`
  margin: ${spacing[4]}px 0;

  li:not(:last-of-type) {
    margin-bottom: ${spacing[1]}px;
  }
`;

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
      <h2>Players</h2>
      <StyledList>{participantItems}</StyledList>
    </div>
  );
};

export default PlayerList;
