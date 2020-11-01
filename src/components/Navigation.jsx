/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';

import { variables } from '../variables';
import { SecondaryButton } from './Button';

const Header = styled.header`
  align-items: center;
  background: white;
  border-bottom: solid ${variables.sizes.border}px ${variables.colors.darkgray};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  left: 0;
  position: sticky;
  right: 0;
  top: 0;

  nav {
    display: grid;
    grid-template-rows: auto;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    column-gap: ${variables.spacing[3]}px;
    align-items: center;
  }

  > * {
    padding: ${variables.spacing[2]}px;
  }

  > *:last-child {
    justify-content: flex-end;
  }

  a {
    &:hover {
      text-decoration: underline;
    }

    &.active {
      color: ${variables.colors.base};
    }
  }
`;

const Logo = () => {
  return <span css={{ fontWeight: 'bold' }}>Diplomacy</span>;
};

const Player = (user) => {
  return <span css={{ fontWeight: 'bold' }}>{user.user.username}</span>;
};

const Navigation = (props) => {
  const { onLogout, user } = props;
  return (
    <Header>
      <nav>
        <NavLink exact to="/">
          Browse games
        </NavLink>
        <NavLink exact to="/create-game">
          Create game
        </NavLink>
      </nav>
      <Logo />
      <nav>
        <span>
          Logged in as <Player user={user} />
        </span>
        <SecondaryButton type="button" onClick={onLogout} role="link">
          Log out
        </SecondaryButton>
      </nav>
    </Header>
  );
};

export default Navigation;
