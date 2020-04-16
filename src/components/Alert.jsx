import React from 'react';
import styled from '@emotion/styled';

import { colors, sizes } from '../variables';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: max-content;
  padding: ${sizes.p}px;
  border: ${sizes.border}px solid currentColor;
  border-radius: ${sizes.borderRadius}px;
  color: ${(props) => (props.type === 'error' ? colors.red : colors.base)};
  font-weight: bold;
`;

const Alert = (props) => {
  const { text, type } = props;
  return <StyledDiv type={type}>{text}</StyledDiv>;
};

export default Alert;
