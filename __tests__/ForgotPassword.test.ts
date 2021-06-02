import { errorMessages } from '../src/copy';
import { resetPassword } from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  Selectors,
  renderApp,
  useHandlers,
  userClicksElement,
  userFillsForm,
  userSeesElement,
  userSeesAlert,
} from './testUtils';

const startingUrl = '/forgot-password';

describe('Forgot Password', () => {
  it('redirect to log in and display message on success', async () => {
    useHandlers([urlConf.resetPassword, resetPassword.success]);
    renderApp().push(startingUrl);
    userFillsForm({ Email: 'fakeaddress@fake.com' });
    userClicksElement('Send reset link', Selectors.FormButton);
    await userSeesElement('Login', Selectors.FormHeader);
    await userSeesAlert(
      'Thanks! Please check fakeaddress@fake.com for a link to reset your password.'
    );
  });

  it('display error when no matching email exists', async () => {
    useHandlers([urlConf.resetPassword, resetPassword.errorNoMatchingAccount]);
    renderApp().push(startingUrl);
    userFillsForm({ Email: 'fakeaddress@fake.com' });
    userClicksElement('Send reset link', Selectors.FormButton);
    await userSeesAlert(
      'There is no active user associated with this e-mail address or the password can not be changed'
    );
  });

  it('display error on server error', async () => {
    useHandlers([urlConf.resetPassword, resetPassword.errorServerError]);
    renderApp().push(startingUrl);
    userFillsForm({ Email: 'fakeaddress@fake.com' });
    userClicksElement('Send reset link', Selectors.FormButton);
    await userSeesAlert(errorMessages.internalServerError);
  });

  it('redirect to log in when link is clicked', async () => {
    renderApp().push(startingUrl);
    userClicksElement('Log in', Selectors.FormLink);
    await userSeesElement('Login', Selectors.FormHeader);
  });

  it('redirect to register when link is clicked', async () => {
    renderApp().push(startingUrl);
    userClicksElement('Create an account', Selectors.FormLink);
    await userSeesElement('Register', Selectors.FormHeader);
  });
});
