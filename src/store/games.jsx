/* eslint-disable no-param-reassign */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { apiRequest, getOptions, urls } from './api';

const createGame = createAsyncThunk(
  'games/createGameStatus',
  async ({ token, data }, thunkApi) => {
    const url = urls.CREATE_GAME;
    const options = getOptions(token, 'POST', data);
    return apiRequest(url, options, thunkApi);
  }
);

const joinGame = createAsyncThunk(
  'games/joinGameStatus',
  async ({ token, slug }, thunkApi) => {
    const url = urls.JOIN_GAME.replace('<game>', slug);
    const options = getOptions(token, 'PATCH');
    return apiRequest(url, options, thunkApi);
  }
);

const leaveGame = createAsyncThunk(
  'games/joinGameStatus',
  async ({ token, slug }, thunkApi) => {
    const url = urls.JOIN_GAME.replace('<game>', slug);
    const options = getOptions(token, 'PATCH');
    return apiRequest(url, options, thunkApi);
  }
);

const getGameDetail = createAsyncThunk(
  'games/getGameDetailStatus',
  async ({ token, slug }, thunkApi) => {
    const url = urls.GAME_STATE.replace('<game>', slug);
    const options = getOptions(token);
    return apiRequest(url, options, thunkApi);
  }
);

const getGames = createAsyncThunk(
  'games/getGamesStatus',
  async ({ token, filters }, thunkApi) => {
    let url = urls.ALL_GAMES;
    if (filters) {
      const queryParams = new URLSearchParams(filters).toString();
      url = url.concat(`?${queryParams}`);
    }
    const options = getOptions(token);
    return apiRequest(url, options, thunkApi);
  }
);

const gameAdapter = createEntityAdapter({
  // Sort games by createdAt
  sortComparer: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
});

const setLoading = (state, loading) => {
  state.loading = loading;
};

const gameSlice = createSlice({
  name: 'games',
  initialState: gameAdapter.getInitialState({
    loading: false,
    browseGamesLoaded: false,
  }),
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
  },
  extraReducers: {
    [getGameDetail.pending]: (state, action) => {
      const { slug } = action.meta.arg;
      const existingGame = Object.values(state.entities).find((obj) => {
        return obj.slug === slug;
      });
      const changes = { loading: true, detailLoaded: false };
      if (existingGame) {
        gameAdapter.updateOne(state, { id: existingGame.id, changes });
      }
    },
    [getGameDetail.fulfilled]: (state, { payload }) => {
      const changes = { ...payload, loading: false, detailLoaded: true };
      gameAdapter.upsertOne(state, changes);
    },
    [getGames.pending]: (state) => {
      state.loading = true;
      state.browseGamesLoaded = false;
    },
    [getGames.fulfilled]: (state) => {
      state.loading = false;
      state.browseGamesLoaded = true;
    },
    [getGameDetail.rejected]: (state) => setLoading(state, false),
  },
});

export default gameSlice.reducer;

const adapterSelectors = gameAdapter.getSelectors(
  (state) => state.entities.games
);

const selectBySlug = (state, slug) => {
  const allGames = adapterSelectors.selectAll(state);
  return allGames.find((g) => g.slug === slug);
};

export const gameSelectors = {
  ...adapterSelectors,
  selectBySlug,
};

export const gameActions = {
  ...gameSlice.actions,
  createGame,
  getGameDetail,
  getGames,
  joinGame,
  leaveGame,
};
