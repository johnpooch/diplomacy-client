import { fireEvent, waitFor, screen } from '@testing-library/react';

import { errorMessages, successMessages } from '../src/copy';
import { urlConf } from '../src/urls';
import { resetPassword } from '../src/mocks/resolvers';
import { renderApp, testElements, useHandlers } from './testUtils';

const email = 'fakeaddress@fake.com';
const startingUrl = '/forgot-password';

describe('Forgot Password', () => {
  it('redirect to log in and display message on success', async () => {
    useHandlers([urlConf.resetPassword, resetPassword.success]);
    renderApp().push(startingUrl);
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: email } });
    fireEvent.click(testElements.sendResetLinkButton());
    // Expect to be redirected to login page and see success alert
    await waitFor(testElements.loginButton);
    await waitFor(() =>
      screen.getByText(
        successMessages.passwordResetLinkSent.replace('%s', email)
      )
    );
  });

  it('display error when no matching email exists', async () => {
    useHandlers([urlConf.resetPassword, resetPassword.errorNoMatchingAccount]);
    renderApp().push(startingUrl);
    fireEvent.click(testElements.sendResetLinkButton());
    // Expect to see error message
    await waitFor(() => screen.getByRole('alert'));
    expect(
      screen.getByText(
        'There is no active user associated with this e-mail address or the password can not be changed'
      )
    );
  });

  it('display error on server error', async () => {
    useHandlers([urlConf.resetPassword, resetPassword.errorServerError]);
    renderApp().push(startingUrl);
    fireEvent.click(testElements.sendResetLinkButton());
    await waitFor(() => {
      const error = screen.getByRole('alert');
      expect(error.text === errorMessages.internalServerError);
    });
  });

  it('redirect to log in when link is clicked', async () => {
    renderApp().push(startingUrl);
    const link = screen.getByText('Log in');
    fireEvent.click(link);
    await waitFor(testElements.loginButton);
  });

  it('redirect to register when link is clicked', async () => {
    renderApp().push(startingUrl);
    const link = screen.getByText('Create an account');
    fireEvent.click(link);
    await waitFor(testElements.registerButton);
  });
});
