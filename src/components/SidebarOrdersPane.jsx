import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { Button, SecondaryButton, IconButton } from './Button';
import { OrderTypes } from '../game/base';
import { variables } from '../variables';
import Draws from './Draws';
import Pane from './SidebarPane';

const OrdersPane = ({
  destroyOrder,
  finalizeOrders,
  toggleSurrender,
  userNation,
  cancelDrawResponse,
  setDrawResponse,
  orders,
  drawResponseLoading,
  draws,
  participants,
  variant,
}) => {
  const {
    numOrders,
    numSupplyCenters,
    ordersFinalized,
    surrender,
  } = userNation;

  const renderOrders = () => {
    const elements = [];
    orders.forEach((item) =>
      elements.push(
        <li key={item.id}>
          <Order
            aux={item.aux ? item.aux.name : null}
            destroyOrder={() => destroyOrder(item.id)}
            loading={item.loading}
            target={item.target ? item.target.name : null}
            source={item.source.name}
            pieceType={item.source.piece.type}
            type={item.type}
          />
        </li>
      )
    );
    return <StyledOrders>{elements}</StyledOrders>;
  };

  return (
    <Pane>
      <section className="status">
        <p className="heading">
          <span className="text">Status</span>
        </p>
        <ul>
          <li>
            <Status
              count={numSupplyCenters}
              type="supplyCenter"
              label="supply centers controlled"
            />
          </li>
        </ul>
      </section>
      <section className="orders">
        <p className="heading">
          <span className="text">Orders</span>
          <span className="count">
            {orders.length} / {numOrders}
          </span>
        </p>
        {renderOrders()}
        <Button onClick={finalizeOrders} disabled={userNation.loading}>
          {ordersFinalized ? `Un-finalize orders` : 'Finalize orders'}
        </Button>
        <SecondaryButton
          onClick={() => toggleSurrender(surrender ? surrender.id : null)}
        >
          {surrender ? `Cancel surrender` : 'Surrender'}
        </SecondaryButton>
      </section>
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

const StyledStatus = styled.div`
  display: grid;
  grid-gap: ${variables.spacing[1]}px;
  grid-template-columns: 20px auto;
  align-items: center;
`;

const Status = ({ count, label, type }) => {
  return (
    <StyledStatus>
      <FontAwesomeIcon className="icon" icon={variables.icons[type]} />{' '}
      <span className="text">
        <span className="count">{count}</span>{' '}
        <span className="label">{label}</span>
      </span>
    </StyledStatus>
  );
};

const StyledOrders = styled.ul`
  .order {
    display: grid;
    grid-gap: ${variables.spacing[1]}px;
    grid-template-columns: 20px auto 20px;
    align-items: center;
  }
  .disabled {
    color: gray;
  }
`;

const HoldOrderText = ({ source, type }) => {
  return (
    <span className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type}</span>
    </span>
  );
};

const MoveOrderText = ({ source, target, type }) => {
  return (
    <span className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type} to</span>{' '}
      <span className="target">{target}</span>
    </span>
  );
};

const AuxOrderText = ({ aux, source, target, type }) => {
  return (
    <span className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type}</span>{' '}
      <span className="target">{target}</span>{' '}
      <span className="action">to</span> <span className="aux">{aux}</span>
    </span>
  );
};

const Order = ({
  aux,
  destroyOrder,
  loading,
  pieceType,
  source,
  target,
  type,
}) => {
  let orderText = null;
  if ([OrderTypes.MOVE, OrderTypes.RETREAT].includes(type)) {
    orderText = <MoveOrderText source={source} target={target} type={type} />;
  } else if ([OrderTypes.SUPPORT, OrderTypes.CONVOY].includes(type)) {
    orderText = (
      <AuxOrderText aux={aux} source={source} target={target} type={type} />
    );
  } else {
    orderText = (
      <HoldOrderText aux={aux} source={source} target={target} type={type} />
    );
  }
  const className = loading ? 'order disabled' : 'order';
  return (
    <div className={className}>
      <FontAwesomeIcon className="icon" icon={variables.icons[pieceType]} />{' '}
      {orderText}
      {loading ? null : <IconButton icon={faTimes} onClick={destroyOrder} />}
    </div>
  );
};

export default OrdersPane;
