import { screen } from '@testing-library/react';

import { errorMessages } from '../src/copy';
import { createGame } from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  Selectors,
  basicBeforeEach,
  logIn,
  renderApp,
  useHandlers,
  userClicksElement,
  userSeesAlert,
  userSeesElement,
} from './testUtils';

beforeEach(() => {
  basicBeforeEach();
  logIn();
});

describe('Create game', () => {
  it('display nav items', async () => {
    renderApp().push('/create-game');
    screen.getByTitle('Home');
    screen.getByTitle('Home Icon Button');
    screen.getByTitle('Create game');
    screen.getByTitle('Menu');
  });

  it('redirect to browse game on success', async () => {
    useHandlers([urlConf.createGame, createGame.success]);
    renderApp().push('/create-game');
    userClicksElement('Create Game', Selectors.FormButton);
    await userSeesAlert('Game "" created!');
    await userSeesElement('Diplomacy', Selectors.Header);
  });

  it('display error on invalid name', async () => {
    useHandlers([urlConf.createGame, createGame.errorNameTooLong]);
    renderApp().push('/create-game');
    userClicksElement('Create Game', Selectors.FormButton);
    await userSeesAlert(errorMessages.createGameNameTooLong);
  });

  it('display error on server error', async () => {
    useHandlers([urlConf.createGame, createGame.errorServerError]);
    renderApp().push('/create-game');
    userClicksElement('Create Game', Selectors.FormButton);
    await userSeesAlert(errorMessages.internalServerError);
  });
});
