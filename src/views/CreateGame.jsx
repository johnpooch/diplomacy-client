import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { Button, SecondaryButton } from '../components/Button';
import FieldError from '../components/FieldError';
import Form, { LabelText, FormWrapper } from '../components/Form';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import { GridTemplate } from '../layout';
import { errorActions } from '../store/errors';
import { gameActions } from '../store/games';

const CreateGame = ({ createGame, errors }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Page title="Create game">
      <FormWrapper>
        <Form onSubmit={handleSubmit(createGame)}>
          <label htmlFor="name">
            <LabelText>Name</LabelText>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
              ref={register}
              required
            />
            <FieldError error={errors.name} />
          </label>
          <GridTemplate templateColumns="2fr 1fr">
            <Button type="submit">Create game</Button>
            <SecondaryButton as={NavLink} to="/">
              Cancel
            </SecondaryButton>
          </GridTemplate>
          <NonFieldErrors errors={errors.non_field_errors} />
        </Form>
      </FormWrapper>
    </Page>
  );
};

const mapStateToProps = (state) => {
  const { errors } = state;
  return { errors };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createGame: (data) =>
      dispatch(gameActions.createGame({ data })).then(({ error, payload }) => {
        if (error) {
          dispatch(errorActions.addError(payload));
        } else {
          const { slug } = payload;
          history.push(`/pre-game/${slug}`);
        }
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGame));
