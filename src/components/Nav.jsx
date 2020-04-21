import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { colors, spacing, fontSizes } from '../variables';

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

const navItems = {
  '/': 'Home',
  '/browse-games': 'Browse Games',
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
