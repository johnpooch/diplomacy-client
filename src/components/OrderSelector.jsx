import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import TerritorySummary from './TerritorySummary';
import { IconButton, Button, Grid } from '../styles';
import { colors, fontSizes, sizes, spacing } from '../variables';

const StyledIconButton = styled(IconButton)`
  float: right;
`;

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
  const { _onClickHold, summary } = props;
  return (
    <div>
      <TerritorySummary summary={summary} />
      <StyledGrid columns={4} columnGap={`${spacing[1]}px`}>
        <Button onClick={_onClickHold}>Hold</Button>
        <Button onClick={_onClickHold}>Move</Button>
        <Button onClick={_onClickHold}>Support</Button>
        <Button onClick={_onClickHold}>Convoy</Button>
      </StyledGrid>
    </div>
  );
};

export default OrderSelector;
