import variantNormalizer from '../normalizers/variantNormalizer';

import { mapDataActions } from '../mapData';
import { namedCoastActions } from '../namedCoasts';
import { namedCoastDataActions } from '../namedCoastData';
import { nationActions } from '../nations';
import { territoryActions } from '../territories';
import { territoryDataActions } from '../territoryData';
import { variantActions } from '../variants';

const normalizeVariants = ({ dispatch }) => (next) => (action) => {
  /*
  When variants list is received, normalize data and dispatch actions for each
  entity.
  */

  if (action.type === variantActions.getVariants.fulfilled.type) {
    const { entities } = variantNormalizer(action.payload);
    const {
      variants,
      nations,
      territories,
      map_data: mapData,
      territory_data: territoryData,
      named_coasts: namedCoasts,
      named_coast_data: namedCoastData,
    } = entities;
    dispatch(territoryActions.territoriesReceived(territories));
    dispatch(nationActions.nationsReceived(nations));
    dispatch(mapDataActions.mapDataReceived(mapData));
    dispatch(territoryDataActions.territoryDataReceived(territoryData));
    dispatch(namedCoastActions.namedCoastsReceived(namedCoasts));
    dispatch(namedCoastDataActions.namedCoastDataReceived(namedCoastData));
    next(variantActions.getVariants.fulfilled(variants));
  } else {
    next(action);
  }
};

export default [normalizeVariants];
