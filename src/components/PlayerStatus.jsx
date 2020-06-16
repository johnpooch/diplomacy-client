import React from 'react';
import styled from '@emotion/styled';

import { colors, spacing } from '../variables';

const StyledDiv = styled.nav`
  position: fixed;
  top: ${spacing[2]}px;
  left: 0;
  right: 0;

  .playing-as {
    grid-area: active;
    color: white;
    background: ${colors.base};
    padding: ${spacing[2]}px ${spacing[3]}px;
    min-width: 120px;
    text-align: center;
  }
`;

const PlayerStatus = (props) => {
  const { userNationState } = props;

  if (!userNationState) {
    return null;
  }
  const { nation } = userNationState;
  return (
    <StyledDiv>
      <span className="playing-as">Playing as {nation.name}</span>
    </StyledDiv>
  );
};

export default PlayerStatus;
