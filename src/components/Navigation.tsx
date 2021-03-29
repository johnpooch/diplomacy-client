/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink, withRouter } from 'react-router-dom';

import { variables } from '../variables';
import UserDropdownMenu from './UserDropdownMenu';

const Header = styled.header`
  align-items: center;
  background: white;
  border-bottom: solid ${variables.sizes.border}px ${variables.colors.darkgray};
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
    max-width: ${variables.sizes.innerWidth}px;
    width: 100%;
    > *:last-child {
      justify-content: flex-end;
    }

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
  }

  a {
    padding: ${variables.spacing[0]}px 0;

    &.active {
      color: ${variables.colors.base};
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

const Navigation = () => {
  return (
    <Header>
      <div className="inner-div">
        <nav className="primary-nav">
          <NavLink exact to="/">
            <Logo />
          </NavLink>
        </nav>
        <nav className="secondary-nav">
          <NavLink exact to="/create-game">
            <FontAwesomeIcon icon={faPlusCircle} size="lg" />
          </NavLink>
          <UserDropdownMenu />
        </nav>
      </div>
    </Header>
  );
};

export default withRouter(Navigation);
