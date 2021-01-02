import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from '@emotion/styled';
import { variables } from '../variables';
import { Button, SecondaryButton, IconButton } from './Button';

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

export const OrdersPane = () => {
  const drawProposals = [
    {
      id: 1,
      nation: 1,
      player: 'johnpooch',
    },
    {
      id: 2,
      nation: 1,
      player: 'samjhayes',
    },
  ];

  const renderDrawProposals = () => {
    const elements = [];
    drawProposals.forEach((item) =>
      elements.push(
        <li key={item.id}>
          <DrawProposal nation={item.nation} player={item.player} />
        </li>
      )
    );
    return <StyledDrawProposals>{elements}</StyledDrawProposals>;
  };

  const orders = [
    {
      id: 1,
      type: 'fleet',
      source: 'Liverpool',
      action: 'move to',
      destination: 'Irish Sea',
    },
    {
      id: 2,
      type: 'army',
      source: 'Yorkshire',
      action: 'move to',
      destination: 'Liverpool',
    },
  ];

  const renderOrders = () => {
    const elements = [];
    orders.forEach((item) =>
      elements.push(
        <li key={item.id}>
          <Order
            action={item.action}
            destination={item.destination}
            source={item.source}
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
              count={3}
              type="supplyCenter"
              label="supply centers controlled"
            />
          </li>
          <li>
            <Status count={2} type="territory" label="territories controlled" />
          </li>
        </ul>
      </section>
      <section className="draw-proposals">
        <p className="heading">
          <span className="text">Draw proposals</span>
          <span className="count">0 / 2</span>
        </p>
        {renderDrawProposals()}
      </section>
      <section className="orders">
        <p className="heading">
          <span className="text">Orders</span>
          <span className="count">2 / 4</span>
        </p>
        {renderOrders()}
        <Button>Finalize orders</Button>
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

const StyledDrawProposals = styled.ul`
  li {
    margin: ${variables.spacing[3]}px 0;
  }

  li + li {
    border-top: ${variables.sizes.border}px solid ${variables.colors.darkgray};
  }

  .text {
    display: block;
    margin: ${variables.spacing[3]}px 0;
  }

  .actions {
    display: grid;
    grid-gap: ${variables.spacing[2]}px;
    grid-template-columns: repeat(2, 1fr);
    margin: ${variables.spacing[3]}px 0;
  }
`;

const DrawProposal = ({ player }) => {
  return (
    <div className="draw-proposal">
      <span className="text">
        <span className="player">{player}</span>{' '}
        <span className="action">has proposed a draw</span>{' '}
      </span>
      <div className="actions">
        <SecondaryButton type="button" onClick={() => console.log('accept')}>
          Accept
        </SecondaryButton>
        <SecondaryButton type="button" onClick={() => console.log('decline')}>
          Decline
        </SecondaryButton>
      </div>
    </div>
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

const Order = ({ action, destination, source, type }) => {
  return (
    <div className="order">
      <FontAwesomeIcon className="icon" icon={variables.icons[type]} />{' '}
      <span className="text">
        <span className="source">{source}</span>{' '}
        <span className="action">{action}</span>{' '}
        <span className="destination">{destination}</span>
      </span>
      <IconButton icon={faTimes} onClick={() => console.log('cancel')} />
    </div>
  );
};
