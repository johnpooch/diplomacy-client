import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { errorMessages } from '../src/copy';
import {
  destroyOrder,
  finalizeOrders,
  getGameDetail,
  getGameFilterChoices,
  getOrdersFinalized,
  getOrdersStatus,
  listGames,
  listOrders,
  listVariants,
} from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  basicBeforeEach,
  Selectors,
  logIn,
  renderApp,
  useHandlers,
  userSeesElement,
  userSeesLoadingSpinner,
  userClicksElement,
  elementIsDisabled,
  userSeesAlert,
} from './testUtils';

beforeEach(() => {
  basicBeforeEach();
  logIn();
});

describe('Game Detail', () => {
  it('show control panel', async () => {
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.success],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.getOrdersFinalized, getOrdersFinalized.success],
      [urlConf.getOrdersStatus, getOrdersStatus.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/first-turn');
    await userSeesLoadingSpinner();
    await userSeesElement('Diplomacy', Selectors.Header);
  });
  it('delete order succesfully', async () => {
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.success],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.getOrdersFinalized, getOrdersFinalized.success],
      [urlConf.getOrdersStatus, getOrdersStatus.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/first-turn');
    await userSeesElement('Diplomacy', Selectors.Header);
    await userSeesElement('Cancel order', Selectors.Button, screen.getByTitle);
    userClicksElement('Cancel order', Selectors.Button, screen.getByTitle);
    elementIsDisabled('Cancel order', Selectors.Button, screen.getByTitle);
    await userSeesAlert('Order cancelled');
  });

  it('display error on server error delete order', async () => {
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.errorServerError],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.getOrdersFinalized, getOrdersFinalized.success],
      [urlConf.getOrdersStatus, getOrdersStatus.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/first-turn');
    await userSeesElement('Diplomacy', Selectors.Header);
    await userSeesElement('Cancel order', Selectors.Button, screen.getByTitle);
    userClicksElement('Cancel order', Selectors.Button, screen.getByTitle);
    await userSeesAlert(errorMessages.internalServerError);
  });

  it('display error on not found delete order', async () => {
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.errorNotFound],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.getOrdersFinalized, getOrdersFinalized.success],
      [urlConf.getOrdersStatus, getOrdersStatus.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/first-turn');
    await userSeesElement('Diplomacy', Selectors.Header);
    await userSeesElement('Cancel order', Selectors.Button, screen.getByTitle);
    userClicksElement('Cancel order', Selectors.Button, screen.getByTitle);
    await userSeesAlert(errorMessages.notFound);
  });

  it('finalize orders success', async () => {
    useHandlers(
      [urlConf.finalizeOrders, finalizeOrders.success],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.getOrdersFinalized, getOrdersFinalized.success],
      [urlConf.getOrdersStatus, getOrdersStatus.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/first-turn');
    await userSeesElement('Cancel order', Selectors.Button, screen.getByTitle);
    userClicksElement(
      'Toggle finalize orders',
      Selectors.Button,
      screen.getByTitle
    );
    elementIsDisabled(
      'Toggle finalize orders',
      Selectors.Button,
      screen.getByTitle
    );
    await userSeesAlert('Orders finalized');
  });

  it('display message if user not participant', async () => {
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getOrdersFinalized, getOrdersFinalized.success],
      [urlConf.getOrdersStatus, getOrdersStatus.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/game-user-not-participating');
    await userSeesElement('Diplomacy', Selectors.Header);
    await userSeesElement(
      'You are not participating in this game.',
      Selectors.Paragraph
    );
  });
});
