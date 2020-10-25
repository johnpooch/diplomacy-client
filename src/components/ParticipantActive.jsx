import React from 'react';
import styled from '@emotion/styled';

import { colors, spacing } from '../variables';

import Flag from './Flag';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;

  .username {
    margin-right: ${spacing[1]}px;
    margin-bottom: ${spacing[1]}px;
    font-weight: ${(props) => props.fontWeight};
    color: ${(props) => props.color};
  }
`;

const ParticipantActive = ({ participant }) => {
  const { isCurrentUser, username, nation } = participant;
  let fontWeight = 'normal';
  let color = 'inherit';
  if (isCurrentUser) {
    fontWeight = 'bold';
    color = colors.nations[nation.id];
  }
  return (
    <StyledDiv
      className="participant-div"
      fontWeight={fontWeight}
      color={color}
    >
      <span className="username">{username}</span>
      <Flag nationId={nation.id} size="small" />
    </StyledDiv>
  );
};

export default ParticipantActive;
