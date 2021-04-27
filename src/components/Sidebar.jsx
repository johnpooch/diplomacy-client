import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons';
import { faHistory, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { selectUserNationByTurn } from '../store/selectors';
import { turnSelectors } from '../store/turns';

import { SmallButton, BaseButton } from './Button';
import Flag from './Flag';
import OrdersPane from './SidebarOrdersPane';
import Pane from './SidebarPane';
import { TurnEnd } from './Turn';
import TurnNav from './TurnNav';

const StyledNation = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space[2]};
  align-items: center;

  .name {
    font-weight: ${(p) => p.theme.fontWeights.display};
    font-size: ${(p) => p.theme.fontSizes[3]};
  }
`;

const Nation = ({ nation }) => {
  return nation ? (
    <StyledNation nation={nation.nation}>
      <Flag nation={nation} size={1} />
      <span className="name">{nation.name}</span>
    </StyledNation>
  ) : null;
};

const BackButton = () => (
  <SmallButton
    as={NavLink}
    exact
    to="/"
    css={`
      display: flex;
      column-gap: ${(p) => p.theme.space[1]};
    `}
  >
    <FontAwesomeIcon icon={faArrowLeft} size="1x" />
    <span>Back</span>
  </SmallButton>
);

const StyledTab = styled(BaseButton)`
  align-items: center;
  background: ${(p) => p.theme.colors.muted};
  color: ${(p) => p.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space[1]};
  justify-content: center;
  padding: ${(p) => p.theme.space[1]};
  position: relative;
  width: 100%;

  &[data-active='true'] {
    background: ${(p) => p.theme.colors.text};
    color: white;
  }

  &:hover {
    color: ${(p) => p.theme.colors.primary};
  }
`;

const Tab = ({ activeTab, icon, label, setActiveTab, type }) => (
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

const StyledSidebar = styled.aside`
  background: ${(p) => p.theme.colors.text};
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: ${(p) => p.theme.sizes.sidebarWidth};
  z-index: 1;

  .details {
    align-items: center;
    border-bottom: ${(p) => p.theme.borderWidths[1]} solid;
    border-color: ${(p) =>
      p.nation ? p.theme.colors.nations[p.nation] : p.theme.colors.text};
    color: ${(p) => p.theme.colors.muted};
    column-gap: ${(p) => p.theme.space[2]};
    display: flex;
    justify-content: space-between;
    padding: ${(p) => p.theme.space[2]};
  }

  .tabs {
    display: flex;
    gap: ${(p) => p.theme.space[2]};
    padding: ${(p) => p.theme.space[2]};
    text-align: center;
    background: ${(p) => p.theme.colors.secondary};
  }

  @media only screen and (max-width: ${(p) => p.theme.breakpoints[1]}) {
    height: ${(p) => (p.isTabOpen ? '100vh' : 'auto')};
    position: ${(p) => (p.isTabOpen ? 'absolute' : 'relative')};
    width: 100%;

    @media (orientation: landscape) {
      nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      .details {
        order: 1;
      }
    }
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
    <StyledSidebar isTabOpen={!!activeTab} nation={userNation.nation}>
      <nav>
        <div className="details">
          <Nation nation={userNation} />
          <BackButton />
        </div>
        {turnEnd && (
          <div className="turnend">
            <TurnEnd turnEnd={turnEnd} />
          </div>
        )}
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
      </nav>
      {activeTab ? <TurnNav setTurn={setTurn} turn={activeTurn} /> : null}
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
