import { fireEvent, waitFor, screen } from '@testing-library/react';

import { errorMessages } from '../src/copy';
import { resetPasswordConfirm } from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  renderApp,
  successMessages,
  testElements,
  useHandlers,
} from './testUtils';

const startingUrl = '/reset-password?token=1234';

describe('Reset Password', () => {
  it('redirect to log in and display message on success', async () => {
    useHandlers([urlConf.resetPasswordConfirm, resetPasswordConfirm.success]);
    renderApp().push(startingUrl);
    fireEvent.click(testElements.resetPasswordButton());
    await waitFor(() => testElements.loginButton());
    await waitFor(() =>
      screen.getByText(successMessages.resetPasswordConfirm())
    );
  });

  it('display error on server error', async () => {
    useHandlers([
      urlConf.resetPasswordConfirm,
      resetPasswordConfirm.errorServerError,
    ]);
    renderApp().push(startingUrl);
    fireEvent.click(testElements.resetPasswordButton());
    await waitFor(() => {
      const error = screen.getByRole('alert');
      expect(error.text === errorMessages.internalServerError);
    });
  });
});
