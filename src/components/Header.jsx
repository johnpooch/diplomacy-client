import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { colors, spacing } from '../variables';
import Nav from './Nav';
import UserAccount from './UserAccount';

export const headerHeight = spacing[6];

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  background: ${colors.base};
  z-index: 1;
  height: ${headerHeight}px;
  padding: 0 ${spacing[4]}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Nav />
      <UserAccount />
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps, null)(Header);
