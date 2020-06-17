import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import OrderTypeSelector from '../OrderTypeSelector';

test('Clicking choice executes callback', () => {
  const choices = ['Choice A', 'Choice B'];
  const mockCallback = jest.fn();
  const { asFragment, getByText } = render(
    <OrderTypeSelector choices={choices} onClickChoice={mockCallback} />
  );
  const choice = getByText('Choice A');
  fireEvent.click(choice);
  expect(mockCallback.mock.calls.length).toEqual(1);
  expect(mockCallback).toHaveBeenCalledWith('Choice A');
  expect(asFragment()).toMatchSnapshot();
});
