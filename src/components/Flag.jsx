import React from 'react';
import styled from 'styled-components';

import flags from '../data/standard/flags/flags';
import { slugify } from '../utils';

const FlagWrapper = styled.div`
  /* width: ${(p) => p.sizes.flag[p.size]}; */
`;

const Flag = ({ nation, size }) => {
  return (
    <FlagWrapper size={size}>
      {nation ? (
        <img src={flags[slugify(nation.name)]} alt={`${nation.name} flag`} />
      ) : null}
    </FlagWrapper>
  );
};

export default Flag;
