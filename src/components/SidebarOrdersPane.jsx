import React from 'react';
import { connect } from 'react-redux';

import { drawResponseActions } from '../store/drawResponses';

import Draws from './Draws';
import OrderHistorySection from './OrderHistorySection';
import OrdersSection from './OrdersSection';
import Pane from './SidebarPane';
import StatusSection from './StatusSection';

const OrdersPane = ({
  turn,
  game,
  userNation,
  cancelDrawResponse,
  setDrawResponse,
  drawResponseLoading,
  draws,
  participants,
  variant,
}) => {
  // TODO this prevents crash when user is not participant but we should show something better
  if (!userNation) return <Pane />;
  return (
    <Pane>
      <StatusSection userNation={userNation} />
      {turn.currentTurn ? (
        <OrdersSection turn={turn} game={game} userNation={userNation} />
      ) : (
        <OrderHistorySection turn={turn} variant={variant} />
      )}
      {draws.length ? (
        <Draws
          cancelDrawResponse={cancelDrawResponse}
          drawResponseLoading={drawResponseLoading}
          draws={draws}
          participants={participants}
          setDrawResponse={setDrawResponse}
          userNation={userNation}
          variant={variant}
          // TODO: clean this up
        />
      ) : null}
    </Pane>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.entities.gameDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  const cancelDrawResponse = (draw, response) => {
    dispatch(drawResponseActions.cancelDrawResponse({ draw, response }));
  };
  const setDrawResponse = (token, draw, response) => {
    dispatch(drawResponseActions.setDrawResponse({ token, draw, response }));
  };
  return { cancelDrawResponse, setDrawResponse };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPane);
