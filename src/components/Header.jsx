import React from 'react';
import styled from '@emotion/styled';

import { colors, spacing, fontSizes } from '../variables';
import NavList from './NavList';

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


const Header = (props) => {
  return (
    <StyledHeader>
      <nav>
        <ul><NavList {...props}/></ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
