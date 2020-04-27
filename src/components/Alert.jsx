import React from 'react';
import styled from '@emotion/styled';

import { colors, sizes, spacing, fontSizes } from '../variables';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: max-content;
  padding: ${spacing[3]}px;
  border: ${sizes.border}px solid currentColor;
  border-radius: ${sizes.borderRadius[1]}px;
  color: ${(props) => (props.type === 'error' ? colors.red : colors.base)};
  font-size: ${fontSizes.sans[2]}px;

  &:not(:last-child) {
    margin-bottom: ${spacing[4]}px;
  }
`;

const Alert = (props) => {
  const { text, type } = props;
  return <StyledDiv type={type}>{text}</StyledDiv>;
};

export default Alert;
