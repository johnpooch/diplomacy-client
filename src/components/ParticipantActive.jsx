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

const ParticipantActive = (props) => {
  const { currentUser, nationState } = props;
  const { user, nation } = nationState;
  const { id } = currentUser;
  const { username } = user;
  const isCurrentUser = user.id === id;
  let fontWeight = 'normal';
  let color = 'inherit';
  if (isCurrentUser) {
    fontWeight = 'bold';
    color = colors.nations[nation.id];
  }
  const { flag_as_data: flagData } = nation;
  return (
    <StyledDiv
      className="participant-div"
      fontWeight={fontWeight}
      color={color}
    >
      <span className="username">{username}</span>
      <Flag flagData={flagData} size="small" />
    </StyledDiv>
  );
};

export default ParticipantActive;
