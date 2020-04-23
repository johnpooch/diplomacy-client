import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import Button from './Button';
import { spacing } from '../variables';
import * as actions from '../store/actions/auth';

const StyledLoggedOut = styled.nav`
  a + a {
    margin-left: ${spacing[1]}px;
  }
`;

const StyledLoggedIn = styled.div`
  .username {
    color: white;
    display: inline-block;
    margin-right: ${spacing[2]}px;
  }
`;

const renderLoggedOut = () => {
  const StyledNavLink = Button.withComponent(NavLink);
  return (
    <StyledLoggedOut>
      <StyledNavLink to="/login" activeClassName="active" exact>
        Log in
      </StyledNavLink>
      <StyledNavLink to="/register" activeClassName="active" exact>
        Register
      </StyledNavLink>
    </StyledLoggedOut>
  );
};

const renderAvatar = () => {
  return null;
};

const renderLoggedIn = (props) => {
  const { logout, username } = props;
  return (
    <StyledLoggedIn>
      <span className="username">{username}</span>
      {renderAvatar()}
      <Button
        type="button"
        onClick={logout}
        onKeyPress={logout}
        role="link"
        tabIndex={0}
      >
        Logout
      </Button>
    </StyledLoggedIn>
  );
};

const UserAccount = (props) => {
  const { isAuthenticated } = props;
  return isAuthenticated ? renderLoggedIn(props) : renderLoggedOut();
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    username: state.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
