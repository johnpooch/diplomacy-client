import React from 'react';
import styled from 'styled-components';

import Flag from './Flag';

const StyledNation = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space[1]};
  font-weight: ${(p) => p.theme.fontWeights.display};
  align-items: center;
`;

const Nation = ({ nation }) => {
  return nation ? (
    <StyledNation nation={nation.nation}>
      <Flag nation={nation} size={0} />
      <span className="name">{nation.name}</span>
    </StyledNation>
  ) : null;
};

export default Nation;
