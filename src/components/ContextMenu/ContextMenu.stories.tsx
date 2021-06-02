import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import Component from './ContextMenu';

export default {
  title: 'ContextMenu',
  component: Component,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {
  onClickOption: (value: string) => console.log(value),
};

export const OneOption: Story = Template.bind({});
OneOption.args = {
  ...defaultArgs,
  options: [['build', 'Build']],
};

export const MultipleOptions: Story = Template.bind({});
MultipleOptions.args = {
  ...defaultArgs,
  options: [
    ['build', 'Build'],
    ['disband', 'Disband'],
  ],
};

export const NoOptions: Story = Template.bind({});
NoOptions.args = {
  ...defaultArgs,
  options: [],
};
