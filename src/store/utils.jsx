export const getNextId = (state) => {
  return state.ids.length !== 0 ? state.ids[state.ids.length - 1] + 1 : 1;
};

export default {
  getNextId,
};
