/* eslint camelcase: [2, { "allow": ["num_players"] }] */
import React from 'react';
import styled from '@emotion/styled';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Flag from './Flag';
import { variables } from '../variables';

const StyledPlayer = styled.div`
  display: grid;
  grid-column-gap: ${variables.spacing[1]}px;
  grid-template-columns: auto auto;
  justify-content: flex-start;

  .username {
    font-weight: ${(props) =>
      props.isCurrentUser === 'true' ? 'bold' : 'normal'};
  }
`;

export const Player = ({ player }) => {
  const { isCurrentUser, nation, username } = player;
  return (
    <StyledPlayer isCurrentUser={isCurrentUser}>
      <Flag nation={nation} size="small" />
      <span className="username">{username}</span>
    </StyledPlayer>
  );
};

const StyledPlayerCount = styled.div`
  display: grid;
  grid-column-gap: ${variables.spacing[2]}px;
  grid-template-columns: auto 1fr;
  text-align: left;
`;

export const PlayerCount = ({ game }) => {
  const { num_players, participants } = game;
  return (
    <StyledPlayerCount>
      <FontAwesomeIcon icon={faUser} />
      <span className="count">
        {participants.length} / {num_players}
      </span>
    </StyledPlayerCount>
  );
};

const StyledPlayerList = styled.div`
  display: grid;
  grid-row-gap: ${variables.spacing[1]}px;
`;

export const PlayerList = ({ game }) => {
  const { participants } = game;
  const elements = participants.map((player) => {
    return player.id ? <Player key={player.id} player={player} /> : null;
  });
  return <StyledPlayerList>{elements}</StyledPlayerList>;
};

const StyledPlayers = styled.div`
  display: grid;
  grid-row-gap: ${variables.spacing[2]}px;
`;

const Players = ({ game }) => {
  return (
    <StyledPlayers>
      <PlayerCount game={game} />
      <PlayerList game={game} />
    </StyledPlayers>
  );
};

export default Players;
