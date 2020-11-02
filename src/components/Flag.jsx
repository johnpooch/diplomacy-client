import React from 'react';
import styled from '@emotion/styled';
import slugify from 'slugify';

import { sizes } from '../variables';

const flagSizes = {
  small: 30,
};

const StyledDiv = styled.div`
  width: ${(props) => flagSizes[props.size]}px;
  img {
    border-radius: ${sizes.borderRadius[0]}px;
  }
`;

const Flag = (props) => {
  const { nation, size } = props;
  const flagPath = `/src/data/standard/flags/${slugify(nation.name)}.svg`;
  return (
    <StyledDiv className="flag-div" size={size}>
      <img src={flagPath} alt={`${nation.name} flag`} />
    </StyledDiv>
  );
};

export default Flag;
