import React from 'react';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';

const ResetPassword: React.FC = () => {
  // const token = new URLSearchParams(location.search).get('token');
  // if (!token) history.push('/');

  const sumbitButton = <PrimaryButton>Reset Password</PrimaryButton>;
  return (
    <FormContainer>
      <FormWrapper title="Reset Password">
        <Form button={sumbitButton} onSubmit={() => null}>
          <FormFieldWrapper
            name="password"
            label="Password"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'password',
              type: 'password',
            }}
          />
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default ResetPassword;
