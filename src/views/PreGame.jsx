import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { infoMessages } from '../copy';
import Form, { FormWrapper } from '../components/Form';
import Page from '../components/Page';
import Players from '../components/Players';
import { Button, SecondaryButton } from '../components/Button';
import { Grid, GridTemplate } from '../layout';

import { alertActions } from '../store/alerts';
import { choiceActions } from '../store/choices';
import { getDenormalizedPreGame } from '../store/denormalizers';
import { gameActions } from '../store/games';
import { variantActions } from '../store/variants';

const NavLinkButton = SecondaryButton.withComponent(NavLink);

const PreGame = (props) => {
  const { game, joinGame, location, prepareBrowseGames, token } = props;

  useEffect(() => {
    // This will only be called on initial page load
    if (!game) {
      prepareBrowseGames(token);
    }
  }, [location.pathname]);

  if (!game) return null;

  const { description, userJoined } = game;

  const handleSubmit = (e) => {
    e.preventDefault();
    joinGame(token, game.slug, Boolean(!userJoined));
  };

  const formText = userJoined
    ? infoMessages.alreadyJoinedGame
    : `You are not currently part of this game.`;

  return (
    <Page title={game ? game.name : null}>
      <Grid columns={1}>
        {description ? <p>{description}</p> : null}
        <Players game={game} />
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <p>{formText}</p>
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
  const prepareBrowseGames = (token) => {
    dispatch(variantActions.listVariants({ token }));
    dispatch(gameActions.listGames({ token }));
    dispatch(choiceActions.getGameFilterChoices());
  };
  return {
    joinGame: (token, gameSlug, joining) => {
      const urlParams = { gameSlug };
      dispatch(gameActions.joinGame({ token, urlParams })).then(
        ({ payload }) => {
          const { name } = payload;
          const message = joining
            ? `You have joined ${name}!`
            : `You have left ${name}.`;
          dispatch(gameActions.listGames({ token }));
          dispatch(alertActions.alertsAdd({ message, category }));
        }
      );
    },
    prepareBrowseGames,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreGame);
