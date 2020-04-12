import React from 'react';
import styled from '@emotion/styled';

import { sizes } from '../variables';

export const StyledDiv = styled.div`
  margin-left: ${sizes.p}px;
  padding: ${sizes.p}px;
  border: 1px solid currentColor;
  transition: all 0.1s linear;
  border-radius: ${sizes.p}px;

  span {
    text-transform: uppercase;
  }
`;

const SupplyCenter = (props) => {
  const { coastal } = props;
  const type = coastal ? 'FA' : 'A';
  return (
    <StyledDiv>
      <span>{type}</span>
    </StyledDiv>
  );
};

export default SupplyCenter;
