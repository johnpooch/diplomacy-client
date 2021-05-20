import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

import { AlertComponentProps } from './Alert.types';

export const Alert: React.FC<AlertComponentProps> = ({ alert, onClose }) => {
  const { category, id, message } = alert;
  return (
    <MuiAlert severity={category} onClose={() => onClose(id)}>
      {message}
    </MuiAlert>
  );
};

export default Alert;
