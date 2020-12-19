import React, { useState } from 'react';
import styled from '@emotion/styled';

import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons';
import { faHistory, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BaseButton, Button, SecondaryButton } from './Button';
import { variables } from '../variables';
import Flag from './Flag';

const StyledNation = styled.div`
  display: flex;
  grid-gap: ${variables.spacing[1]}px;
  justify-content: flex-start;

  .name {
    color: ${(props) => (props.color ? props.color : 'inherit')};
    font-weight: bold;
  }
`;

const Nation = ({ nation }) => {
  return nation ? (
    <StyledNation color={variables.colors.nations[nation.id]}>
      <Flag nation={nation} size="small" />
      <span className="name">{nation.name}</span>
    </StyledNation>
  ) : null;
};

const Turn = ({ turn }) => {
  return (
    <div className="turn">
      <span className="phase">{turn.phase}</span>,{' '}
      <span className="season">{turn.season}</span>{' '}
      <span className="year">{turn.year}</span>
    </div>
  );
};

const StyledNotification = styled.div`
  background: ${variables.colors.error};
  border-radius: 50%;
  border: ${variables.sizes.border}px solid ${variables.colors.base};
  color: ${variables.colors.white};
  min-width: 30px;
  padding: ${variables.spacing[0]}px;
  position: absolute;
  right: -7px;
  top: -7px;
`;

const Notification = ({ count }) => {
  return count ? <StyledNotification>{count}</StyledNotification> : null;
};

const StyledTab = styled(BaseButton)`
  align-items: center;
  background: ${variables.colors.white};
  color: ${variables.colors.base};
  display: flex;
  flex-direction: column;
  grid-gap: ${variables.spacing[1]}px;
  justify-content: center;
  padding: ${variables.spacing[1]}px;
  position: relative;
  width: 100%;

  &[data-active='true'] {
    background: ${variables.colors.darkgray};
    color: white;
  }

  &:hover {
    background: ${variables.colors.darkgray};
  }
`;

const Tab = ({
  activeTab,
  icon,
  label,
  notificationCount,
  setActiveTab,
  type,
}) => {
  return (
    <StyledTab
      className="tab"
      onClick={(e) => {
        const target = e.target.closest('.tab');
        setActiveTab(
          target.dataset.type === activeTab ? null : target.dataset.type
        );
      }}
      data-active={activeTab === type}
      data-type={type}
      title={label}
    >
      <FontAwesomeIcon icon={icon} size="2x" />
      <Notification count={notificationCount} />
    </StyledTab>
  );
};

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

const MessagesPane = () => {
  return <Pane />;
};

const HistoryPane = () => {
  return <Pane />;
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
    grid-template-columns: 20px 1fr auto;
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
      <BaseButton type="button" onClick={() => console.log('cancel')}>
        <FontAwesomeIcon icon={faTimes} />
      </BaseButton>
    </div>
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

const OrdersPane = () => {
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

const StyledSidebar = styled.aside`
  background: ${variables.colors.gray};
  border-bottom-left-radius: ${(props) =>
    props.isTabOpen ? '0' : `${variables.sizes.borderRadius[0]}px`};
  width: 320px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: ${(props) => (props.isTabOpen ? '0' : 'initial')};
  display: flex;
  flex-direction: column;

  .details {
    color: ${variables.colors.white};
    background: ${variables.colors.base};
    ${(props) => (props.color ? props.color : variables.colors.white)};
    display: flex;
    grid-gap: ${variables.spacing[1]}px;
    justify-content: space-between;
    padding: ${variables.spacing[2]}px;
  }

  .tabs {
    display: flex;
    grid-gap: ${variables.spacing[2]}px;
    padding: ${variables.spacing[2]}px;
    text-align: center;
  }
`;

const Sidebar = ({ currentTurn }) => {
  const [activeTab, setActiveTab] = useState(null);
  const { userNation } = currentTurn;

  const renderPane = () => {
    switch (activeTab) {
      case 'messages':
        return <MessagesPane />;

      case 'history':
        return <HistoryPane />;

      case 'orders':
        return <OrdersPane />;

      default:
        return null;
    }
  };

  return (
    <StyledSidebar isTabOpen={!!activeTab}>
      <div className="details">
        <Nation nation={userNation} />
        <Turn turn={currentTurn} />
      </div>
      <div className="tabs">
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          label="Messages"
          type="messages"
          icon={faComment}
        />
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          label="History"
          type="history"
          icon={faHistory}
        />
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          label="Orders"
          type="orders"
          icon={faFlag}
          notificationCount={4}
        />
      </div>
      {renderPane()}
    </StyledSidebar>
  );
};

export default Sidebar;
