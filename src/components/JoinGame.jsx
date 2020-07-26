import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, GridTemplate, SecondaryButton } from '../styles';

const NavLinkButton = SecondaryButton.withComponent(NavLink);

const JoinGame = (props) => {
  const { onClickJoin } = props;
  return (
    <GridTemplate templateColumns="auto auto 1fr">
      <form onSubmit={onClickJoin}>
        <Button type="submit">Join game</Button>
      </form>
      <NavLinkButton to="/">Cancel</NavLinkButton>
    </GridTemplate>
  );
};

export default JoinGame;
