import React from 'react';
import styled from '@emotion/styled';

import TerritorySummary from './TerritorySummary';
import { colors, sizes, spacing } from '../variables';

const StyledDiv = styled.div`
  position: fixed;
  top: ${spacing[3] + sizes.headerHeight}px;
  left: ${spacing[3]}px;
  padding: ${spacing[3]}px;
  background: ${colors.base};
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
