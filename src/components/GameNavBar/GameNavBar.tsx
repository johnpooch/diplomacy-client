import { AppBar, Container, IconButton, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import useStyles from './GameNavBar.styles';
import { GameNavBarComponentProps } from './GameNavBar.types';

const GameNavBar: React.FC<GameNavBarComponentProps> = ({
  onClickOpenControlPanel,
}) => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.root} position="fixed">
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
            <IconButton onClick={onClickOpenControlPanel}>
              <Menu />
            </IconButton>
          </div>
        </Container>
      </AppBar>
    </>
  );
};

export default withRouter(GameNavBar);
