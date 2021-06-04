import { createSlice } from '@reduxjs/toolkit';

import { BrowseGameFilterChoices } from '../types';

const initialState = { browseGameFilter: BrowseGameFilterChoices.ALL_GAMES };

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setBrowseGameFilter: (state, { payload: browseGameFilter }) => {
      return {
        ...state,
        browseGameFilter,
      };
    },
  },
});

export default uiSlice.reducer;
