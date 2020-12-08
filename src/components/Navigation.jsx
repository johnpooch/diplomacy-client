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
  z-index: 1;

  nav {
    display: grid;
    grid-template-rows: auto;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    column-gap: ${variables.spacing[3]}px;
    align-items: center;
  }

  > * {
    padding: ${variables.spacing[2]}px ${variables.spacing[3]}px;
  }

  > *:last-child {
    justify-content: flex-end;
  }

  a {
    border-bottom: solid ${variables.sizes.border}px transparent;
    padding: ${variables.spacing[0]}px 0;

    &.active {
      color: ${variables.colors.base};
      border-color: ${variables.colors.darkgray};
    }
  }

  nav {
    font-size: ${variables.fontSizes.sans[2]}px;
  }

  .username {
    font-weight: bold;
  }
`;

const Logo = () => {
  return (
    <span css={{ fontWeight: 'bold', fontSize: variables.fontSizes.sans[3] }}>
      Diplomacy
    </span>
  );
};

const Navigation = (props) => {
  const { onLogout, user } = props;
  return (
    <Header>
      <nav className="primary-nav">
        <NavLink exact to="/">
          Browse games
        </NavLink>
        <NavLink exact to="/create-game">
          Create game
        </NavLink>
        <NavLink exact to="/sandbox">
          Sandbox
        </NavLink>
      </nav>
      <Logo />
      <nav className="user-nav">
        <div>
          Logged in as <span className="username">{user.username}</span>
        </div>
        <SecondaryButton type="button" onClick={onLogout} role="link">
          Log out
        </SecondaryButton>
      </nav>
    </Header>
  );
};

export default Navigation;
