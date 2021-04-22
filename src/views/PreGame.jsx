import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Button, SecondaryButton } from '../components/Button';
import Form, { FormWrapper } from '../components/Form';
import Page from '../components/Page';
import Players from '../components/Players';
import { infoMessages } from '../copy';
import { Grid, GridTemplate } from '../layout';
import { alertActions } from '../store/alerts';
import { choiceActions } from '../store/choices';
import { gameActions, gameSelectors } from '../store/games';
import { userSelectors } from '../store/users';
import { variantActions } from '../store/variants';

const PreGame = (props) => {
  const {
    game,
    joinGame,
    location,
    prepareBrowseGames,
    participants,
    token,
    userJoined,
  } = props;

  useEffect(() => {
    // This will only be called on initial page load
    if (!game) {
      prepareBrowseGames(token);
    }
  }, [location.pathname]);

  if (!game) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    joinGame(token, game.slug, Boolean(!userJoined));
  };

  const formText = userJoined
    ? infoMessages.alreadyJoinedGame
    : infoMessages.notJoinedGame;

  return (
    <Page title={game ? game.name : null}>
      <Grid columns={1}>
        <Players game={game} participants={participants} />
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <p>{formText}</p>
            <GridTemplate templateColumns="2fr 1fr">
              <Button type="submit">
                {userJoined ? 'Leave game' : 'Join game'}
              </Button>
              <SecondaryButton as={NavLink} to="/">
                Cancel
              </SecondaryButton>
            </GridTemplate>
          </Form>
        </FormWrapper>
      </Grid>
    </Page>
  );
};

const mapStateToProps = (state, { match }) => {
  const { slug } = match.params;
  const game = gameSelectors.selectBySlug(state, slug);
  const { token, user } = state.auth;
  const participants = game
    ? game.participants.map((p) => userSelectors.selectById(state, p))
    : null;
  const userJoined = game ? game.participants.includes(user.id) : false;
  return { game, participants, token, userJoined };
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
