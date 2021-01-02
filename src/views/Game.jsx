/** @jsx jsx */
import { connect } from 'react-redux';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { gameActions, gameSelectors } from '../store/games';
import { getDenormalizedGameDetail } from '../store/denormalizers';
import { BackButton } from '../components/Button';
import { initialGameFormState } from '../game/base';
import { nationStateActions } from '../store/nationStates';
import { surrenderActions } from '../store/surrenders';
import { orderActions } from '../store/orders';
import { variables } from '../variables';
import { variantActions } from '../store/variants';
import Canvas from '../components/Canvas';
import GameInterface from '../game/gameInterface';
import Sidebar from '../components/Sidebar';

const NavLinkButton = BackButton.withComponent(NavLink);

const Game = (props) => {
  /* Game board view. Calls the API to grab the detail data for the given game.
   * The view loads until the game detail data is in the store. */
  const {
    createOrder,
    // finalizeOrders,
    // toggleSurrender,
    game,
    location,
    prepareGameDetail,
    slug,
    token,
  } = props;

  const [gameForm, setGameForm] = useState(initialGameFormState);
  const [activeTurnId, setActiveTurn] = useState();

  useEffect(() => {
    prepareGameDetail(token, slug);
  }, [location.pathname]);

  if (!game) return null; // return <Loading />;
  const currentTurn = game.turns.find((t) => t.currentTurn === true);

  // Set the active turn to the current turn on initial load
  let turn = null;
  if (!activeTurnId) {
    turn = currentTurn;
    setActiveTurn(turn.id);
  } else {
    turn = game.turns.find((t) => t.id === activeTurnId);
  }

  const postOrder = () => {
    createOrder(token, slug, gameForm);
  };

  const gameInterface = new GameInterface(
    { postOrder },
    gameForm,
    setGameForm,
    currentTurn
  );

  return (
    <div>
      <Canvas currentTurn={currentTurn} gameInterface={gameInterface} />
      <Sidebar currentTurn={currentTurn} />
      <NavLinkButton
        exact
        to="/"
        css={{
          position: 'fixed',
          top: `${variables.spacing[2]}px`,
          left: `${variables.spacing[2]}px`,
        }}
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" />
      </NavLinkButton>
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const { slug } = match.params;
  const { token, user } = state.auth;
  let game = gameSelectors.selectBySlug(state, slug);
  const gameDetailInStore = game && game.detailLoaded;
  game = gameDetailInStore
    ? getDenormalizedGameDetail(state, game.id, user)
    : null;
  return { game, slug, token };
};

const mapDispatchToProps = (dispatch) => {
  const prepareGameDetail = (token, slug) => {
    dispatch(variantActions.getVariants({ token })).then(() => {
      dispatch(gameActions.getGameDetail({ token, slug })).then(
        ({ payload }) => {
          const { id } = payload.turns.find((t) => t.currentTurn === true);
          dispatch(orderActions.listOrders({ token, id }));
        }
      );
    });
  };
  const finalizeOrders = (token, id) => {
    dispatch(nationStateActions.finalizeOrders({ token, id }));
  };
  const toggleSurrender = (token, turn, id) => {
    if (id) {
      dispatch(surrenderActions.cancelSurrender({ token, turn, id }));
    } else {
      dispatch(surrenderActions.setSurrender({ token, turn }));
    }
  };
  const createOrder = (token, slug, data) => {
    dispatch(orderActions.createOrder({ token, slug, data }));
  };

  return { createOrder, finalizeOrders, prepareGameDetail, toggleSurrender };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));
