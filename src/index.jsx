import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';

import App from './views/App';
import globals from './globals';

ReactDOM.render(
  <>
    <Global styles={globals} />
    <App />
  </>,
  document.getElementById('root')
);
