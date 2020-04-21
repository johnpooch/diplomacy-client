import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../store/actions/auth';

const nav = {
  '/': 'Home',
  '/browse-games': 'Browse Games',
};

class NavList extends React.Component {
  render() {
    const { logout, isAuthenticated } = this.props;
    const navItems = [];

    Object.keys(nav).forEach((path) => {
      const label = nav[path];
      navItems.push(
        <li key={path}>
          <NavLink to={path} activeClassName="active" exact>
            {label}
          </NavLink>
        </li>
      );
    });
    if (isAuthenticated) {
      navItems.push(
        <li key="/logout">
          <button
            type="button"
            onClick={logout}
            onKeyPress={logout}
            role="link"
            tabIndex={0}
          >
            Logout
          </button>
        </li>
      );
    } else {
      navItems.push(
        <li key="/login">
          <NavLink to="/login" activeClassName="active" exact>
            Login
          </NavLink>
        </li>
      );
    }
    return navItems;
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
