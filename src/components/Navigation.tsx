import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    font-weight: ${(p) => p.theme.fontWeights.display};
  }
`;

const StyledLogo = styled.span`
  font-weight: ${(p) => p.theme.fontWeights.display};
  font-size: ${(p) => p.theme.fontSizes[3]};
`;

const Logo = () => {
  return <StyledLogo>Diplomacy</StyledLogo>;
};

const Navigation = () => {
  return (
    <Header>
      <div className="inner-div">
        <nav className="primary-nav">
          <NavLink exact to="/" title="Home">
            <Logo />
          </NavLink>
        </nav>
        <nav className="secondary-nav">
          <NavLink exact to="/create-game" title="Create game">
            <FontAwesomeIcon icon={faPlusCircle} size="lg" />
          </NavLink>
          <UserDropdownMenu />
        </nav>
      </div>
    </Header>
  );
};

export default withRouter(Navigation);
