import { isFulfilled } from '@reduxjs/toolkit';

import messages from '../../apiSuccessMessages';
import { alertActions } from '../alerts';

const addSuccessMessage = ({ dispatch, getState }) => (next) => (action) => {
  if (isFulfilled(action)) {
    const messageConf = messages[action.type];
    if (messageConf) {
      const { getMessage, pending } = messageConf;
      const state = getState();
      const message = getMessage(state, action);
      const category = 'success';
      dispatch(alertActions.alertsAdd({ message, category, pending }));
    }
  }
  next(action);
};

export default [addSuccessMessage];
