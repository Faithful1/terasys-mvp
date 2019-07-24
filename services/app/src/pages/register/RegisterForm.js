import React, { Component } from "react";
import axios from "axios";

import {
  CircularProgress,
  Typography,
  Button,
  TextField
} from "@material-ui/core";

class RegisterForm extends Component {
  state = {
    isLoading: false,
    apiUrl: "https://www.terasyshub.io/api/v1/registerAdmin",
    password: "",
    password_confirm: "",
    email: "",
    profile: {
      firstname: "",
      lastname: ""
    },
    key: "8JadZIptT2ysZPKQUAdBWw.lwewT8M4",
    status: "",
    errors: ""
  };

  submitHandler = e => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .post(`${this.state.apiUrl}`, this.state, { headers: headers })
      .then(response => console.log(response.data))
      .then(response => this.setState({ status: response.data }))
      .catch(error => this.setState({ errors: error.response.data }));
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      isLoading,
      email,
      password,
      password_confirm,
      status,
      errors
    } = this.state;

    return (
      <form onSubmit={this.submitHandler}>
        <Typography variant="h1" className="greeting">
          Admin
        </Typography>

        {errors ? (
          <Typography color="secondary" className="errors">
            {errors}
          </Typography>
        ) : (
          <Typography color="primary" className="successMessage">
            {status}
          </Typography>
        )}

        <TextField
          id="firstname"
          name="firstname"
          className="textFieldUnderline textField"
          value={this.state.profile.firstname}
          onChange={e => {
            let { profile } = this.state;
            profile.firstname = e.target.value;
            this.setState({ profile });
          }}
          margin="normal"
          placeholder="First Name"
          type="text"
          fullWidth
        />

        <TextField
          id="lastname"
          name="lastname"
          className="textFieldUnderline textField"
          value={this.state.profile.lastname}
          onChange={e => {
            let { profile } = this.state;
            profile.lastname = e.target.value;
            this.setState({ profile });
          }}
          margin="normal"
          placeholder="Last Name"
          type="text"
          fullWidth
        />

        <TextField
          id="email"
          name="email"
          className="textFieldUnderline textField"
          value={email}
          onChange={this.onChangeHandler}
          margin="normal"
          placeholder="Email Address"
          type="email"
          fullWidth
        />
        <TextField
          id="password"
          name="password"
          value={password}
          className="textFieldUnderline textField"
          onChange={this.onChangeHandler}
          margin="normal"
          placeholder="Password"
          type="password"
          fullWidth
        />
        <TextField
          id="password_confirm"
          name="password_confirm"
          value={password_confirm}
          className="textFieldUnderline textField"
          onChange={this.onChangeHandler}
          margin="normal"
          placeholder="Confirm Password"
          type="password"
          fullWidth
        />

        <div className="creatingButtonContainer">
          {isLoading ? (
            <CircularProgress size={26} />
          ) : (
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              className="createAccountButton"
            >
              Create your account
            </Button>
          )}
        </div>
      </form>
    );
  }
}

export default RegisterForm;
