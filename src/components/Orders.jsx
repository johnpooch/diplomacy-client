import React from 'react';
import styled from '@emotion/styled';

import TerritorySummary from './TerritorySummary';
import { Button, Grid } from '../styles';
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
  background-color: white;
  color: ${colors.base};
  padding: ${spacing[3]}px;
  font-size: ${fontSizes.sans[2]}px;
  border-radius: ${sizes.borderRadius[1]}px;
  pointer-events: all;
  cursor: initial;
`;

const StyledGrid = styled(Grid)`
  margin-top: ${spacing[3]}px;
  grid-column-gap: ${spacing[1]}px;
  grid-row-gap: ${spacing[1]}px;
`;

const Orders = (props) => {
  const { summary } = props;
  return (
    <StyledWrapper>
      <StyledDiv>
        <TerritorySummary summary={summary} />
        <StyledGrid columns={2}>
          <Button>Hold</Button>
          <Button>Move</Button>
          <Button>Support</Button>
          <Button>Convoy</Button>
        </StyledGrid>
      </StyledDiv>
    </StyledWrapper>
  );
};

export default Orders;
