import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import Identicon from 'react-identicons';

import { spacing } from '../variables';
import { TertiaryButton } from '../styles';
import * as actions from '../store/actions/auth';

export const AVATAR_SIZE = 20;

const StyledLoggedIn = styled.div`
  display: flex;
  align-items: center;

  .username {
    display: inline-block;
    margin-right: ${spacing[3]}px;
    color: white;
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${spacing[1]}px;
    width: calc(${AVATAR_SIZE}px + 10px);
    height: calc(${AVATAR_SIZE}px + 10px);
    flex-grow: 0;
    flex-shrink: 0;
    border-radius: 50%;
    background: white;
  }
`;

const renderLoggedOut = () => {
  return (
    <ul>
      <li>
        <NavLink to="/login" activeClassName="active" exact>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" activeClassName="active" exact>
          Register
        </NavLink>
      </li>
    </ul>
  );
};

const renderLoggedIn = (props) => {
  const { logout, username } = props;
  return (
    <StyledLoggedIn>
      <span className="avatar">
        <Identicon string={username} size={AVATAR_SIZE} />
      </span>
      <span className="username">{username}</span>
      <TertiaryButton
        type="button"
        onClick={logout}
        onKeyPress={logout}
        role="link"
        tabIndex={0}
      >
        Log out
      </TertiaryButton>
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
