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
  padding: ${spacing[4]}px;
  font-size: ${fontSizes.sans[2]}px;
  border: ${sizes.border}px solid ${colors.base};
  border-radius: ${sizes.borderRadius[1]}px;
  pointer-events: all;
  text-align: center;
  cursor: initial;
`;

const StyledGrid = styled(Grid)`
  margin-top: ${spacing[4]}px;
`;

const OrderSelector = (props) => {
  const {
    _onClickHold,
    _onClickMove,
    _onClickSupport,
    _onClickConvoy,
    summary,
  } = props;
  return (
    <StyledWrapper>
      <StyledDiv>
        <TerritorySummary summary={summary} />
        <StyledGrid columns={4} columnGap={`${spacing[1]}px`}>
          <Button onClick={_onClickHold}>Hold</Button>
          <Button onClick={_onClickMove}>Move</Button>
          <Button onClick={_onClickSupport}>Support</Button>
          <Button onClick={_onClickConvoy}>Convoy</Button>
        </StyledGrid>
      </StyledDiv>
    </StyledWrapper>
  );
};

export default OrderSelector;
