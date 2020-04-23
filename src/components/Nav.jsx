import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { spacing, fontSizes } from '../variables';

const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 100%;
  }

  li {
    &:not(:last-of-type) {
      margin-right: ${spacing[4]}px;
    }
  }

  a {
    color: white;
    font-size: ${fontSizes.sans[2]}px;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }

    &.active {
      text-decoration: underline;
    }
  }
`;

const navItems = {
  '/': 'Home',
  '/browse-games': 'Browse games',
};

const Nav = () => {
  const navElements = [];
  Object.keys(navItems).forEach((path) => {
    const label = navItems[path];
    navElements.push(
      <li key={path}>
        <NavLink to={path} activeClassName="active" exact>
          {label}
        </NavLink>
      </li>
    );
  });

  return (
    <StyledNav>
      <ul>{navElements}</ul>
    </StyledNav>
  );
};

export default Nav;
