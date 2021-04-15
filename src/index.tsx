import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import worker from './mocks/browser';
import configureStore from './store/store';
import App from './views/App';

if (process.env.USE_MOCK_SERVICE_WORKER) {
  worker.start();
}

const history = createBrowserHistory();
const store = configureStore(history);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
