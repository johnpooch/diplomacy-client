import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';

import App from 'Views/App/App.jsx';
import globals from './globals';

ReactDOM.render(
  <>
    <Global styles={globals} />
    <App target="world" />
  </>,
  document.getElementById('root')
);
