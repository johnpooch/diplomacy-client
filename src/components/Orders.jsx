import React from 'react';
import styled from '@emotion/styled';

// import { colors, fontSizes, spacing } from '../variables';

const StyledDiv = styled.div`
  background-color: white;
  padding: 10px;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
`;

const Orders = (props) => {
  const { selected } = props;
  return <StyledDiv>{selected}</StyledDiv>;
};

export default Orders;
