import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import { sizes } from '../variables';

const spinner = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const StyledSpinner = styled.span`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  span {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border-width: ${sizes.border}px;
    border-style: solid;
    border-radius: 50%;
    border-color: ${(props) => props.color} transparent transparent transparent;
    animation: ${spinner} ${(props) => props.duration}s
      cubic-bezier(0.5, 0, 0.5, 1) infinite;

    &:nth-of-type(1) {
      animation-delay: -${(props) => props.duration * 0.375}s;
    }

    &:nth-of-type(2) {
      animation-delay: -${(props) => props.duration * 0.25}s;
    }

    &:nth-of-type(3) {
      animation-delay: -${(props) => props.duration * 0.125}s;
    }
  }
`;

const Spinner = (props) => {
  const { color, size } = props;
  return (
    <StyledSpinner className="spinner" color={color} size={size} duration={1}>
      <span />
      <span />
      <span />
      <span />
    </StyledSpinner>
  );
};

export default Spinner;
