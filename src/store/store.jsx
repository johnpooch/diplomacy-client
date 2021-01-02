import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';

import reducer from './reducer';
import gameMiddleware from './middleware/game';
import orderMiddleware from './middleware/order';
import pieceMiddleware from './middleware/piece';
import variantMiddleware from './middleware/variant';

export default function (history) {
  return configureStore({
    reducer: reducer(history),
    middleware: [
      routerMiddleware(history), // for dispatching history actions
      ...getDefaultMiddleware(),
      ...gameMiddleware,
      ...orderMiddleware,
      ...pieceMiddleware,
      ...variantMiddleware,
    ],
  });
}
