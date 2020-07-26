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

const StyledDiv = styled.div`
  margin: ${spacing[4]}px 0;
`;

const PlayerList = (props) => {
  const { players } = props;
  if (!players || !players.length) {
    return <StyledDiv>No players have joined.</StyledDiv>;
  }
  const elements = [];
  players.forEach((p) => {
    elements.push(
      <li key={p.id}>
        <Player username={p.username} />
      </li>
    );
  });
  return <StyledList>{elements}</StyledList>;
};

export default PlayerList;
