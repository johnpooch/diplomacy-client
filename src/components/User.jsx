import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Identicon from 'react-identicons';

import { fontSizes, spacing } from '../variables';
import { TertiaryButton } from '../styles';
import authActions from '../store/actions/auth';

export const AVATAR_SIZE = 24;

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

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  grid-column-gap: ${spacing[1]}px;
  color: white;
  font-size: ${fontSizes.sans[1]}px;
`;

const renderLogOutButton = (logout) => {
  if (logout) {
    return (
      <TertiaryButton
        type="button"
        onClick={logout}
        onKeyPress={logout}
        role="link"
        tabIndex={0}
      >
        Log out
      </TertiaryButton>
    );
  }
  return null;
};

const User = (props) => {
  const { logout, user } = props;
  const { username } = user;
  if (!username) return null;
  return (
    <StyledDiv>
      <Avatar>
        <Identicon string={username} size={AVATAR_SIZE * 0.65} />
      </Avatar>
      <span>{username}</span>
      {renderLogOutButton(logout)}
    </StyledDiv>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
