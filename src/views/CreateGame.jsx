import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Error from './Error';
import * as actions from '../store/actions/auth';
import * as API from '../api';
import * as utils from '../utils';

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getCreateGameForm();
  }

  getCreateGameForm() {
    const { headers } = this.props;
    fetch(API.CREATEGAMEURL, {
      method: 'GET',
      headers,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        this.setState({
          json,
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
        });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    const { onAuth } = this.props;
    onAuth(username, password);
    // NOTE this should redirect if successful
  }

  render() {
    const { isLoaded, json } = this.state;
    if (!isLoaded) return <Loading />;
    if (!json) return <Error text="Something has gone wrong." />;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {utils.jsonToFormFields(json)}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
