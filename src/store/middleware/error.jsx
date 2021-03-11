import { errorActions } from '../errors';

const getTypePrefix = (action) =>
  action.type.substring(0, action.type.lastIndexOf('/'));

const addError = ({ dispatch, getState }) => (next) => (action) => {
  const { error } = action;
  const typePrefix = getTypePrefix(action);
  if (error) {
    const payload = { [typePrefix]: action.payload };
    dispatch(errorActions.addError(payload));
  } else if (action.type !== errorActions.clearErrors.type) {
    const state = getState();
    if (typePrefix in state.errors) {
      dispatch(errorActions.clearErrors(typePrefix));
    }
  }
  next(action);
};

export default [addError];
