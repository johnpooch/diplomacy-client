import { useTheme } from '@material-ui/core';
import React from 'react';

import Alert from '../Alert';

import useStyles from './AlertList.styles';
import { AlertListComponentProps } from './AlertList.types';

const AlertList: React.FC<AlertListComponentProps> = ({ alerts, onClose }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <ul className={classes.root}>
      {alerts.map((alert) => (
        <li key={alert.id}>
          <Alert alert={alert} onClose={onClose} />
        </li>
      ))}
    </ul>
  );
};

export default AlertList;
