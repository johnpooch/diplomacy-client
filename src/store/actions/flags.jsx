import { flagConstants } from './actionTypes';
import flagService from '../../services/flag';

function getFlags() {
  return (dispatch) => {
    dispatch({ type: flagConstants.FLAGS_REQUEST });
    flagService.listFlags().then(
      (response) => {
        const data = response;
        const reformattedData = {};
        data.forEach((item) => {
          reformattedData[item.id] = item.flag_as_data;
        });
        dispatch({ type: flagConstants.FLAGS_SUCCESS, data: reformattedData });
      },
      () => {
        dispatch({ type: flagConstants.FLAGS_FAILURE });
      }
    );
  };
}

function shouldGetFlags(state) {
  const { flags } = state;
  return !flags;
}

function getFlagsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldGetFlags(getState())) {
      return dispatch(getFlags());
    }
    return Promise.resolve();
  };
}

const flagActions = {
  getFlags,
  getFlagsIfNeeded,
};

export default flagActions;
