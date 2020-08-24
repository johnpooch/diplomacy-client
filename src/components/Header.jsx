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
  height: ${sizes.headerHeight}px;
  border-bottom: solid ${sizes.border}px ${colors.border};
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'a b c';
  align-items: center;
  height: 100%;
  padding: 0 ${spacing[6]}px;
  white-space: nowrap;

  a {
    text-decoration: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${colors.base};
  font-size: ${fontSizes.sans[2]}px;
  text-decoration: none;
  margin-right: ${spacing[3]}px;
  .nav {
    width: min-content;
  }

  a {
    color: ${colors.gray};
    font-size: ${fontSizes.sans[2]}px;
    font-weight: 600;

    &.active {
      text-decoration: underline;
    }

    &:not(:last-of-type) {
    }
  }

  .logo {
    grid-area: b;
    color: white;
    font-size: ${fontSizes.sans[3]}px;
    font-weight: 600;
    text-align: center;
  }
`;

const StyledUserAccount = styled(UserAccount)`
  grid-area: c;
  width: min-content;
  display: none;
`;

function renderLoggedInHeader() {
  return (
    <StyledDiv>
      <nav className="nav">
        <StyledNavLink className="logo" exact to="/">
          Diplomacy
        </StyledNavLink>
        <StyledNavLink exact to="/create-game">
          Create game
        </StyledNavLink>
      </nav>
      <StyledUserAccount />
    </StyledDiv>
  );
}

function renderLoggedOutHeader() {
  return (
    <StyledDiv>
      <NavLink className="logo" exact to="/">
        Diplomacy
      </NavLink>
    </StyledDiv>
  );
}

const Header = (props) => {
  const { loggedIn } = props;
  return (
    <StyledHeader>
      {loggedIn ? renderLoggedInHeader() : renderLoggedOutHeader()}
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps, null)(Header);
