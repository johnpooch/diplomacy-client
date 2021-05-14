/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import UserDropDownMenu from './UserDropDownMenu';

export default {
  title: 'UserDropDownMenu',
  component: UserDropDownMenu,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof UserDropDownMenu>> = (args) => (
  <UserDropDownMenu {...args} />
);

export const Default = Template.bind({});
