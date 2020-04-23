import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { StyledBaseNav } from './Nav';
import * as actions from '../store/actions/auth';

const StyledUserAccount = styled.span`
  display: block;

  .username {
    color: white;
  }
`;

const renderLoggedOut = () => {
  return (
    <StyledBaseNav>
      <NavLink to="/login" activeClassName="active" exact>
        Log in
      </NavLink>
    </StyledBaseNav>
  );
};

const renderAvatar = () => {
  return null;
};

const renderLoggedIn = (props) => {
  const { logout } = props;

  return (
    <StyledUserAccount>
      <span className="username">username</span>
      {renderAvatar()}
      <button
        type="button"
        onClick={logout}
        onKeyPress={logout}
        role="link"
        tabIndex={0}
      >
        Logout
      </button>
    </StyledUserAccount>
  );
};

const UserAccount = (props) => {
  const { isAuthenticated } = props;
  return isAuthenticated ? renderLoggedIn(props) : renderLoggedOut();
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
