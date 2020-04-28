import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

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

const Header = () => {
  return (
    <StyledHeader>
      <nav>
        <ul>
          <NavList />
        </ul>
      </nav>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps, null)(Header);
