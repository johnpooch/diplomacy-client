import React from 'react';
import styled from '@emotion/styled';

import TerritorySummary from './TerritorySummary';
import { colors, fontSizes, sizes, spacing } from '../variables';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: ${spacing[2]}px;
  left: ${spacing[2]}px;
  right: ${spacing[2]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const StyledDiv = styled.div`
  color: white;
  background-color: ${colors.base};
  padding: ${spacing[2]}px;
  font-size: ${fontSizes.sans[2]}px;
  border-radius: ${sizes.borderRadius[1]}px;
`;

const Orders = (props) => {
  const { summary } = props;
  return (
    <StyledWrapper>
      <StyledDiv>
        <TerritorySummary summary={summary} />
      </StyledDiv>
    </StyledWrapper>
  );
};

export default Orders;
