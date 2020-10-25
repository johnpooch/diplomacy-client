/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { gameSelectors } from './games';

const userAdapter = createEntityAdapter();

const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    usersReceived: userAdapter.setAll,
  },
});

export const userActions = {
  ...userSlice.actions,
};

const adapterSelectors = userAdapter.getSelectors(
  (state) => state.entities.users
);

const selectByGameId = createSelector(
  gameSelectors.selectById,
  adapterSelectors.selectAll,
  (game, users) => users.filter((t) => game.users.includes(t.id))
);

export const userSelectors = {
  ...adapterSelectors,
  selectByGameId,
};

export default userSlice.reducer;
