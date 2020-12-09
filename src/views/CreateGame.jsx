import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import Form, { FormLabel, FormWrapper } from '../components/Form';
import Page from '../components/Page';
import useForm from '../hooks/useForm';
import { alertActions } from '../store/alerts';
import { Button, SecondaryButton } from '../components/Button';
import { gameActions } from '../store/games';
import { GridTemplate } from '../layout';

const NavLinkButton = SecondaryButton.withComponent(NavLink);

const CreateGame = (props) => {
  const [values, handleChange] = useForm({ name: '', description: '' });

  const { name, description } = values;
  const { createGame, token } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      return;
    }
    createGame(token, { name, description });
  };

  return (
    <Page title="Create game">
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <FormLabel>Name</FormLabel>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
              value={name}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="description">
            <FormLabel>Description</FormLabel>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              autoComplete="description"
              onChange={handleChange}
              value={description}
              required
              rows={1}
            />
          </label>
          <GridTemplate templateColumns="2fr 1fr">
            <Button type="submit">Create game</Button>
            <NavLinkButton to="/">Cancel</NavLinkButton>
          </GridTemplate>
        </Form>
      </FormWrapper>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createGame: (token, data) =>
      dispatch(gameActions.createGame({ token, data })).then(({ payload }) => {
        const { name, slug } = payload;
        const message = `Game '${name}' created!`;
        const category = 'success';
        dispatch(alertActions.alertsAdd({ message, category, pending: true }));
        history.push(`/pre-game/${slug}`);
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGame));
