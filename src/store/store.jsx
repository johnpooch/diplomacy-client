import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from './reducer';
import api from './middleware/api';

export default function (history) {
  return configureStore({
    reducer: reducer(history),
    middleware: [...getDefaultMiddleware(), api],
  });
}
