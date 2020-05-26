import React from 'react';
import styled from '@emotion/styled';

import { Button, Grid, SecondaryButton } from '../styles';
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

const OrderConfirmation = (props) => {
  const { _onClickConfirm, _onClickCancel } = props;
  return (
    <StyledWrapper>
      <StyledDiv>
        <p>Are you sure?</p>
        <StyledGrid columns={2} columnGap={`${spacing[1]}px`}>
          <Button onClick={_onClickConfirm}>Confirm</Button>
          <SecondaryButton onClick={_onClickCancel}>Cancel</SecondaryButton>
        </StyledGrid>
      </StyledDiv>
    </StyledWrapper>
  );
};

export default OrderConfirmation;
