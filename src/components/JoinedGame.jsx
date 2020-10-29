import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { Button, GridTemplate, SecondaryButton } from '../styles';
import { spacing } from '../variables';

const NavLinkButton = SecondaryButton.withComponent(NavLink);

const StyledDiv = styled.div`
  margin-top: ${spacing[4]}px;
  margin-bottom: ${spacing[4]}px;
`;

const JoinedGame = (props) => {
  const { onClickLeave } = props;
  return (
    <div>
      <StyledDiv>
        You have already joined this game. The game will begin once all players
        have joined.
      </StyledDiv>
      <GridTemplate templateColumns="auto auto 1fr">
        <form onSubmit={onClickLeave}>
          <Button type="submit">Leave game</Button>
        </form>
        <NavLinkButton to="/">Go back</NavLinkButton>
      </GridTemplate>
    </div>
  );
};

export default JoinedGame;
