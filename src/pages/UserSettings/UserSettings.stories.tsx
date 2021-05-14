/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import UserSettings from './UserSettings';

export default {
  title: 'Pages/UserSettings',
  component: UserSettings,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof UserSettings>> = (args) => (
  <UserSettings {...args} />
);

export const Default = Template.bind({});
