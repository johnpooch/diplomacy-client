import { loadFlags } from '../flags';
import configureStore from '../store';

const mockFlag = JSON.stringify([
  {
    id: 1,
    flag_as_data: [
      {
        fill: '#20659a',
        path: 'M163.74,82.62,252.39,24.1V138Z',
      },
    ],
  },
]);

describe('flagSlice', () => {
  describe('action creators', () => {
    it('should handle the loadFlags action', async () => {
      fetch.mockResponseOnce([mockFlag]);
      const mockHistory = { location: '/' };
      const store = configureStore(mockHistory);
      store.dispatch(loadFlags());
      const state = store.getState();
      expect(state.entities.flags).toEqual({
        list: [{ fill: '#20659a', path: 'M163.74,82.62,252.39,24.1V138Z' }],
        loading: false,
      });
    });
  });
});
