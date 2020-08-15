import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Page from '../components/Page';
import authService from '../services/auth';
import alertActions from '../store/actions/alerts';
import { GenericForm, FormLabelText, Button } from '../styles';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    setEmail(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { alert, history } = props;
    authService.passwordReset(email).then(
      () => {
        const successMessage = `Thanks! Please check ${email} for a link to reset your password.`;
        history.push('/');
        alert({ message: successMessage, category: 'success' });
      },
      (error) => {
        history.push('/');
        alert({ message: error.message, category: 'error' });
      }
    );
  };

  return (
    <Page headingText="Reset password" isLoaded>
      <p>
        Enter your email and we&apos;ll send you a link to get back into your
        account.
      </p>
      <GenericForm onSubmit={handleSubmit}>
        <label htmlFor="email">
          <FormLabelText>Email</FormLabelText>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <p>
          <Button type="submit">Send reset link</Button>
        </p>
        <p>
          Not a member? <Link to="/register">Create an account</Link>
        </p>
      </GenericForm>
    </Page>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    alert: (alert) => dispatch(alertActions.add(alert)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(ForgotPassword));
