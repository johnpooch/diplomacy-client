import React from 'react';
import styled from '@emotion/styled';

import { spacing } from '../variables';

const StyledDiv = styled.div`
  margin-bottom: ${spacing[1]}px;
`;

const ParticipantPending = (props) => {
  const { username } = props;
  return (
    <StyledDiv className="participant-pending">
      <span className="username">{username}</span>
    </StyledDiv>
  );
};

export default ParticipantPending;
