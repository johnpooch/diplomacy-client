import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Page from '../components/Page';
import authService from '../services/auth';
import alertActions from '../store/actions/alerts';
import { GenericForm, FormLabelText, Button } from '../styles';

const ResetPassword = ({ alert, location, history }) => {
  const [password, setPassword] = useState('');

  const token = new URLSearchParams(location.search).get('token');
  if (!token) {
    history.push('/');
  }

  const handleChange = (e) => {
    const input = e.target.value;
    setPassword(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.passwordResetConfirm(password, token).then(
      () => {
        const successMessage = 'Password updated!';
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
      <p>Enter your new password.</p>
      <GenericForm onSubmit={handleSubmit}>
        <label htmlFor="password">
          <FormLabelText>Password</FormLabelText>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <p>
          <Button type="submit">Reset password</Button>
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

export default connect(null, mapDispatchToProps)(withRouter(ResetPassword));
