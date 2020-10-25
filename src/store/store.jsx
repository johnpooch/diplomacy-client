import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';

import reducer from './reducer';
import gameMiddleware from './middleware/game';
import variantMiddleware from './middleware/variant';

export default function (history) {
  return configureStore({
    reducer: reducer(history),
    middleware: [
      routerMiddleware(history), // for dispatching history actions
      ...getDefaultMiddleware(),
      ...gameMiddleware,
      ...variantMiddleware,
    ],
  });
}
