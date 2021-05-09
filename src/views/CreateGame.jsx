import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { Button, SecondaryButton } from '../components/Button';
import Form, { LabelText, FormWrapper } from '../components/Form';
import FieldError from '../components/FormError';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import Select from '../components/Select';
import { GridTemplate } from '../layout';
import { choiceActions } from '../store/choices';
import { errorActions } from '../store/errors';
import { gameActions } from '../store/games';

const CreateGame = ({ choices, createGame, errors, getChoices }) => {
  useEffect(() => (choices.loaded ? null : getChoices()));
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
          <Select
            name="orderDeadline"
            label="Order deadline"
            options={choices.deadlines}
            ref={register}
            required
          />
          <Select
            name="retreatDeadline"
            label="Retreat deadline"
            options={choices.deadlines}
            ref={register}
            required
          />
          <Select
            name="buildDeadline"
            label="Build deadline"
            options={choices.deadlines}
            ref={register}
            required
          />
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
  const { choices, errors } = state;
  return { choices, errors };
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
    getChoices: () => dispatch(choiceActions.getGameFilterChoices({})),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGame));
