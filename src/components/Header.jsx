import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { colors, fontSizes, spacing } from '../variables';
import Nav from './Nav';
import UserAccount from './UserAccount';

export const HEADER_HEIGHT = spacing[6];

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  background: ${colors.base};
  z-index: 1;
  height: ${HEADER_HEIGHT}px;
  padding: 0 ${spacing[4]}px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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

const Header = () => {
  return (
    <StyledHeader>
      <Nav />
      <UserAccount />
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps, null)(Header);
