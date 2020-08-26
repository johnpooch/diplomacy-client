import variantService from '../services/variant';
import { territoriesReceived } from './territories';

const VARIANTS_RECEIVED = 'VARIANTS_RECEIVED';
const VARIANTS_REQUESTED = 'VARIANTS_REQUESTED';
const VARIANTS_REQUEST_FAILED = 'VARIANTS_REQUEST_FAILED';

// Action creators
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

const normalizeVariant = (variant) => {
  const normalizedVariant = variant;
  normalizedVariant.territories = normalizedVariant.territories.map(
    (territory) => territory.id
  );
  normalizedVariant.nations = normalizedVariant.nations.map(
    (nation) => nation.id
  );
  normalizedVariant.map_data = normalizedVariant.map_data.map((m) => {
    const { id, width, height } = m;
    return {
      id,
      width,
      height,
    };
  });
  return normalizedVariant;
};

// Reducer
const variants = (state = initialState, action) => {
  switch (action.type) {
    case VARIANTS_RECEIVED: {
      const { payload } = action;
      const byId = {};
      const allIds = [];
      payload.forEach((variant) => {
        const { id } = variant;
        const normalizedVariant = normalizeVariant(variant);
        byId[id] = normalizedVariant;
        allIds.push(id);
      });
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
        let territories = [];
        payload.forEach((variant) => {
          territories = [...territories, ...variant.territories];
        });

        dispatch(variantsReceived(payload));
        dispatch(territoriesReceived(territories));
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

export default variants;
