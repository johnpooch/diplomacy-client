import React, { useState } from 'react';
import styled from '@emotion/styled';

import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons';
import { faHistory, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BaseButton, Button, SecondaryButton } from './Button';
import { variables } from '../variables';
import Flag from './Flag';

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
  return (
    <StyledNation color={variables.colors.nations[nation.id]}>
      <Flag nation={nation} size="small" />
      <span className="name">{nation.name}</span>
    </StyledNation>
  );
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

const StyledTab = styled(BaseButton)`
  align-items: center;
  background: ${variables.colors.white};
  display: flex;
  flex-direction: column;
  grid-gap: ${variables.spacing[1]}px;
  justify-content: center;
  padding: ${variables.spacing[1]}px;
  width: 100%;
  color: ${variables.colors.base};

  &[data-active='true'] {
    background: ${variables.colors.darkgray};
    color: white;
  }

  &:hover {
    background: ${variables.colors.darkgray};
  }
`;

const Tab = ({ activeTab, icon, label, setActiveTab, type }) => {
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

  .heading {
    display: flex;
    grid-gap: ${variables.spacing[3]}px;
    justify-content: space-between;
    text-transform: uppercase;
  }

  .count {
    white-space: pre;
  }

  li {
    margin: ${variables.spacing[1]}px 0;
  }

  button {
    display: block;
    width: 100%;
  }
`;

const Pane = ({ children }) => {
  return <StyledPane className="pane">{children}</StyledPane>;
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
    grid-gap: ${variables.spacing[3]}px;
    grid-template-columns: repeat(2, 1fr);
    margin: ${variables.spacing[3]}px 0;
  }
`;

const DrawProposal = ({ player }) => {
  return (
    <div>
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

const StyledOrder = styled.div`
  display: grid;
  grid-gap: ${variables.spacing[3]}px;
  grid-template-columns: 1fr auto;

  button {
    margin: 0 0 auto;
  }
`;

const Order = ({ action, destination, source, type }) => {
  return (
    <StyledOrder>
      <span className="text">
        <span className="type">{type}</span>{' '}
        <span className="source">{source}</span>{' '}
        <span className="action">{action}</span>{' '}
        <span className="destination">{destination}</span>
      </span>
      <BaseButton type="button" onClick={() => console.log('cancel')}>
        <FontAwesomeIcon icon={faTimes} />
      </BaseButton>
    </StyledOrder>
  );
};

const OrdersPane = () => {
  const orders = [
    {
      id: 1,
      type: 'Fleet',
      source: 'Liverpool',
      action: 'move to',
      destination: 'Irish Sea',
    },
    {
      id: 2,
      type: 'Army',
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
        <li>
          <DrawProposal
            key={item.id}
            nation={item.nation}
            player={item.player}
          />
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
    return <ul>{elements}</ul>;
  };

  return (
    <Pane>
      <section className="status">
        <p className="heading">Status</p>
        <ul>
          <li>3 supply centers controlled</li>
          <li>2 territories controlled</li>
        </ul>
      </section>
      <section className="draw-proposals">
        <p className="heading">
          <span className="label">Draw proposals</span>
          <span className="count">0 / 2</span>
        </p>
        {renderDrawProposals()}
      </section>
      <section className="orders">
        <p className="heading">
          <span className="label">Orders</span>
          <span className="count">2 / 4</span>
        </p>
        {renderOrders()}
        <Button>Finalize orders</Button>
      </section>
    </Pane>
  );
};

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
        />
      </div>
      {renderPane()}
    </StyledSidebar>
  );
};

export default Sidebar;
