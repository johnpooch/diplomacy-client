import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';
import actions from '../../store/actions';

export const UserSettings: React.FC<ReduxProps> = ({ errors, onSubmit }) => {
  const submitButton = (
    <PrimaryButton type="submit">Change Password</PrimaryButton>
  );
  return (
    <FormContainer>
      <FormWrapper title="Change Password">
        <Form button={submitButton} errors={errors} onSubmit={onSubmit}>
          <FormFieldWrapper
            name="current_password"
            label="Current password"
            errors={errors.current_password}
            field={{
              fieldClass: Input,
              id: 'current_password',
              type: 'password',
            }}
          />
          <FormFieldWrapper
            name="new_password"
            label="New password"
            errors={errors.new_password}
            field={{
              fieldClass: Input,
              id: 'new_password',
              type: 'password',
            }}
          />
          <FormFieldWrapper
            name="new_password_confirm"
            label="Confirm new password"
            errors={errors.new_password_confirm}
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

const mapState = (state) => {
  const errors = state.errors.changePasswordStatus || {};
  return { errors };
};
const mapDispatch = { onSubmit: actions.changePassword };
const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(UserSettings);
