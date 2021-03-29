import { fireEvent, waitFor, screen } from '@testing-library/react';

import { urlConf } from '../src/urls';
import { login } from '../src/mocks/resolvers';
import { errorMessages } from '../src/copy';
import { renderApp, testElements, useHandlers } from './testUtils';

describe('Login', () => {
  it('redirect to main page success', async () => {
    useHandlers([urlConf.login, login.success]);
    renderApp();
    fireEvent.click(testElements.loginButton());
    await waitFor(() => screen.getByTitle('home'));
  });

  it('display error when no matching account', async () => {
    useHandlers([urlConf.login, login.errorNoMatchingAccount]);
    renderApp();
    fireEvent.click(testElements.loginButton());
    // Expect to see error message
    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByText(errorMessages.loginNoMatchingAccount));
  });

  it('display error on server error', async () => {
    useHandlers([urlConf.login, login.errorServerError]);
    renderApp();
    fireEvent.click(testElements.loginButton());
    await waitFor(() => {
      const error = screen.getByRole('alert');
      expect(error.text === errorMessages.internalServerError);
    });
  });

  it('redirect to reset password when link is clicked', async () => {
    renderApp();
    const resetPasswordLink = screen.getByText('Reset password');
    fireEvent.click(resetPasswordLink);
    await waitFor(testElements.sendResetLinkButton);
  });

  it('redirect to create account when link is clicked', async () => {
    renderApp();
    const createAnAccountLink = screen.getByText('Create an account');
    fireEvent.click(createAnAccountLink);
    await waitFor(testElements.registerButton);
  });
});
