import variantService from '../services/variant';
import variantNormalizer from './normalizers/variantNormalizer';

import { mapDataReceived } from './mapData';
import { namedCoastsReceived } from './namedCoasts';
import { namedCoastDataReceived } from './namedCoastData';
import { nationsReceived } from './nations';
import { territoriesReceived } from './territories';
import { territoryDataReceived } from './territoryData';

const VARIANTS_RECEIVED = 'VARIANTS_RECEIVED';
const VARIANTS_REQUESTED = 'VARIANTS_REQUESTED';
const VARIANTS_REQUEST_FAILED = 'VARIANTS_REQUEST_FAILED';

export const variantsReceived = (payload) => ({
  type: VARIANTS_RECEIVED,
  payload,
});

export const variantsRequested = () => ({
  type: VARIANTS_REQUESTED,
});

export const variantsRequestFailed = () => ({
  type: VARIANTS_REQUEST_FAILED,
});

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
};

const variantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case VARIANTS_RECEIVED: {
      const { payload } = action;
      const byId = payload;
      const allIds = Object.values(payload).map((value) => value.id);
      return { loading: false, byId, allIds };
    }
    case VARIANTS_REQUESTED:
      return { ...state, loading: true };
    case VARIANTS_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Public actions
const loadVariants = (token) => {
  return (dispatch) => {
    dispatch(variantsRequested());
    variantService.listVariants(token).then(
      (payload) => {
        const { entities } = variantNormalizer(payload);
        const {
          variants,
          nations,
          territories,
          map_data: mapData,
          territory_data: territoryData,
          named_coasts: namedCoasts,
          named_coast_data: namedCoastData,
        } = entities;
        dispatch(variantsReceived(variants));
        dispatch(territoriesReceived(territories));
        dispatch(nationsReceived(nations));
        dispatch(mapDataReceived(mapData));
        dispatch(territoryDataReceived(territoryData));
        dispatch(namedCoastsReceived(namedCoasts));
        dispatch(namedCoastDataReceived(namedCoastData));
      },
      () => {
        dispatch(variantsRequestFailed());
      }
    );
  };
};

export const variantActions = {
  loadVariants,
};

export default variantsReducer;
