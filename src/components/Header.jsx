import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { colors, fontSizes, spacing } from '../variables';
import { PageWrapper } from '../styles';
import Nav from './Nav';
import UserAccount from './UserAccount';

export const HEADER_HEIGHT = spacing[6];

const StyledWrapper = styled(PageWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
`;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  background: ${colors.base};
  z-index: 1;
  height: ${HEADER_HEIGHT}px;
  overflow-x: auto;

  > *:not(:last-child) {
    margin-right: ${spacing[4]}px;
  }

  ul {
    display: flex;
    align-items: center;
  }

  li {
    margin: 0 ${spacing[2]}px;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
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
      <StyledWrapper>
        <Nav />
        <UserAccount />
      </StyledWrapper>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps, null)(Header);
