import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../components/Loading';
import Canvas from '../components/Canvas';
// import Map from '../components/Map';
// import StatusBar from '../components/StatusBar';
import { gameActions, gameSelectors } from '../store/games';
import { nationStateActions } from '../store/nationStates';
import { orderActions } from '../store/orders';
import { variantActions } from '../store/variants';
import { getDenormalizedGameDetail } from '../store/denormalizers';
import { initialOrderState, Order } from '../game/order';

const Game = (props) => {
  /* Game board view. Calls the API to grab the detail data for the given game.
   * The view loads until the game detail data is in the store. */
  const {
    createOrder,
    finalizeOrders,
    game,
    location,
    prepareGameDetail,
    slug,
    token,
  } = props;

  const [orderForm, setOrderForm] = useState(initialOrderState);
  const [activeTurnId, setActiveTurn] = useState();

  useEffect(() => {
    prepareGameDetail(token, slug);
  }, [location.pathname]);

  if (!game) return <Loading />;
  const currentTurn = game.turns.find((t) => t.current_turn === true);

  // Set the active turn to the current turn on initial load
  let turn = null;
  if (!activeTurnId) {
    turn = currentTurn;
    setActiveTurn(turn.id);
  } else {
    turn = game.turns.find((t) => t.id === activeTurnId);
  }

  const { userNation } = turn;
  const order = new Order(orderForm, currentTurn, setOrderForm);

  const postOrder = () => {
    createOrder(token, slug, orderForm);
    order.reset();
  };

  return (
    <Canvas game={game} />
    // <div>
    //   <Map game={game} order={order} turn={turn} postOrder={postOrder} />
    //   <StatusBar
    //     finalizeOrders={() => finalizeOrders(token, userNation.nationStateId)}
    //     turn={turn}
    //     _setTurn={(_id) => {
    //       setActiveTurn(_id);
    //     }}
    //   />
    // </div>
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
          const { id } = payload.turns.find((t) => t.current_turn === true);
          dispatch(orderActions.listOrders({ token, id }));
        }
      );
    });
  };
  const finalizeOrders = (token, id) => {
    dispatch(nationStateActions.finalizeOrders({ token, id }));
  };
  const createOrder = (token, slug, data) => {
    dispatch(orderActions.createOrder({ token, slug, data }));
  };

  return { createOrder, finalizeOrders, prepareGameDetail };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));
