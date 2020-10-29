import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import App from './views/App';
import globals from './globals';
import configureStore from './store/store';

const history = createBrowserHistory();
const store = configureStore(history);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Global styles={globals} />
      <App />
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
