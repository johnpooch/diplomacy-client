import { errorMessages } from '../src/copy';
import { resetPasswordConfirm } from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  Selectors,
  renderApp,
  useHandlers,
  userClicksElement,
  userSeesElement,
  userSeesAlert,
} from './testUtils';

const startingUrl = '/reset-password?token=1234';

describe('Reset Password', () => {
  it('redirect to login if no token', async () => {
    renderApp().push('/reset-password');
    await userSeesElement('Login', Selectors.FormHeader);
  });

  it('redirect to log in and display message on success', async () => {
    useHandlers([urlConf.resetPasswordConfirm, resetPasswordConfirm.success]);
    renderApp().push(startingUrl);
    userClicksElement('Reset Password', Selectors.FormButton);
    await userSeesAlert('Password updated!');
  });

  it('display error on server error', async () => {
    useHandlers([
      urlConf.resetPasswordConfirm,
      resetPasswordConfirm.errorServerError,
    ]);
    renderApp().push(startingUrl);
    userClicksElement('Reset Password', Selectors.FormButton);
    await userSeesAlert(errorMessages.internalServerError);
  });
});
