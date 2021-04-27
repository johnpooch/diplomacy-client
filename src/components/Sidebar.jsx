import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectUserNationByTurn } from '../store/selectors';
import { turnSelectors } from '../store/turns';

import { BaseButton } from './Button';
import Flag from './Flag';
import OrdersPane from './SidebarOrdersPane';
import Pane from './SidebarPane';
import Turn, { TurnEnd } from './Turn';
import TurnNav from './TurnNav';

const StyledNation = styled.div`
  display: flex;
  grid-gap: ${(p) => p.theme.space[1]};
  justify-content: flex-start;

  .name {
    color: ${(p) => (p.nation ? p.theme.colors.nations[p.nation] : 'inherit')};
    font-weight: bold;
  }
`;

const Nation = ({ nation }) => {
  return nation ? (
    <StyledNation nation={nation.nation}>
      <Flag nation={nation} size={0} />
      <span className="name">{nation.name}</span>
    </StyledNation>
  ) : null;
};

const StyledTab = styled(BaseButton)`
  align-items: center;
  background: ${(p) => p.theme.colors.muted};
  color: ${(p) => p.theme.colors.text};
  display: flex;
  flex-direction: column;
  grid-gap: ${(p) => p.theme.space[1]};
  justify-content: center;
  padding: ${(p) => p.theme.space[1]};
  position: relative;
  width: 100%;

  &[data-active='true'] {
    background: ${(p) => p.theme.colors.primary};
    color: white;
  }

  &:hover {
    background: ${(p) => p.theme.colors.primary};
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

const StyledSidebar = styled.aside`
  background: ${(p) => p.theme.colors.secondary};
  border-bottom-left-radius: ${(p) => (p.isTabOpen ? '0' : p.theme.radii[0])};
  width: ${(p) => p.theme.sizes.sidebarMaxWidth};
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;

  .details {
    color: ${(p) => p.theme.colors.muted};
    background: ${(p) => (p.color ? p.color : p.theme.colors.text)};
    display: flex;
    grid-gap: ${(p) => p.theme.space[1]};
    justify-content: space-between;
    padding: ${(p) => p.theme.space[2]};
  }

  .tabs {
    display: flex;
    grid-gap: ${(p) => p.theme.space[2]};
    padding: ${(p) => p.theme.space[2]};
    text-align: center;
  }

  @media only screen and (min-width: ${(p) => p.theme.breakpoints[0]}) {
    right: 0;
    top: 0;
    bottom: ${(props) => (props.isTabOpen ? '0' : 'initial')};
    width: 320px;
  }
`;

const Sidebar = ({
  activeTurn,
  currentTurn,
  drawResponseLoading,
  destroyOrder,
  finalizeOrders,
  participants,
  setTurn,
  toggleSurrender,
  userNation,
  variant,
}) => {
  const [activeTab, setActiveTab] = useState(null);
  const { draws, turnEnd } = currentTurn;

  const renderPane = () => {
    switch (activeTab) {
      case 'messages':
        return <Pane />;

      case 'history':
        return <Pane />;

      case 'orders':
        return (
          <OrdersPane
            turn={activeTurn}
            destroyOrder={destroyOrder}
            draws={draws}
            drawResponseLoading={drawResponseLoading}
            finalizeOrders={finalizeOrders}
            userNation={userNation}
            participants={participants}
            toggleSurrender={toggleSurrender}
            variant={variant}
          />
        );

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
      {turnEnd && (
        <div className="turnend">
          <TurnEnd turnEnd={turnEnd} />
        </div>
      )}
      <TurnNav setTurn={setTurn} turn={activeTurn} />
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

const mapStateToProps = (state, { activeTurnId, currentTurn }) => {
  const userNation = selectUserNationByTurn(state, currentTurn.id);
  const activeTurn = turnSelectors.selectById(state, activeTurnId);
  return { activeTurn, userNation };
};

export default connect(mapStateToProps, null)(Sidebar);
