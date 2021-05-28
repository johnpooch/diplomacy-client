import { Toolbar } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';

import AlertList from '../AlertList/AlertList';
import NavBar from '../NavBar';

import { PageWrapperComponentProps } from './PageWrapper.types';

const PageWrapper: React.FC<PageWrapperComponentProps> = ({
  alerts,
  alertsClear,
  children,
  logout,
}) => {
  return (
    <>
      <NavBar logout={logout} />
      <Toolbar variant="dense" />
      <AlertList alerts={alerts} onClose={alertsClear} />
      {children}
    </>
  );
};

export default withRouter(PageWrapper);
