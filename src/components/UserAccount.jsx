import React from 'react';
import styled from '@emotion/styled';

import Player from './Player';
import { fontSizes, spacing } from '../variables';
import { TertiaryButton } from '../styles';

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
};

const UserAccount = ({ onLogout, user }) => {
  if (!user) return null;
  const { username } = user;
  if (!username) return null;
  return (
    <StyledDiv>
      <Player username={username} />
      {user ? renderLogOutButton(onLogout) : null}
    </StyledDiv>
  );
};

export default UserAccount;
