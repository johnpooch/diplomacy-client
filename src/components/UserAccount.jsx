import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import Identicon from 'react-identicons';

import { spacing } from '../variables';
import { TertiaryButton } from '../styles';
import authActions from '../store/actions/auth';

export const AVATAR_SIZE = 30;

const Avatar = styled.span`
  position: relative;
  background: white;
  width: ${AVATAR_SIZE}px;
  height: 0;
  padding-top: 100%;
  border-radius: 50%;

  canvas {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const StyledLoggedIn = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  grid-column-gap: ${spacing[1]}px;
  color: white;
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
  const { logout, user } = props;
  const { username } = user;
  return (
    <StyledLoggedIn>
      <Avatar>
        <Identicon string={username} size={AVATAR_SIZE * 0.6} />
      </Avatar>
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
  const { loggedIn } = props;
  return loggedIn ? renderLoggedIn(props) : renderLoggedOut();
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn === true,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
