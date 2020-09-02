import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from './reducer';
import apiMiddleware from './middleware/api';
import gameMiddleware from './middleware/game';

export default function (history) {
  return configureStore({
    reducer: reducer(history),
    middleware: [
      ...getDefaultMiddleware(),
      ...gameMiddleware,
      ...apiMiddleware,
    ],
  });
}
