import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import JoinGame from '../components/JoinGame';
import JoinedGame from '../components/JoinedGame';
import Page from '../components/Page';
import PlayerList from '../components/PlayerList';
import { spacing } from '../variables';

import { alertActions } from '../store/alerts';
import { gameActions } from '../store/games';
import { getDenormalizedPreGame } from '../store/denormalizers';

const StyledP = styled.p`
  margin: ${spacing[4]}px 0;
  font-style: italic;
`;

const PreGame = (props) => {
  const { game, joinGame, leaveGame, token } = props;
  const { description, participants, userJoined } = game;

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

const mapStateToProps = (state, { match }) => {
  const { slug } = match.params;
  const game = getDenormalizedPreGame(state, slug);
  return { game, token: state.auth.token };
};

const mapDispatchToProps = (dispatch) => {
  const category = 'success';
  return {
    joinGame: (token, slug) =>
      dispatch(gameActions.joinGame({ token, slug })).then(({ payload }) => {
        const { name } = payload;
        const message = `You have joined ${name}!`;
        dispatch(gameActions.getGames({ token }));
        dispatch(alertActions.alertsAdd({ message, category }));
      }),
    leaveGame: (token, slug) =>
      dispatch(gameActions.leaveGame({ token, slug })).then(({ payload }) => {
        const { name } = payload;
        const message = `You have left ${name}.`;
        dispatch(gameActions.getGames({ token }));
        dispatch(alertActions.alertsAdd({ message, category }));
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreGame);
