import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import styled, { useTheme } from 'styled-components';

import Flag from './Flag';

const StyledPlayer = styled.div`
  display: grid;
  column-gap: ${(p) => p.theme.space[1]};
  grid-template-columns: auto auto;
  justify-content: flex-start;
  align-items: center;

  .username {
    font-weight: ${(props) =>
      props.isCurrentUser === 'true' ? 'bold' : 'normal'};
  }
`;

export const Player = ({ player }) => {
  const { isCurrentUser, nation, username } = player;
  return (
    <StyledPlayer isCurrentUser={isCurrentUser}>
      {nation && <Flag nation={nation} size={0} />}
      <span className="username">{username}</span>
    </StyledPlayer>
  );
};

const StyledPlayerCount = styled.div`
  display: grid;
  column-gap: ${(p) => p.theme.space[2]};
  grid-template-columns: auto 1fr;
  text-align: left;
`;

export const PlayerCount = ({ game }) => {
  const { numPlayers, participants } = game;
  const theme = useTheme();
  return (
    <StyledPlayerCount>
      <FontAwesomeIcon icon={theme.icons.player} />
      <span className="count">
        {participants.length} / {numPlayers}
      </span>
    </StyledPlayerCount>
  );
};

const StyledPlayerList = styled.div`
  display: grid;
  row-gap: ${(p) => p.theme.space[1]};
`;

export const PlayerList = ({ participants }) => {
  const elements = participants.map((player) => {
    return player.id ? <Player key={player.id} player={player} /> : null;
  });
  return <StyledPlayerList>{elements}</StyledPlayerList>;
};

const StyledPlayers = styled.div`
  display: grid;
  row-gap: ${(p) => p.theme.space[2]};
`;

const Players = ({ browser, game, participants }) => {
  const isMobile = browser.lessThan.small;
  return (
    <StyledPlayers>
      <PlayerCount game={game} />
      {!isMobile && <PlayerList participants={participants} />}
    </StyledPlayers>
  );
};

const mapStateToProps = (state) => {
  const { browser } = state;
  return { browser };
};

export default connect(mapStateToProps, null)(Players);
