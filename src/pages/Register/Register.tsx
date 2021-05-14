import React from 'react';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormLink,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';

const Register: React.FC = () => {
  const sumbitButton = <PrimaryButton>Register</PrimaryButton>;
  return (
    <FormContainer>
      <FormWrapper title="Register">
        <Form button={sumbitButton} onSubmit={() => null}>
          <FormFieldWrapper
            name="email"
            label="Email"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'email',
              type: 'email',
            }}
          />
          <FormFieldWrapper
            name="username"
            label="Username"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'username',
              type: 'text',
            }}
          />
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
        <div className="form-links">
          <FormLink
            prompt="Forgotten password?"
            link="/forgot-password"
            label="Reset password"
          />
          <FormLink
            prompt="Already have an account?"
            link="/login"
            label="Log in"
          />
        </div>
      </FormWrapper>
    </FormContainer>
  );
};

export default Register;
