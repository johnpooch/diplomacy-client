import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../variables';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  color: ${(props) => (props.type === 'error' ? colors.red : colors.base)};
`;

const Alert = (props) => {
  const { text, type } = props;
  return <StyledDiv type={type}>{text}</StyledDiv>;
};

export default Alert;
