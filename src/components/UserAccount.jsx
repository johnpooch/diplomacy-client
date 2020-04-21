import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { StyledBaseNav } from './Nav';
import * as actions from '../store/actions/auth';

const StyledSpan = styled.span`
  display: block;
`;

const renderLoggedOut = () => {
  return (
    <StyledSpan>
      <NavLink to="/login" activeClassName="active" exact>
        Log in
      </NavLink>
    </StyledSpan>
  );
};

const renderLoggedIn = (props) => {
  const { logout } = props;
  return (
    <StyledSpan>
      <button
        type="button"
        onClick={logout}
        onKeyPress={logout}
        role="link"
        tabIndex={0}
      >
        Logout
      </button>
    </StyledSpan>
  );
};

const UserAccount = (props) => {
  const { isAuthenticated } = props;

  return (
    <StyledBaseNav>
      {isAuthenticated ? renderLoggedIn(props) : renderLoggedOut()}
    </StyledBaseNav>
  );
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
