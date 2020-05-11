import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './views/App';
import globals from './globals';
import store from './store/store';

const app = (
  <Provider store={store}>
    <Global styles={globals} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
