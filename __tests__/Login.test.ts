import { errorMessages } from '../src/copy';
import { login } from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  Selectors,
  renderApp,
  useHandlers,
  userClicksElement,
  userSeesElement,
  userSeesAlert,
} from './testUtils';

describe('Login', () => {
  it('redirect to main page success', async () => {
    useHandlers([urlConf.login, login.success]);
    renderApp();
    userClicksElement('Log in', Selectors.FormButton);
    await userSeesElement('Diplomacy', Selectors.Header);
  });

  it('display error when no matching account', async () => {
    useHandlers([urlConf.login, login.errorNoMatchingAccount]);
    renderApp();
    userClicksElement('Log in', Selectors.FormButton);
    await userSeesAlert(errorMessages.loginNoMatchingAccount);
  });

  it('display error on server error', async () => {
    useHandlers([urlConf.login, login.errorServerError]);
    renderApp();
    userClicksElement('Log in', Selectors.FormButton);
    await userSeesAlert(errorMessages.internalServerError);
  });

  it('redirect to reset password when link is clicked', async () => {
    renderApp();
    userClicksElement('Reset password', Selectors.FormLink);
    await userSeesElement('Forgot Password', Selectors.FormHeader);
  });

  it('redirect to create account when link is clicked', async () => {
    renderApp();
    userClicksElement('Create an account', Selectors.FormLink);
    await userSeesElement('Register', Selectors.FormHeader);
  });
});
