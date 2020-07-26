import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import UserAccount from './UserAccount';
import { colors, fontSizes, sizes, spacing } from '../variables';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1;
  height: ${sizes.headerHeight * 2}px;
  border-bottom: solid 1px ${colors.border};
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding: 0 ${spacing[6]}px;
  max-width: ${sizes.maxWidth}px;
`;

const StyledNavLink = styled(NavLink)`
  color: ${colors.base};
  font-size: ${fontSizes.sans[2]}px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Header = (props) => {
  const { loggedIn } = props;
  const createGameNavLink = loggedIn ? (
    <StyledNavLink to="/create-game">Create game</StyledNavLink>
  ) : null;
  return (
    <StyledHeader>
      <StyledDiv>
        <StyledNavLink to="/">Diplomacy</StyledNavLink>
        {createGameNavLink}
        <UserAccount />
      </StyledDiv>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps, null)(Header);
