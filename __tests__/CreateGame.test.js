import { fireEvent, waitFor, screen } from '@testing-library/react';

import { urlConf } from '../src/urls';
import {
  createGame,
  getGameFilterChoices,
  listGames,
  listVariants,
} from '../src/mocks/resolvers';
import { errorMessages, infoMessages } from '../src/copy';
import {
  basicBeforeEach,
  fillForm,
  logIn,
  renderApp,
  successMessages,
  testElements,
  useHandlers,
} from './testUtils';

beforeEach(() => {
  basicBeforeEach();
  logIn();
});

describe('Create game', () => {
  it('redirect to pre-game on success', async () => {
    useHandlers([urlConf.createGame, createGame.success]);
    renderApp().push('/create-game');
    fillForm('Name', 'Description');
    fireEvent.click(testElements.createGameButton());
    await waitFor(() => screen.getByText(successMessages.createGame('Value')));
  });

  it('redirect to browse games on cancel', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp().push('/create-game');
    fireEvent.click(testElements.cancelButton());
    await waitFor(() => screen.getByText(infoMessages.waitingForPlayers));
  });

  it('display error on invalid name', async () => {
    useHandlers([urlConf.createGame, createGame.errorNameTooLong]);
    renderApp().push('/create-game');
    fillForm('Name', 'Description');
    fireEvent.click(testElements.createGameButton());
    await waitFor(() => screen.getByText(errorMessages.createGameNameTooLong));
  });

  it('display error on server error', async () => {
    useHandlers([urlConf.createGame, createGame.errorServerError]);
    renderApp().push('/create-game');
    fillForm('Name', 'Description');
    fireEvent.click(testElements.createGameButton());
    await waitFor(() => screen.getByText(errorMessages.internalServerError));
  });
});
