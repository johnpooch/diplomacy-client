/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import { CreateGame } from './CreateGame';

export default {
  title: 'Pages/CreateGame',
  component: CreateGame,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const defaultArgs = {
  onSubmit: (data) => console.log(data),
  errors: {},
};

const Template: Story<ComponentProps<typeof CreateGame>> = (args) => (
  <CreateGame {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};
