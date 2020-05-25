import React from 'react';
import styled from '@emotion/styled';

import TerritorySummary from './TerritorySummary';
import { colors, spacing } from '../variables';

const StyledDiv = styled.div`
  position: fixed;
  bottom: ${spacing[2]}px;
  right: ${spacing[2]}px;
  padding: ${spacing[3]}px;
  background-color: ${colors.base};
  color: white;
`;

const Tooltip = (props) => {
  const { summary } = props;
  return (
    <StyledDiv>
      <TerritorySummary summary={summary} />
    </StyledDiv>
  );
};

export default Tooltip;
