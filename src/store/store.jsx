import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from './reducer';

export default function (history) {
  return configureStore({
    reducer: reducer(history),
    middleware: [...getDefaultMiddleware()],
  });
}
