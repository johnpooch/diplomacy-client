import { faCog, faUserCog } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import IconDropdownMenu, {
  DropDownMenuItem,
  StyledDropdownMenu,
} from './DropdownMenu';
import { authActions } from '../store/auth';

interface IUserDropdownMenu extends RouteComponentProps {
  logout: () => void;
}

const UserDropdownMenu: React.FC<IUserDropdownMenu & RouteComponentProps> = ({
  history,
  logout,
}): ReactElement => {
  const menuItems = [
    <DropDownMenuItem
      label="Settings"
      icon={faCog}
      onClick={() => history.push('user-settings')}
      key="settings"
    />,
    <DropDownMenuItem label="Logout" onClick={logout} key="logout" />,
  ];
  return (
    <StyledDropdownMenu>
      <IconDropdownMenu
        icon={faUserCog}
        menuItems={menuItems}
        title="user menu"
      />
    </StyledDropdownMenu>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(authActions.logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(UserDropdownMenu));
