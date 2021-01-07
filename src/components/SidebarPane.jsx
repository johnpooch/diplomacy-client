import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from '@emotion/styled';
import { OrderTypes } from '../game/base';
import { variables } from '../variables';
import { Button, IconButton, SecondaryButton } from './Button';
import DrawsPane from './Draws';

const StyledPane = styled.div`
  background: white;
  display: flow-root;
  flex-grow: 1;
  font-size: ${variables.fontSizes.sans[2]}px;
  padding: 0 ${variables.spacing[2]}px;
  overflow-y: auto;

  section {
    margin: ${variables.spacing[3]}px 0;

    > * {
      margin: ${variables.spacing[3]}px 0;
    }
  }

  section + section {
    border-top: ${variables.sizes.border}px solid ${variables.colors.base};
  }

  li {
    margin: ${variables.spacing[1]}px 0;
  }

  button {
    display: block;
    width: 100%;
  }

  .heading {
    display: flex;
    grid-gap: ${variables.spacing[3]}px;
    justify-content: space-between;

    .text {
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  .count {
    white-space: pre;
  }

  .icon {
    width: 100%;
  }
`;

const Pane = ({ children }) => {
  return <StyledPane>{children}</StyledPane>;
};

export const MessagesPane = () => {
  return <Pane />;
};

export const HistoryPane = () => {
  return <Pane />;
};

export const OrdersPane = ({
  cancelDrawResponse,
  destroyOrder,
  drawResponseLoading,
  draws,
  finalizeOrders,
  orders,
  participants,
  setDrawResponse,
  toggleSurrender,
  userNation,
  variant,
}) => {
  const { loading, ordersFinalized, numOrders, surrender } = userNation;
  console.log(surrender);

  const renderOrders = () => {
    const elements = [];
    orders.forEach((item) =>
      elements.push(
        <li key={item.id}>
          <Order
            aux={item.aux ? item.aux.name : null}
            destroyOrder={() => destroyOrder(item.id)}
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

  const finalizeButtonText = ordersFinalized
    ? 'Un-finalize orders'
    : 'Finalize orders';

  return (
    <Pane>
      <section className="status">
        <p className="heading">
          <span className="text">Status</span>
        </p>
        <ul>
          <li>
            <Status
              count={3}
              type="supplyCenter"
              label="supply centers controlled"
            />
          </li>
        </ul>
      </section>
      {draws.length ? (
        <section className="draw-proposals">
          <DrawsPane
            cancelDrawResponse={cancelDrawResponse}
            drawResponseLoading={drawResponseLoading}
            draws={draws}
            participants={participants}
            setDrawResponse={setDrawResponse}
            userNation={userNation}
            variant={variant}
          />
        </section>
      ) : null}
      <section className="orders">
        <p className="heading">
          <span className="text">Orders</span>
          <span className="count">
            {orders.length} / {numOrders}
          </span>
        </p>
        {renderOrders()}
        <Button onClick={finalizeOrders} disabled={loading}>
          {finalizeButtonText}
        </Button>
        {ordersFinalized ? (
          <p className="orders-finalized-message">
            Orders finalized. The turn will be processed once all players have
            finalized their orders
          </p>
        ) : null}
        <SecondaryButton
          onClick={() => toggleSurrender(surrender ? surrender.id : null)}
        >
          {surrender ? `Cancel surrender` : 'Surrender'}
        </SecondaryButton>
      </section>
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
      <span className="action">{type}</span> <span className="aux">{aux}</span>{' '}
      <span className="action">to</span>{' '}
      <span className="target">{target}</span>
    </span>
  );
};

const Order = ({ aux, destroyOrder, pieceType, source, target, type }) => {
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
  return (
    <div className="order">
      <FontAwesomeIcon className="icon" icon={variables.icons[pieceType]} />{' '}
      {orderText}
      <IconButton icon={faTimes} onClick={destroyOrder} />
    </div>
  );
};
