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

const PreGame = (props) => {
  const { game, joinGame, leaveGame, token } = props;
  const { description, userJoined } = game;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userJoined) {
      leaveGame(token, game.slug);
    } else {
      joinGame(token, game.slug);
    }
  };

  return (
    <Page title={game ? game.name : null}>
      <Grid columns={1}>
        {description ? <p>{description}</p> : null}
        <Players game={game} />
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <GridTemplate templateColumns="2fr 1fr">
              <Button type="submit">
                {userJoined ? 'Leave game' : 'Join game'}
              </Button>
              <NavLinkButton to="/">Cancel</NavLinkButton>
            </GridTemplate>
          </Form>
        </FormWrapper>
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
