import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';

import * as actions from '../store/actions/auth'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit(event) {
    const { username, email, password, passwordConfirmation } = this.state;
    this.props.onAuth(username, email, password);
    this.props.history.push('/');

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm password"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <div>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password) => dispatch(
      actions.authSignup(username, email, password)
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)
