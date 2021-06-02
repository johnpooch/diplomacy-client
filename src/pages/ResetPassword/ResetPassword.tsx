import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';
import actions from '../../store/actions';

export const ResetPassword: React.FC<ReduxProps & RouteComponentProps> = ({
  errors,
  history,
  location,
  onSubmit,
}) => {
  const token = new URLSearchParams(location.search).get('token');
  if (!token) history.push('/');

  const sumbitButton = (
    <PrimaryButton type="submit">Reset Password</PrimaryButton>
  );
  return (
    <FormContainer>
      <FormWrapper title="Reset Password">
        <Form
          button={sumbitButton}
          errors={errors}
          onSubmit={(data) => onSubmit({ ...data, token })}
        >
          <FormFieldWrapper
            name="password"
            label="Password"
            errors={errors.password}
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

const mapState = (state) => {
  const errors = state.errors.resetPasswordConfirmStatus || {};
  return { errors };
};
const mapDispatch = { onSubmit: actions.resetPasswordConfirm };
const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ResetPassword));
