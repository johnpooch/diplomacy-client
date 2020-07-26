import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import OrderDialogue from '../OrderDialogue';

jest.mock('../TerritorySummary', () => () => <div>Territory Summary</div>);
jest.mock('../OrderTypeSelector', () => () => <div>Order Type Selector</div>);

test('Order dialogue has cancel button', () => {
  const order = { source: null };
  const mockCallback = jest.fn();
  const { getByRole, getByText } = render(
    <OrderDialogue onClickCancel={mockCallback} order={order} />
  );
  const cancelButton = getByRole('button');
  fireEvent.click(cancelButton);
  expect(mockCallback.mock.calls.length).toEqual(1);

  getByText('Territory Summary');
  getByText('Order Type Selector');
});
