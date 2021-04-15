import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from '../components/Button';
import FieldError from '../components/FieldError';
import Form, { LabelText, FormWrapper } from '../components/Form';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import { authActions } from '../store/auth';
import { errorActions } from '../store/errors';

const UserSettings = ({ changePassword, errors }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Page title="Change password">
      <FormWrapper>
        <Form onSubmit={handleSubmit(changePassword)}>
          <label htmlFor="current_password">
            <LabelText>Current password</LabelText>
            <input
              type="password"
              id="current_password"
              name="current_password"
              placeholder="Current password"
              ref={register}
              required
            />
            <FieldError error={errors.current_password} />
          </label>

          <label htmlFor="new_password">
            <LabelText>New password</LabelText>
            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="New password"
              ref={register}
              required
            />
            <FieldError error={errors.new_password} />
          </label>

          <label htmlFor="new_password_confirm">
            <LabelText>Confirm new password</LabelText>
            <input
              type="password"
              id="new_password_confirm"
              name="new_password_confirm"
              placeholder="Confirm new password"
              ref={register}
              required
            />
            <FieldError error={errors.new_password_confirm} />
          </label>

          <p>
            <Button type="submit">Submit</Button>
          </p>

          <NonFieldErrors errors={errors.non_field_errors} />
        </Form>
      </FormWrapper>
    </Page>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    changePassword: (data) => {
      dispatch(authActions.changePassword({ data })).then(
        ({ error, payload }) => {
          if (error) {
            dispatch(errorActions.addError(payload));
          } else {
            history.push('/');
          }
        }
      );
    },
  };
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserSettings)
);
