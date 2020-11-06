import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Form, { FormWrapper } from '../components/Form';
import Page from '../components/Page';
import Players from '../components/Players';
import { alertActions } from '../store/alerts';
import { Button, SecondaryButton } from '../components/Button';
import { gameActions } from '../store/games';
import { getDenormalizedPreGame } from '../store/denormalizers';
import { Grid, GridTemplate } from '../layout';

const NavLinkButton = SecondaryButton.withComponent(NavLink);

const JoinedGame = (props) => {
  const { onClickLeave } = props;
  return (
    <FormWrapper>
      <Form onSubmit={onClickLeave}>
        <p>
          You have already joined this game. The game will begin once all
          players have joined.
        </p>
        <GridTemplate templateColumns="2fr 1fr">
          <Button type="submit">Leave game</Button>
          <NavLinkButton to="/">Cancel</NavLinkButton>
        </GridTemplate>
      </Form>
    </FormWrapper>
  );
};

const JoinGame = (props) => {
  const { onClickJoin } = props;
  return (
    <FormWrapper>
      <Form onSubmit={onClickJoin}>
        <GridTemplate templateColumns="2fr 1fr">
          <Button type="submit">Join game</Button>
          <NavLinkButton to="/">Cancel</NavLinkButton>
        </GridTemplate>
      </Form>
    </FormWrapper>
  );
};

const PreGame = (props) => {
  const { game, joinGame, leaveGame, token } = props;
  const { description, userJoined } = game;

  const onClickJoin = (e) => {
    e.preventDefault();
    joinGame(token, game.slug);
  };

  const onClickLeave = (e) => {
    e.preventDefault();
    leaveGame(token, game.slug);
  };

  return (
    <Page title={game ? game.name : null}>
      <Grid columns={1}>
        {description ? <p>{description}</p> : null}
        <Players game={game} />
        {userJoined ? (
          <JoinedGame onClickLeave={onClickLeave} />
        ) : (
          <JoinGame onClickJoin={onClickJoin} />
        )}
      </Grid>
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
