/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import apiActions from './apiActions';

const { createGame, getGameDetail, joinGame, listGames } = apiActions;

const gameAdapter = createEntityAdapter({
  // Sort games by createdAt
  sortComparer: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
});

const setLoading = (state, loading) => {
  state.loading = loading;
};

const initialState = gameAdapter.getInitialState({
  loading: false,
  loaded: false,
});

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    normalizedGamesReceived: (state, action) => {
      gameAdapter.setAll(state, action.payload);
      state.loading = false;
    },
    addPiece: (state, { payload }) => {
      const { id, piece } = payload;
      const game = state.entities[id];
      game.pieces.push(piece);
    },
    removePiece: (state, { payload }) => {
      const { id, piece } = payload;
      const game = state.entities[id];
      game.pieces = game.pieces.filter((p) => p !== piece);
    },
    clearGames: () => {
      return initialState;
    },
  },
  extraReducers: {
    [getGameDetail.pending]: (state, action) => {
      const { slug } = action.meta.arg;
      const existingGame = Object.values(state.entities).find((obj) => {
        return obj.slug === slug;
      });
      const changes = { loading: true };
      if (existingGame) {
        gameAdapter.updateOne(state, { id: existingGame.id, changes });
      }
    },
    [getGameDetail.fulfilled]: (state, { payload }) => {
      const changes = { ...payload, loading: false, detailLoaded: true };
      gameAdapter.upsertOne(state, changes);
    },
    [listGames.pending]: (state) => {
      state.loading = true;
    },
    [listGames.fulfilled]: (state) => {
      state.loading = false;
      state.loaded = true;
    },
    [getGameDetail.rejected]: (state) => setLoading(state, false),
    [listGames.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default gameSlice.reducer;

const adapterSelectors = gameAdapter.getSelectors(
  (state) => state.entities.games
);

const selectBySlug = createSelector(
  (_, slug) => slug,
  adapterSelectors.selectAll,
  (slug, games) => {
    return games.find((g) => g.slug === slug);
  }
);

export const gameSelectors = {
  ...adapterSelectors,
  selectBySlug,
};

export const gameActions = {
  ...gameSlice.actions,
  createGame,
  getGameDetail,
  listGames,
  joinGame,
};
