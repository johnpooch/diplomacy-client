import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { responsiveStoreEnhancer } from 'redux-responsive';

import errorMiddleware from './middleware/error';
import gameMiddleware from './middleware/game';
import orderMiddleware from './middleware/order';
import successMiddleware from './middleware/success';
import variantMiddleware from './middleware/variant';
import reducer from './reducer';

export default (history) => {
  return configureStore({
    reducer: reducer(history),
    enhancers: [responsiveStoreEnhancer],
    middleware: [
      routerMiddleware(history), // for dispatching history actions
      ...getDefaultMiddleware(),
      ...errorMiddleware,
      ...gameMiddleware,
      ...orderMiddleware,
      ...successMiddleware,
      ...variantMiddleware,
    ],
  });
};
