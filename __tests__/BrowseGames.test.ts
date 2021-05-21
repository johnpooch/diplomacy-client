import { fireEvent, waitFor, screen } from '@testing-library/react';
import Konva from 'konva-node';

import { errorMessages } from '../src/copy';
import {
  getGameFilterChoices,
  listGames,
  listVariants,
} from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  basicBeforeEach,
  Selectors,
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

Konva.isBrowser = false;

const pendingGameTitle = 'New game';
const activeGameTitle = 'First turn';

describe('Browse Games', () => {
  it('redirect user to log in and remove from storage on log out', async () => {
    renderApp();
    fireEvent.click(screen.getByTitle('Menu'));
    userClicksElement('Logout', Selectors.MenuButton);
    await userSeesElement('Login', Selectors.FormHeader);
  });

  it('display nav items', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp();
    screen.getByTitle('Home');
    screen.getByTitle('Home Icon Button');
    screen.getByTitle('Create game');
    screen.getByTitle('Menu');
  });

  it('display pending game', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp();
    await userSeesElement(pendingGameTitle, Selectors.BrowseGameTitle);
  });

  it('display active game correctly', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successActiveGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp();
    await userSeesElement(activeGameTitle, Selectors.BrowseGameTitle);
  });

  // it('navigate to game detail view when active game is clicked', async () => {
  //   useHandlers(
  //     [urlConf.getGameDetail, getGameDetail.success],
  //     [urlConf.getGameFilterChoices, getGameFilterChoices.success],
  //     [urlConf.listGames, listGames.successActiveGame],
  //     [urlConf.listVariants, listVariants.success]
  //   );
  //   renderApp();
  //   userClicksElement('Logout', Selectors.MenuButton);
  //   await userSeesElement('Login', Selectors.FormHeader);
  //   const gameLink = await waitFor(() => screen.getByTitle(activeGameTitle));
  //   fireEvent.click(gameLink);
  //   await waitFor(() => screen.getByText('England'));
  // });

  it('display error on listGames server error', async () => {
    useHandlers(
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.errorServerError],
      [urlConf.listVariants, listVariants.success]
    );
    renderApp();
    await userSeesAlert(errorMessages.internalServerError);
  });

  it('display error on listVariants server error', async () => {
    useHandlers(
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.successActiveGame],
      [urlConf.listVariants, listVariants.errorServerError]
    );
    renderApp();
    await userSeesAlert(errorMessages.internalServerError);
  });

  it('redirect to login on unauthorized', async () => {
    useHandlers(
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.errorUnauthorized],
      [urlConf.listVariants, listVariants.success]
    );
    renderApp();
    await userSeesElement('Login', Selectors.FormHeader);
  });
});
