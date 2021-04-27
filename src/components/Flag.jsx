import React from 'react';
import styled from 'styled-components';

import flags from '../data/standard/flags/flags';

const StyledFlag = styled.div`
  width: ${(p) => p.theme.sizes.flag[p.size]};
  height: calc(${(p) => p.theme.sizes.flag[p.size]} * 2 / 3);
  box-shadow: ${(p) =>
    `inset 0 0 0 ${p.theme.borderWidths[0]} ${p.theme.colors.secondary}`};
`;

const Flag = ({ nation, size }) => {
  return (
    <StyledFlag size={size}>
      {nation ? (
        <img src={flags[nation.nation]} alt={`${nation.name} flag`} />
      ) : null}
    </StyledFlag>
  );
};

export default Flag;
