import { fireEvent, waitFor, screen } from '@testing-library/react';

import { errorMessages } from '../src/copy';
import { register } from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  renderApp,
  successMessages,
  testElements,
  useHandlers,
} from './testUtils';

const startingUrl = '/register';

describe('Register', () => {
  it('redirect to browse and display message on success', async () => {
    useHandlers([urlConf.register, register.success]);
    renderApp().push(startingUrl);
    fireEvent.click(testElements.registerButton());
    await waitFor(() => screen.getByRole('alert'));
    await waitFor(() => screen.getByTitle('home'));
    expect(screen.getByText(successMessages.register()));
  });
  it('display error when user with email already exists', async () => {
    useHandlers([urlConf.register, register.errorUserWithEmailExists]);
    renderApp().push(startingUrl);
    fireEvent.click(testElements.registerButton());
    // Expect to see error message
    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByText(errorMessages.registerEmailAlreadyExists));
  });
  it('display error when user with username already exists', async () => {
    useHandlers([urlConf.register, register.errorUserWithUsernameExists]);
    renderApp().push(startingUrl);
    fireEvent.click(testElements.registerButton());
    // Expect to see error message
    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByText(errorMessages.registerUsernameAlreadyExists));
  });
  it('display error when invalid password is given', async () => {
    return true; // TODO fix this
  });
  it('redirect to reset password when link is clicked', async () => {
    renderApp().push(startingUrl);
    const resetPasswordLink = screen.getByText('Reset password');
    fireEvent.click(resetPasswordLink);
    await waitFor(testElements.sendResetLinkButton);
  });
  it('redirect to log in when link is clicked', async () => {
    renderApp().push(startingUrl);
    const loginLink = screen.getByText('Log in');
    fireEvent.click(loginLink);
    // Expect to see log in button
    await waitFor(() => testElements.loginButton());
  });
});
