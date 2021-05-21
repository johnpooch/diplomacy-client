import '@testing-library/jest-dom/extend-expect';

import { errorMessages } from '../src/copy';
import { changePassword } from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  Selectors,
  logIn,
  renderApp,
  useHandlers,
  userClicksElement,
  userSeesAlert,
  userSeesElement,
} from './testUtils';

const startingUrl = '/user-settings';

describe('Change Password', () => {
  it('redirect to login if not authorized', async () => {
    renderApp().push(startingUrl);
    await userSeesElement('Login', Selectors.FormHeader);
  });

  it('redirect to log in and display message on success', async () => {
    useHandlers([urlConf.changePassword, changePassword.success]);
    logIn();
    renderApp().push(startingUrl);

    await userSeesElement('Change Password', Selectors.FormHeader);
    userClicksElement('Change Password', Selectors.FormButton);
    await userSeesAlert('Password updated!');
  });

  it('display error when incorrect password', async () => {
    useHandlers([
      urlConf.changePassword,
      changePassword.errorIncorrectPassword,
    ]);
    logIn();
    renderApp().push(startingUrl);
    userClicksElement('Change Password', Selectors.FormButton);
    await userSeesAlert(errorMessages.changePasswordIncorrectPassword);
  });

  it('display error on passwords not matching', async () => {
    useHandlers([
      urlConf.changePassword,
      changePassword.errorPasswordsDoNotMatch,
    ]);
    logIn();
    renderApp().push(startingUrl);
    userClicksElement('Change Password', Selectors.FormButton);
    await userSeesAlert(errorMessages.changePasswordPasswordsDoNotMatch);
  });

  it('display error on server error', async () => {
    useHandlers([urlConf.changePassword, changePassword.errorServerError]);
    logIn();
    renderApp().push(startingUrl);
    userClicksElement('Change Password', Selectors.FormButton);
    await userSeesAlert(errorMessages.internalServerError);
  });
});
