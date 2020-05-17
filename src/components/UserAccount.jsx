import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Player from './Player';
import { fontSizes, spacing } from '../variables';
import { TertiaryButton } from '../styles';
import authActions from '../store/actions/auth';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${spacing[2]}px;
  align-items: center;
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

const UserAccount = (props) => {
  const { logout, user } = props;
  const { username } = user;
  if (!username) return null;
  return (
    <StyledDiv>
      <Player username={username} avatarSize={24} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
