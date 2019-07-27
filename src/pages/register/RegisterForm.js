import React, { Component } from "react";
import axios from "axios";

import {
  LinearProgress,
  Typography,
  Button,
  TextField,
  withStyles
} from "@material-ui/core";

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },

  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: 320
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: "32px"
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center"
  },
  creatingButtonContainer: {
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  createAccountButton: {
    height: 46,
    textTransform: "none"
  },
  formDividerContainer: {
    display: "flex",
    alignItems: "center"
  },

  formDivider: {
    flexGrow: 1,
    height: 1
  },
  errorMessage: {
    textAlign: "center"
  },

  textField: {
    borderBottomColor: "1px solid #222"
  },
  formButtons: {
    width: "100%",
    marginTop: 32,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
};

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

    this.setState({
      isLoading: true
    });

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .post(`${this.state.apiUrl}`, this.state, { headers: headers })
      .then(response =>
        this.setState({
          status: response.data,
          isLoading: false,
          password: "",
          password_confirm: "",
          email: "",
          profile: {
            firstname: "",
            lastname: ""
          }
        })
      )

      .catch(error =>
        this.setState({
          errors: error.response.data,
          isLoading: false
        })
      );
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
        <Typography variant="h1" style={styles.subGreeting}>
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

        <div style={styles.formDividerContainer}>
          <div style={styles.formDivider} />
        </div>

        <TextField
          id="firstname"
          name="firstname"
          styles={styles.textField}
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
          styles={styles.textField}
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
          styles={styles.textField}
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
          styles={styles.textField}
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
          styles={styles.textField}
          onChange={this.onChangeHandler}
          margin="normal"
          placeholder="Confirm Password"
          type="password"
          fullWidth
        />

        <div className="creatingButtonContainer">
          {isLoading ? (
            <LinearProgress size={26} />
          ) : (
            <Button
              disabled={
                email.length === 0 ||
                password.length === 0 ||
                password_confirm.length === 0 ||
                isLoading
              }
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              styles={styles.createAccountButton}
              fullWidth
            >
              Create your account
            </Button>
          )}
        </div>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RegisterForm);
