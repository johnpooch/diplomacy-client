import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import {applyMiddleware, compose, createStore} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import App from './views/App';
import globals from './globals';
import reducer from './store/reducers/auth';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <Global styles={globals} />
    <App/>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
