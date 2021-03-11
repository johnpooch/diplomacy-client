import React from 'react';
import { createBrowserHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { setupServer } from 'msw/node';

import { errorMessages } from '../src/copy';
import userData from '../src/mocks/data/user.json';
import { restMethods } from '../src/mocks/handlers';
import { login } from '../src/mocks/resolvers';
import { authActions } from '../src/store/auth';
import configureStore from '../src/store/store';
import { urlConf } from '../src/urls';
import App from '../src/views/App';

const server = setupServer();

const baseUrl = 'http://127.0.0.1:8082/api/v1/';
let history;
let store;

const mockLocalStorage = () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
};

export const logIn = () => {
  const url = urlConf.login;
  const { urlPattern, method } = url;
  const handler = restMethods[method];
  server.use(handler(baseUrl + urlPattern, login.success));
  const user = userData;
  const token =
    'faketokencdd6b6112b47176e410d1d6f0fc0a4b879286e5c93405ce89685929';
  store.dispatch(authActions.login.fulfilled({ user, token }));
};

export const useHandlers = (...handlers) => {
  handlers.forEach(([url, resolver]) => {
    const { method, urlPattern } = url;
    server.use(restMethods[method](baseUrl + urlPattern, resolver));
  });
};

export const renderApp = () => {
  // Should only be called after basicBeforeEach
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
  return history;
};

export const basicBeforeEach = () => {
  process.env.SERVICE_URI = baseUrl;
  history = createBrowserHistory();
  history.push('/');
  store = configureStore(history);
  mockLocalStorage();
  return history;
};

export const basicBeforeAll = () => {
  server.listen();
};

export const basicAfterEach = () => {
  server.resetHandlers();
};

export const basicAfterAll = () => {
  server.close();
};

beforeAll(() => basicBeforeAll());
beforeEach(() => basicBeforeEach());
afterEach(() => basicAfterEach());
afterAll(() => basicAfterAll());

export const testElements = {
  componentError500: () => screen.getByText(errorMessages.internalServerError),
  leaveGameButton: () => screen.getByText('Leave game', { selector: 'button' }),
  loginButton: () => screen.getByText('Log in', { selector: 'button' }),
  logoutButton: () => screen.getByText('Log out', { selector: 'button' }),
  registerButton: () => screen.getByText('Register', { selector: 'button' }),
  resetPasswordButton: () =>
    screen.getByText('Reset password', { selector: 'button' }),
  sendResetLinkButton: () =>
    screen.getByText('Send reset link', { selector: 'button' }),
};
