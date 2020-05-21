import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UserAccount from './UserAccount';
import { colors, fontSizes, sizes, spacing } from '../variables';
import { PageWrapper } from '../styles';

const StyledWrapper = styled(PageWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
`;

const StyledLogo = styled(NavLink)`
  color: white;
  font-size: ${fontSizes.sans[2]}px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: ${colors.base};
  z-index: 1;
  height: ${sizes.headerHeight}px;
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
`;

const Header = (props) => {
  const { pathname } = props;
  if (pathname.startsWith('/game/')) return null;
  return (
    <StyledHeader>
      <StyledWrapper>
        <StyledLogo to="/">Diplomacy</StyledLogo>
        <UserAccount />
      </StyledWrapper>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    pathname: state.router.location.pathname,
  };
};

export default connect(mapStateToProps, null)(Header);
