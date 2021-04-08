import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import { errorMessages } from '../src/copy';
import { urlConf } from '../src/urls';
import { changePassword } from '../src/mocks/resolvers';
import {
  logIn,
  renderApp,
  successMessages,
  testElements,
  useHandlers,
} from './testUtils';

const startingUrl = '/user-settings';

describe('Change Password', () => {
  it('redirect to login if not authorized', async () => {
    renderApp().push(startingUrl);
    await waitFor(testElements.loginButton);
  });

  it('redirect to log in and display message on success', async () => {
    useHandlers([urlConf.changePassword, changePassword.success]);
    logIn();
    renderApp().push(startingUrl);

    const heading = await waitFor(() => screen.getByRole('heading'));
    expect(heading).toHaveTextContent('Change password');
    screen.getByLabelText('Current password');
    screen.getByLabelText('New password');
    screen.getByLabelText('Confirm new password');
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => screen.getByText(successMessages.changePassword()));
  });

  it('display error when incorrect password', async () => {
    useHandlers([
      urlConf.changePassword,
      changePassword.errorIncorrectPassword,
    ]);
    logIn();
    renderApp().push(startingUrl);
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() =>
      screen.getByText(errorMessages.changePasswordIncorrectPassword)
    );
  });

  it('display error on passwords not matching', async () => {
    useHandlers([
      urlConf.changePassword,
      changePassword.errorPasswordsDoNotMatch,
    ]);
    logIn();
    renderApp().push(startingUrl);
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() =>
      screen.getByText(errorMessages.changePasswordPasswordsDoNotMatch)
    );
  });

  it('display error on server error', async () => {
    useHandlers([urlConf.changePassword, changePassword.errorServerError]);
    logIn();
    renderApp().push(startingUrl);
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => screen.getByText(errorMessages.internalServerError));
  });
});
