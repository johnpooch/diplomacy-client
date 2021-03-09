import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Konva from 'konva-node';

import { errorMessages } from '../src/copy';
import { urlConf } from '../src/urls';
import {
  destroyOrder,
  getGameDetail,
  listOrders,
  listVariants,
} from '../src/mocks/resolvers';
import {
  basicBeforeEach,
  logIn,
  renderApp,
  testElements,
  useHandlers,
} from './testUtils';

beforeEach(() => {
  basicBeforeEach();
  logIn();
});

Konva.isBrowser = false;

describe('Game Detail', () => {
  it('delete order succesfully', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.success],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    const cancelButtons = await waitFor(() =>
      screen.getAllByTitle('Cancel order')
    );
    useHandlers([urlConf.listOrders, listOrders.successOneDeleted]);
    const cancelButton = cancelButtons[0];
    userEvent.click(cancelButton);
    await waitForElementToBeRemoved(() => screen.queryByText('edinburgh'));
  });

  it('display error on server error delete order', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.errorServerError],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    const cancelButton = await waitFor(
      () => screen.getAllByTitle('Cancel order')[0]
    );
    userEvent.click(cancelButton);
    await waitFor(() => screen.getByText(errorMessages.internalServerError));
  });

  it('remove error messages on successful request', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.errorServerError],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    userEvent.click(
      await waitFor(() => screen.getAllByTitle('Cancel order')[0])
    );
    await waitFor(() => screen.getByText(errorMessages.internalServerError));
    useHandlers([urlConf.destroyOrder, destroyOrder.success]);
    userEvent.click(screen.getAllByTitle('Cancel order')[0]);
    expect(screen.queryByText(errorMessages.internalServerError)).toBeNull();
  });

  it('display error on server error list orders', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.errorServerError]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    await waitFor(() => screen.getByText(errorMessages.internalServerError));
  });

  it('display error on not found delete order', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.errorNotFound],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    const cancelButton = await waitFor(
      () => screen.getAllByTitle('Cancel order')[0]
    );
    userEvent.click(cancelButton);
    await waitFor(() => screen.getByText(errorMessages.notFound));
  });
});
