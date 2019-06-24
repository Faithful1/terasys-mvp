import React, { Component } from "react";
import axios from "axios";

import {
  CircularProgress,
  Typography,
  withStyles,
  Button,
  TextField,
  Fade
} from "@material-ui/core";

class RegisterForm extends Component {
  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/register",
    isLoading: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirm: ""
  };

  submitHandler = e => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json"
    };
    axios
      .post(`${this.state.apiUrl}`, this.state, { headers: headers })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      isLoading,
      firstName,
      lastName,
      email,
      password,
      password_confirm
    } = this.state;

    return (
      <form onSubmit={this.submitHandler}>
        <Typography variant="h1" className="greeting">
          Welcome!
        </Typography>
        <Typography variant="h2" className="subGreeting">
          Create your account
        </Typography>
        <Fade>
          <Typography color="secondary" className="errorMessage">
            Something is wrong with your email or password :(
          </Typography>
        </Fade>
        <TextField
          id="firstname"
          name="firstName"
          className="textFieldUnderline textField"
          value={firstName}
          onChange={this.onChangeHandler}
          margin="normal"
          placeholder="First Name"
          type="text"
          fullWidth
        />
        <TextField
          id="lastname"
          name="lastName"
          className="textFieldUnderline textField"
          value={lastName}
          onChange={this.onChangeHandler}
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
