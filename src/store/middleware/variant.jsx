import { namedCoastActions } from '../namedCoasts';
import { nationActions } from '../nations';
import variantNormalizer from '../normalizers/variantNormalizer';
import { territoryActions } from '../territories';
import { variantActions } from '../variants';

const normalizeVariants = ({ dispatch }) => (next) => (action) => {
  /*
  When variants list is received, normalize data and dispatch actions for each
  entity.
  */

  if (action.type === variantActions.listVariants.fulfilled.type) {
    const { entities } = variantNormalizer(action.payload);
    const { variants, nations, territories, namedCoasts } = entities;
    dispatch(territoryActions.territoriesReceived(territories));
    dispatch(nationActions.nationsReceived(nations));
    dispatch(namedCoastActions.namedCoastsReceived(namedCoasts));
    next(variantActions.listVariants.fulfilled(variants));
  } else {
    next(action);
  }
};

export default [normalizeVariants];
