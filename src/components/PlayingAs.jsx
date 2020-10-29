import React from 'react';
import styled from '@emotion/styled';

import { colors, sizes } from '../variables';

const StyledPlayingAs = styled.span`
  .name {
    border-bottom: ${sizes.border}px solid
      ${(props) => (props.color ? props.color : 'transparent')};
  }
`;

const PlayingAs = ({ userNation }) => {
  if (!userNation)
    return (
      <div className="playing-as">You are not participating in this game.</div>
    );
  return (
    <StyledPlayingAs
      className="playing-as"
      color={colors.nations[userNation.id]}
    >
      Playing as <span className="name">{userNation.name}</span>
    </StyledPlayingAs>
  );
};

export default PlayingAs;
