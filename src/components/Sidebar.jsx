import React from 'react';
import styled from '@emotion/styled';

import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SecondaryButton } from './Button';
import { variables } from '../variables';
import Flag from './Flag';

const StyledSidebar = styled.aside`
  background: ${variables.colors.white};
  border-bottom-left-radius: ${variables.sizes.borderRadius[0]}px;
  min-width: 320px;
  position: absolute;
  right: 0;
  top: 0;

  .details {
    border-bottom: ${variables.sizes.border}px solid
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

  .label {
    font-weight: bold;
  }
`;

const Nation = ({ nation }) => {
  return (
    <StyledNation>
      <Flag nation={nation} size="small" />
      <span className="label">{nation.name}</span>
    </StyledNation>
  );
};

const StyledTab = styled(SecondaryButton)`
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-gap: ${variables.spacing[1]}px;
  justify-content: center;
  padding: ${variables.spacing[1]}px;
`;

const Tab = ({ label, icon }) => {
  return (
    <StyledTab
      className="button"
      onClick={() => {
        console.log('click');
      }}
      title={label}
    >
      <FontAwesomeIcon icon={icon} size="2x" />
    </StyledTab>
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

const Sidebar = ({ currentTurn }) => {
  const { userNation } = currentTurn;
  return (
    <StyledSidebar color={variables.colors.nations[userNation.id]}>
      <div className="details">
        <Nation nation={userNation} />
        <Turn turn={currentTurn} />
      </div>
      <div className="tabs">
        <Tab label="Messages" icon={faComment} />
        <Tab label="Log" icon={faHistory} />
        <Tab label="Orders" icon={faFlag} />
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
