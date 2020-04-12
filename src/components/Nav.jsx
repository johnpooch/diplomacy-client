import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { colors, sizes } from '../variables';

export const StyledNav = styled.nav`
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

const Nav = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to="/">Browse Games</Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
