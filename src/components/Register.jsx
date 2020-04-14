import React, {Component} from "react";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernamed: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      loginErrors: "",
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
    const { username, email, password } = this.state;

    axios.post(
      "http://127.0.0.1:8082/api/auth/register",
      {
        "username": username,
        "email": email,
        "password": password,
      },
      { withCredentials: true }
    ).then(response => {
      if (response.status === 200) {
        this.props.handleSuccessfulAuth(response.data);
      }
    }).catch(error => {
      console.log("error ", error)
    });
    event.preventDefault();
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
      </div>
    )
  }
}
