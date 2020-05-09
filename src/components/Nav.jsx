import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = {};

const Nav = () => {
  const navElements = [];
  Object.keys(navItems).forEach((path) => {
    const label = navItems[path];
    navElements.push(
      <li key={path}>
        <NavLink to={path} activeClassName="active" exact>
          {label}
        </NavLink>
      </li>
    );
  });

  return (
    <nav>
      <ul>{navElements}</ul>
    </nav>
  );
};

export default Nav;
