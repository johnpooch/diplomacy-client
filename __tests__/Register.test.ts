import { errorMessages } from '../src/copy';
import { register } from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  Selectors,
  renderApp,
  useHandlers,
  userClicksElement,
  userSeesElement,
  userSeesAlert,
} from './testUtils';

const startingUrl = '/register';

describe('Register', () => {
  it('redirect to browse and display message on success', async () => {
    useHandlers([urlConf.register, register.success]);
    renderApp().push(startingUrl);
    userClicksElement('Register', Selectors.FormButton);
    await userSeesAlert('Account created! Welcome testuser');
    await userSeesElement('Diplomacy', Selectors.Header);
  });
  it('display error when user with email already exists', async () => {
    useHandlers([urlConf.register, register.errorUserWithEmailExists]);
    renderApp().push(startingUrl);
    userClicksElement('Register', Selectors.FormButton);
    await userSeesAlert(errorMessages.registerEmailAlreadyExists);
  });
  it('display error when user with username already exists', async () => {
    useHandlers([urlConf.register, register.errorUserWithUsernameExists]);
    renderApp().push(startingUrl);
    userClicksElement('Register', Selectors.FormButton);
    await userSeesAlert(errorMessages.registerUsernameAlreadyExists);
  });
  it('display error when invalid password is given', async () => {
    return true; // TODO fix this
  });
  it('redirect to reset password when link is clicked', async () => {
    renderApp().push(startingUrl);
    userClicksElement('Reset password', Selectors.FormLink);
    await userSeesElement('Forgot Password', Selectors.FormHeader);
  });
  it('redirect to log in when link is clicked', async () => {
    renderApp().push(startingUrl);
    userClicksElement('Log in', Selectors.FormLink);
    await userSeesElement('Login', Selectors.FormHeader);
  });
});
