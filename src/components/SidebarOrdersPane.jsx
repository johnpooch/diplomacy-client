import React from 'react';
import { connect } from 'react-redux';

import { SecondaryButton } from './Button';

import Draws from './Draws';
import OrdersSection from './OrdersSection';
import StatusSection from './StatusSection';
import Pane from './SidebarPane';

import { drawResponseActions } from '../store/drawResponses';

const OrdersPane = ({
  currentTurn,
  toggleSurrender,
  userNation,
  cancelDrawResponse,
  setDrawResponse,
  drawResponseLoading,
  draws,
  participants,
  variant,
}) => {
  const { surrender } = userNation;

  return (
    <Pane>
      <StatusSection userNation={userNation} />
      <OrdersSection currentTurn={currentTurn} userNation={userNation} />
      <SecondaryButton
        onClick={() => toggleSurrender(surrender ? surrender.id : null)}
      >
        {surrender ? `Cancel surrender` : 'Surrender'}
      </SecondaryButton>
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

const mapDispatchToProps = (dispatch) => {
  const cancelDrawResponse = (draw, response) => {
    dispatch(drawResponseActions.cancelDrawResponse({ draw, response }));
  };
  const setDrawResponse = (token, draw, response) => {
    dispatch(drawResponseActions.setDrawResponse({ token, draw, response }));
  };
  return { cancelDrawResponse, setDrawResponse };
};

export default connect(null, mapDispatchToProps)(OrdersPane);
