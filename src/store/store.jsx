import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';

import reducer from './reducer';
import errorMiddleware from './middleware/error';
import gameMiddleware from './middleware/game';
import orderMiddleware from './middleware/order';
import pieceMiddleware from './middleware/piece';
import successMiddleware from './middleware/success';
import variantMiddleware from './middleware/variant';

export default function (history) {
  return configureStore({
    reducer: reducer(history),
    middleware: [
      routerMiddleware(history), // for dispatching history actions
      ...getDefaultMiddleware(),
      ...errorMiddleware,
      ...gameMiddleware,
      ...orderMiddleware,
      ...pieceMiddleware,
      ...successMiddleware,
      ...variantMiddleware,
    ],
  });
}
