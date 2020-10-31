import React from 'react';
import styled from '@emotion/styled';

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
  const name = nation.name.replace(' ', '-').toLowerCase();
  const flagPath = `/src/data/standard/flags/${name}.svg`;
  return (
    <StyledDiv className="flag-div" size={size}>
      <img src={flagPath} alt={`${nation.name} flag`} />
    </StyledDiv>
  );
};

export default Flag;
