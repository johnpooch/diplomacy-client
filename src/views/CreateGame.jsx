import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import FieldError from '../components/FieldError';
import NonFieldErrors from '../components/NonFieldErrors';
import Form, { FormLabel } from '../components/Form';
import FormWrapper from '../components/FormWrapper';
import Page from '../components/Page';
import useForm from '../hooks/useForm';
import { Button, SecondaryButton } from '../components/Button';
import { errorActions } from '../store/errors';
import { gameActions } from '../store/games';
import { GridTemplate } from '../layout';

const NavLinkButton = SecondaryButton.withComponent(NavLink);

const CreateGame = ({ createGame, errors, token }) => {
  const [values, handleChange] = useForm({ name: '', description: '' });

  const { name, description } = values;

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
            <FieldError error={errors.name} />
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
            <FieldError error={errors.description} />
          </label>
          <GridTemplate templateColumns="2fr 1fr">
            <Button type="submit">Create game</Button>
            <NavLinkButton to="/">Cancel</NavLinkButton>
          </GridTemplate>

          <NonFieldErrors errors={errors.non_field_errors} />
        </Form>
      </FormWrapper>
    </Page>
  );
};

const mapStateToProps = (state) => {
  const { token } = state.auth;
  const { errors } = state;
  return { errors, token };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createGame: (token, data) =>
      dispatch(gameActions.createGame({ token, data })).then(
        ({ error, payload }) => {
          if (error) {
            dispatch(errorActions.addError(payload));
          } else {
            const { slug } = payload;
            history.push(`/pre-game/${slug}`);
          }
        }
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGame));
