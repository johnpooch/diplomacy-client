import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { colors, spacing, fontSizes } from '../variables';

export const headerHeight = spacing[6];

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  background: ${colors.base};
  z-index: 1;
  height: ${headerHeight}px;

  nav {
    height: 100%;
  }

  ul {
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 100%;
  }

  li {
    margin-left: ${spacing[4]}px;
    &:last-of-type {
      margin-right: ${spacing[4]}px;
    }
  }

  a {
    color: white;
    font-size: ${fontSizes.sans.medium}px;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }

    &.active {
      color: ${colors.yellow};
    }
  }
`;

const nav = {
  '/': 'Home',
  '/browse-games': 'Browse Games',
};

const renderNavList = props => {
  const navList = [];

  Object.keys(nav).forEach((key) => {
    const val = nav[key];
    navList.push(
      <li key={key}>
        <NavLink to={key} activeClassName="active" exact>
          {val}
        </NavLink>
      </li>
    );
  });
  {
    props.isAuthenticated ?
      navList.push(
        <li key='/logout'>
          <NavLink to='/logout' activeClassName="active" exact>
            Logout
          </NavLink>
        </li>
      )
      :
      navList.push(
        <li key='/login'>
          <NavLink to='/login' activeClassName="active" exact>
            Login
          </NavLink>
        </li>
      )
  }
  return navList;
};

const Header = (props) => {
  return (
    <StyledHeader>
      <nav>
        <ul>{renderNavList(props)}</ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
