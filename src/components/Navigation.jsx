import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { SecondaryButton } from './Button';

const Header = styled.header`
  align-items: center;
  background: white;
  border-bottom: ${(p) => p.theme.borders[0]};
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
    column-gap: ${(p) => p.theme.space[3]};
    align-items: center;
  }

  > * {
    padding: ${(p) => `${p.theme.space[2]} ${p.theme.space[3]}`};
  }

  > *:last-child {
    justify-content: flex-end;
  }

  a {
    border-bottom: ${(p) => p.theme.borders[0]};
    padding: ${(p) => p.theme.space[0]} 0;

    &.active {
      color: ${(p) => p.theme.colors.text};
    }

    &:not(.active) {
      border-color: transparent;
    }
  }

  nav {
    font-size: ${(p) => p.theme.fontSizes[2]};
  }

  .username {
    font-weight: bold;
  }
`;

const Logo = () => {
  return (
    <span
      css={`
        font-weight: ${(p) => p.theme.fontWeights.heading};
        font-size: ${(p) => p.theme.fontSizes[3]};
      `}
    >
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
