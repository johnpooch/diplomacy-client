import React from 'react';
import styled from '@emotion/styled';

import Spinner from './Spinner';
import { spacing, colors } from '../variables';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  margin-top: 4rem;
`;

const StyledText = styled.span`
  margin-top: ${spacing[4]}px;
`;

const Loading = () => {
  return (
    <StyledDiv>
      <Spinner size={60} color={colors.base} />
      <StyledText>Loading</StyledText>
    </StyledDiv>
  );
};

export default Loading;
