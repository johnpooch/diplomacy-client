import React from 'react';
import styled from '@emotion/styled';

import { sizes } from '../variables';

export const StyledDiv = styled.div`
  margin-left: ${sizes.p}px;
  padding: ${sizes.p}px;
  border: 1px solid currentColor;
  transition: all 0.1s linear;

  span {
    text-transform: uppercase;
  }
`;

const Piece = (props) => {
  const { type } = props;
  return (
    <StyledDiv data-type={type}>
      <span>{type}</span>
    </StyledDiv>
  );
};

export default Piece;
