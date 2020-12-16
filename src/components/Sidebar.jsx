import React, { useState } from 'react';
import styled from '@emotion/styled';

import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BaseButton } from './Button';
import { variables } from '../variables';
import Flag from './Flag';

const StyledSidebar = styled.aside`
  background: ${variables.colors.gray};
  border-bottom-left-radius: ${(props) =>
    props.isTabOpen ? '0' : `${variables.sizes.borderRadius[0]}px`};
  min-width: 320px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: ${(props) => (props.isTabOpen ? '0' : 'initial')};

  .details {
    color: ${variables.colors.white};
    background: ${variables.colors.base};
    ${(props) => (props.color ? props.color : variables.colors.white)};
    display: flex;
    grid-gap: ${variables.spacing[1]}px;
    justify-content: space-between;
    padding: ${variables.spacing[1]}px;
  }

  .tabs {
    display: flex;
    grid-gap: ${variables.spacing[1]}px;
    padding: ${variables.spacing[1]}px;
    text-align: center;
  }

  .button {
    flex-grow: 1;
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

  &:hover {
    background: ${variables.colors.darkgray};
  }

  &[data-active='true'] {
    background: ${variables.colors.darkgray};
    color: white;
  }
`;

const Tab = ({ activeTab, setActiveTab, type, icon }) => {
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
    >
      <FontAwesomeIcon icon={icon} size="2x" />
    </StyledTab>
  );
};

const StyledPane = styled.div`
  padding: ${variables.spacing[1]}px;
`;

const Pane = ({ type }) => {
  return <StyledPane className="pane">{type}</StyledPane>;
};

const Sidebar = ({ currentTurn }) => {
  const [activeTab, setActiveTab] = useState(null);
  const { userNation } = currentTurn;

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
          type="messages"
          icon={faComment}
        />
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          type="log"
          icon={faHistory}
        />
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          type="orders"
          icon={faFlag}
        />
      </div>
      {activeTab ? <Pane type={activeTab} /> : null}
    </StyledSidebar>
  );
};

export default Sidebar;
