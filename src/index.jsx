import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './views/App';
import globals from './globals';
import configureStore, { history } from './store/store';

const store = configureStore();

const app = (
  <Provider store={store}>
    <Global styles={globals} />
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
