import React from 'react';
import styled from '@emotion/styled';

import { variables } from '../variables';
import { slugify } from '../utils';

const FlagWrapper = styled.div`
  background: ${variables.colors.darkgray};
  width: ${(props) => variables.flagSizes[props.size]}px;
`;

const Flag = (props) => {
  const { nation, size } = props;
  return (
    <FlagWrapper size={size}>
      {nation ? (
        <img
          src={`/src/data/standard/flags/${slugify(nation.name)}.svg`}
          alt={`${nation.name} flag`}
        />
      ) : null}
    </FlagWrapper>
  );
};

export default Flag;
