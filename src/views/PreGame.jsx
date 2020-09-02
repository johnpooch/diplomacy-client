import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import JoinGame from '../components/JoinGame';
import JoinedGame from '../components/JoinedGame';
import Page from '../components/Page';
import PlayerList from '../components/PlayerList';
import { spacing } from '../variables';

import { gameActions } from '../store/games';
import { getParticipatingUsers } from '../store/selectors';

const StyledP = styled.p`
  margin: ${spacing[4]}px 0;
  font-style: italic;
`;

const PreGame = (props) => {
  const { game, participants, joinGame, leaveGame, token, user } = props;
  const { description } = game;
  const participantIds = participants.map((p) => p.id);
  const userJoined = participantIds.includes(user.id);

  // TODO these should be in child components
  const onClickJoin = (e) => {
    e.preventDefault();
    joinGame(token, game.slug);
  };

  const onClickLeave = (e) => {
    e.preventDefault();
    leaveGame(token, game.slug);
  };

  const formComponent = userJoined ? (
    <JoinedGame onClickLeave={onClickLeave} />
  ) : (
    <JoinGame onClickJoin={onClickJoin} />
  );

  return (
    <Page headingText={game ? game.name : null} isLoaded>
      <StyledP>{description}</StyledP>
      <h2>Players</h2>
      <PlayerList players={participants} />
      {formComponent}
    </Page>
  );
};

const mapStateToProps = (state, { game }) => {
  const participants = getParticipatingUsers(state, game);
  return {
    token: state.auth.token,
    participants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinGame: (token, slug) => dispatch(gameActions.joinGame(token, slug)),
    leaveGame: (token, slug) => dispatch(gameActions.leaveGame(token, slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreGame);
