/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../theme';

import { SupplyCenterIcon } from './Icon';

export default {
  title: 'Icon',
  decorators: [
    (story): React.ReactElement => (
      <ThemeProvider theme={theme}>{story()}</ThemeProvider>
    ),
  ],
  component: SupplyCenterIcon,
};

const Template: Story<ComponentProps<typeof SupplyCenterIcon>> = (args) => (
  <SupplyCenterIcon {...args} />
);

export const SupplyCenter = Template.bind({});
