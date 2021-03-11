import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { BaseButton } from './Button';
import { variables } from '../variables';
import Flag from './Flag';
import OrdersPane from './SidebarOrdersPane';
import Pane from './SidebarPane';
import { selectUserNationByTurn } from '../store/selectors';

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
  color: ${variables.colors.white};
  min-width: 26px;
  padding: ${variables.spacing[0]}px;
  position: absolute;
  right: -8px;
  top: -8px;
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

const Sidebar = ({
  currentTurn,
  drawResponseLoading,
  destroyOrder,
  finalizeOrders,
  participants,
  toggleSurrender,
  userNation,
  variant,
}) => {
  const [activeTab, setActiveTab] = useState(null);
  const { draws, orders } = currentTurn;

  const renderPane = () => {
    switch (activeTab) {
      case 'messages':
        return <Pane />;

      case 'history':
        return <Pane />;

      case 'orders':
        return (
          <OrdersPane
            currentTurn={currentTurn}
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

const mapStateToProps = (state, { currentTurn }) => {
  const userNation = selectUserNationByTurn(state, currentTurn.id);
  return { userNation };
};

export default connect(mapStateToProps, null)(Sidebar);
