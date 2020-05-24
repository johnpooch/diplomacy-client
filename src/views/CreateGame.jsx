import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import { PageWrapper, GenericForm, FormLabelText, Button } from '../styles';

import alertActions from '../store/actions/alerts';
import gameService from '../services/game';

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      name: '',
      description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    this.setState({ isLoaded: false });
    const { name, description } = this.state;
    const { success, history, token } = this.props;
    gameService.create(token, { name, description }).then(() => {
      this.setState({ isLoaded: true });
      history.push('/');
      success({ message: 'Game created!', category: 'success' });
    });
  }

  render() {
    const { isLoaded, name, description } = this.state;
    if (!isLoaded) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <PageWrapper>
          <Heading text="Create game" />
          <GenericForm onSubmit={this.handleSubmit}>
            <label htmlFor="name">
              <FormLabelText>Name</FormLabelText>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                autoComplete="name"
                value={name}
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="description">
              <FormLabelText>Description</FormLabelText>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                autoComplete="description"
                onChange={this.handleChange}
                value={description}
                required
                rows={1}
              />
            </label>
            <p>
              <Button type="submit">Create game</Button>
            </p>
          </GenericForm>
        </PageWrapper>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    success: (alert) => dispatch(alertActions.add(alert)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGame));
