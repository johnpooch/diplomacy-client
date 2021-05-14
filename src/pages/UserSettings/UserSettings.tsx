import React from 'react';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';

const UserSettings: React.FC = () => {
  const submitButton = <PrimaryButton>Change Password</PrimaryButton>;
  return (
    <FormContainer>
      <FormWrapper title="Change Password">
        <Form button={submitButton} onSubmit={() => null}>
          <FormFieldWrapper
            name="current_password"
            label="Current password"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'current_password',
              type: 'password',
            }}
          />
          <FormFieldWrapper
            name="new_password"
            label="New password"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'new_password',
              type: 'password',
            }}
          />
          <FormFieldWrapper
            name="new_password_confirm"
            label="Confirm new password"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'new_password_confirm',
              type: 'password',
            }}
          />
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default UserSettings;
