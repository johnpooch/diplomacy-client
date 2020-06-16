import React from 'react';
import styled from '@emotion/styled';

import { colors, fontSizes, sizes, spacing } from '../variables';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: ${spacing[2]}px;
  left: ${spacing[2]}px;
  right: ${spacing[2]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const StyledDiv = styled.div`
  background-color: white;
  color: ${colors.base};
  padding: ${spacing[4]}px;
  font-size: ${fontSizes.sans[2]}px;
  border: ${sizes.border}px solid ${colors.base};
  border-radius: ${sizes.borderRadius[1]}px;
  pointer-events: all;
  text-align: center;
  cursor: initial;
`;

const OrderMessage = (props) => {
  const { text } = props;
  return <div>{text}</div>;
};

export default OrderMessage;
