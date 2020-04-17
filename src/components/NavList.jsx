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
    const navList = [];

    Object.keys(nav).forEach((key) => {
      const val = nav[key];
      navList.push(
        <li key={key}>
          <NavLink to={key} activeClassName="active" exact>
            {val}
          </NavLink>
        </li>
      );
    });
    {
      this.props.isAuthenticated
        ? navList.push(
            <li key="/logout">
              <a onClick={this.props.logout}>Logout</a>
            </li>
          )
        : navList.push(
            <li key="/login">
              <NavLink to="/login" activeClassName="active" exact>
                Login
              </NavLink>
            </li>
          );
    }
    return navList;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(NavList);
