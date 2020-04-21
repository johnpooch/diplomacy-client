import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

// import { colors, spacing, fontSizes } from '../variables';
import * as actions from '../store/actions/auth';

const StyledDiv = styled.div`
  a {
    color: white;
  }
`;

const UserAccount = (props) => {
  const { logout, isAuthenticated } = props;
  if (isAuthenticated) {
    return (
      <StyledDiv>
        <button
          type="button"
          onClick={logout}
          onKeyPress={logout}
          role="link"
          tabIndex={0}
        >
          Logout
        </button>
      </StyledDiv>
    );
  }
  return (
    <StyledDiv>
      <NavLink to="/login" activeClassName="active" exact>
        Login
      </NavLink>
    </StyledDiv>
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
