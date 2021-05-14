/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import * as FormStories from '../Form/Form.stories';
import * as FormLinkStories from '../FormLink/FormLink.stories';

import FormWrapper from './FormWrapper';

export default {
  title: 'FormWrapper',
  component: FormWrapper,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof FormWrapper>> = (args) => {
  return (
    <FormWrapper {...args}>
      <FormStories.Default {...FormStories.Default.args} />
      <div className="form-links">
        <FormLinkStories.ForgotPassword
          {...FormLinkStories.ForgotPassword.args}
        />
        <FormLinkStories.CreateAccount
          {...FormLinkStories.CreateAccount.args}
        />
      </div>
    </FormWrapper>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Log in',
};
