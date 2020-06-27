import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const spinner = keyframes`
0%,
100% {
  transform: scale(0);
}
50% {
  transform: scale(1);
}
`;

const StyledSpinner = styled.span`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  span {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${spinner} ${(props) => props.duration}s infinite ease-in-out;
  }

  span:last-of-type {
    animation-delay: -${(props) => props.duration / 2}s;
  }
`;

const Spinner = (props) => {
  const { color, size } = props;
  return (
    <StyledSpinner className="spinner" color={color} size={size} duration={1}>
      <span />
      <span />
    </StyledSpinner>
  );
};

export default Spinner;
