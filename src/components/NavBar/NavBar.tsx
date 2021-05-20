import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Container, IconButton, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import UserDropdownMenu from '../UserDropdownMenu';

import useStyles from './NavBar.styles';
import { NavBarComponentProps } from './NavBar.types';

const ICON_SIZE = '1x';

const NavBar: React.FC<NavBarComponentProps> = ({ logout }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <AppBar className={classes.root} position="fixed">
        <Container className={classes.container} maxWidth="lg">
          <div>
            <NavLink exact to="/" title="Home" className={classes.logo}>
              <Typography variant="h3">Diplomacy</Typography>
              <Typography variant="body2">.gg</Typography>
            </NavLink>
          </div>
          <div>
            <NavLink exact to="/" title="Home">
              <IconButton>
                <FontAwesomeIcon icon={faHome} size={ICON_SIZE} />
              </IconButton>
            </NavLink>
            <NavLink exact to="/create-game" title="Create game">
              <IconButton>
                <FontAwesomeIcon icon={faPlusCircle} size={ICON_SIZE} />
              </IconButton>
            </NavLink>
            <UserDropdownMenu logout={logout} />
          </div>
        </Container>
      </AppBar>
    </>
  );
};

export default withRouter(NavBar);
