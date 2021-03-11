import React from 'react';
import styled from '@emotion/styled';

import flags from '../data/standard/flags/flags';
import { variables } from '../variables';
import { slugify } from '../utils';

const FlagWrapper = styled.div`
  width: ${(props) => variables.flagSizes[props.size]}px;
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
