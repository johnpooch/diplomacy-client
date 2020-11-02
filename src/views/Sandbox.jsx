import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Map from '../components/Map';
import sandboxGameData from '../data/standard/sandbox.json';

import { initialOrderState, Order } from '../game/order';
import { getDenormalizedGameDetail } from '../store/denormalizers';
import { gameActions, gameSelectors } from '../store/games';
import { variantActions } from '../store/variants';

const Sandbox = (props) => {
  const { game, location, prepareSandbox, token } = props;

  const [orderForm, setOrderForm] = useState(initialOrderState);

  useEffect(() => {
    prepareSandbox(token);
  }, [location.pathname]);

  if (!game) return null;

  const turn = game.turns[0];
  const order = new Order(orderForm, turn, setOrderForm);

  return <Map game={game} order={order} turn={turn} />;
};

const mapStateToProps = (state) => {
  let game = gameSelectors.selectById(state, 'SANDBOX');
  if (game) {
    game = getDenormalizedGameDetail(state, game.id, null);
  }
  const { token } = state.auth;
  return { game, token };
};

const mapDispatchToProps = (dispatch) => {
  const prepareSandbox = (token) => {
    dispatch(variantActions.getVariants({ token })).then(() => {
      dispatch(gameActions.getGameDetail.fulfilled(sandboxGameData));
    });
  };

  return { prepareSandbox };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sandbox));
