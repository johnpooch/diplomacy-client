import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import UserDropdownMenu from './UserDropdownMenu';

const Header = styled.header`
  align-items: center;
  background: ${(p) => p.theme.colors.muted};
  border-bottom: ${(p) => p.theme.borders[0]};
  left: 0;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1;

  .inner-div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin: 0 auto;
    max-width: ${(p) => p.theme.sizes.pageMaxWidth};
    width: 100%;
    > *:last-child {
      justify-content: flex-end;
    }

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
  }

  a {
    padding: ${(p) => p.theme.space[0]} 0;

    &.active {
      color: ${(p) => p.theme.colors.text};
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

const Navigation = () => {
  return (
    <Header>
      <div className="inner-div">
        <nav className="primary-nav">
          <NavLink exact to="/" title="home">
            <Logo />
          </NavLink>
        </nav>
        <nav className="secondary-nav">
          <NavLink exact to="/create-game" title="create game">
            <FontAwesomeIcon icon={faPlusCircle} size="lg" />
          </NavLink>
          <UserDropdownMenu />
        </nav>
      </div>
    </Header>
  );
};

export default withRouter(Navigation);