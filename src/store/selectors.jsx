import { createSelector } from '@reduxjs/toolkit';

import territoryData from '../data/standard/territories.json';
import { territoryStateSelectors } from './territoryStates';

export const makeSelectTerritoryById = () =>
  createSelector(
    (_, id) => territoryData.find((t) => t.territoryMapDataId === id),
    (state) => state.entities.territories.entities,
    (state, _, turnId) => () =>
      territoryStateSelectors.selectByTurnId(state, turnId),
    (territoryMapData, territories, territoryStates) => {
      const territory = territories[territoryMapData.territoryUID];
      const territoryState = territory
        ? territoryStates().find((ts) => ts.territory === territory.id)
        : null;
      const playable = Boolean(territory);
      return { playable, ...territoryState, ...territoryMapData, ...territory };
    }
  );
