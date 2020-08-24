import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Player from './Player';
import { fontSizes, spacing } from '../variables';
import { TertiaryButton } from '../styles';
import { logout } from '../store/auth';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${spacing[2]}px;
  align-items: center;
  color: black;
  font-size: ${fontSizes.sans[2]}px;
  width: min-content;
  margin-left: auto;
`;

const renderLogOutButton = (onLogout) => {
  if (logout) {
    return (
      <TertiaryButton
        type="button"
        onClick={onLogout}
        onKeyPress={onLogout}
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
  const { user, loggedIn } = props;
  if (!user || !loggedIn) return null;
  const { onLogout } = props;
  const { username } = user;
  if (!username) return null;
  return (
    <StyledDiv>
      <Player username={username} />
      {renderLogOutButton(onLogout)}
    </StyledDiv>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn === true,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
