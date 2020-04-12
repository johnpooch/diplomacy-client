import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Browse Games</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
