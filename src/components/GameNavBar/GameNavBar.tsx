import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import CircleFlag from '../CircleFlag/CircleFlag';
import { Menu } from '../Icon';
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '../MaterialUI';
import TurnNav from '../TurnNav';

import useStyles from './GameNavBar.styles';
import { GameNavBarComponentProps } from './GameNavBar.types';

const GameNavBar: React.FC<GameNavBarComponentProps> = ({
  isMobile,
  nation,
  onClickOpenControlPanel,
  setTurn,
  turn,
  turnNavIds,
}) => {
  const classes = useStyles();

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
              {nation && <CircleFlag nation={nation} size="sm" />}
              {!isMobile && (
                <TurnNav
                  setTurn={setTurn}
                  turn={turn}
                  turnNavIds={turnNavIds}
                />
              )}
              <IconButton
                title="Control Panel"
                onClick={onClickOpenControlPanel}
              >
                <Menu />
              </IconButton>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(GameNavBar);
