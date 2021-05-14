import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Menu as MenuIcon, Settings } from '../Icon';

const UserDropDownMenu: React.FC<RouteComponentProps> = ({ history }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="user-settings-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem divider onClick={() => history.push('user-settings')}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(UserDropDownMenu);
