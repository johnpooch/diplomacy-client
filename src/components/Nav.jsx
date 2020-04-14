import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { colors, sizes } from '../variables';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100vw;
  background: ${colors.gray};
  z-index: 1;
  height: ${sizes.navHeight}px;
  display: flex;
  align-items: center;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: ${sizes.p}px;
    float: left;
  }

  a {
    color: ${colors.base};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyledNav>
        <ul className='nav-list-left'>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <span>
          {this.props.loggedInStatus}
        </span>
        <ul className='nav-list-right'>
          <li>
            <Link to="/login">Sign In/Create Account</Link>
          </li>
        </ul>
      </StyledNav>
    );
  };
}
