import React from 'react';

import styled from '@emotion/styled';
import Identicon from 'react-identicons';
import { spacing } from '../variables';

const Avatar = styled.span`
  position: relative;
  background: white;
  width: ${(props) => props.avatarSize}px;
  height: 0;
  padding-top: 100%;
  border-radius: 50%;

  canvas {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: flex-start;
  grid-column-gap: ${spacing[1]}px;
  font-size: inherit;
`;

const Participant = ({ username, nation, avatarSize = 24 }) => {
  return (
    <StyledDiv>
      <Avatar avatarSize={avatarSize}>
        <Identicon string={username} size={avatarSize * 0.65} />
      </Avatar>
      <span>{username}</span>
    </StyledDiv>
  );
};

export default Participant;
