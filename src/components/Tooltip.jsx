import React from 'react';
import styled from '@emotion/styled';

import TerritorySummary from './TerritorySummary';
import { colors, spacing } from '../variables';

const StyledDiv = styled.div`
  position: fixed;
  left: ${spacing[3]}px;
  padding: ${spacing[3]}px;
  background: ${colors.base};
  color: white;
`;

const Tooltip = (props) => {
  const { game, territory } = props;
  if (!territory) return null;
  return (
    <StyledDiv>
      <TerritorySummary game={game} territory={territory} />
    </StyledDiv>
  );
};

export default Tooltip;
