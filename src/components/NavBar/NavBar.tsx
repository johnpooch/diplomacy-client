import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Home, New } from '../Icon';
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '../MaterialUI';
import UserDropdownMenu from '../UserDropdownMenu';

import useStyles from './NavBar.styles';
import { NavBarComponentProps } from './NavBar.types';

const NavBar: React.FC<NavBarComponentProps> = ({ logout }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <AppBar className={classes.root} position="fixed">
        <Toolbar disableGutters variant="dense">
          <Container className={classes.container} maxWidth="lg">
            <div>
              <NavLink exact to="/" className={classes.logo}>
                <Typography variant="h3" component="h1" title="Home">
                  Diplomacy
                </Typography>
                <Typography variant="body2">.gg</Typography>
              </NavLink>
            </div>
            <div>
              <NavLink exact to="/" title="Home Icon Button">
                <IconButton>{Home}</IconButton>
              </NavLink>
              <NavLink exact to="/create-game" title="Create game">
                <IconButton>{New}</IconButton>
              </NavLink>
              <UserDropdownMenu logout={logout} />
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(NavBar);
