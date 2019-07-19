import React from "react";

import axios from "axios";
import Yup from "yup";

import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";

import {
  Typography,
  Button,
  withStyles,
  LinearProgress
} from "@material-ui/core";

const RegisterForm = ({ classes }) => (
  <Formik
    initialValues={{
      registerUrl: "https://www.terasyshub.io/api/v1/registerAdmin",
      addUser: {
        profile: {
          firstname: "",
          lastname: ""
        },
        email: "",
        password: "",
        confirm_password: ""
      }
    }}
    onSubmit={values => {
      console.log(values.addUser);
      // axios.post(values.registerUrl, values.addUser);
    }}
    render={({ isSubmitting, values }) => (
      <Form>
        <Typography variant="h1" className={classes.subGreeting}>
          Super Admin
        </Typography>

        <div className={classes.formDividerContainer}>
          <div className={classes.formDivider} />
        </div>

        <Field
          name="addUser.profile.firstname"
          className="textFieldUnderline textField"
          component={TextField}
          margin="normal"
          placeholder="First Name"
          type="text"
          fullWidth
        />

        <Field
          name="addUser.profile.lastname"
          className="textFieldUnderline textField"
          component={TextField}
          margin="normal"
          placeholder="Last Name"
          type="text"
          fullWidth
        />

        <Field
          name="addUser.email"
          component={TextField}
          margin="normal"
          placeholder="Email Adress"
          type="email"
          fullWidth
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField
            }
          }}
        />

        <Field
          name="addUser.password"
          component={TextField}
          margin="normal"
          placeholder="Password"
          type="password"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField
            }
          }}
          fullWidth
        />

        <Field
          name="addUser.confirm_password"
          component={TextField}
          margin="normal"
          placeholder="Confirm Password"
          type="password"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField
            }
          }}
          fullWidth
        />

        <br />
        {isSubmitting && <LinearProgress />}
        <br />

        <div className="creatingButtonContainer">
          <Button
            disabled={
              values.addUser.email.length === 0 ||
              values.addUser.password.length === 0 ||
              values.addUser.confirm_password.length === 0 ||
              isSubmitting
            }
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            className="createAccountButton"
          >
            Create your account
          </Button>
        </div>
      </Form>
    )}
  />
);

const styles = theme => ({
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
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%"
    }
  },
  form: {
    width: 320
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing.unit * 4
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing.unit * 2
  },
  creatingButtonContainer: {
    marginTop: theme.spacing.unit * 2.5,
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
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    display: "flex",
    alignItems: "center"
  },
  formDividerWord: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40"
  },
  errorMessage: {
    textAlign: "center"
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`
    }
  },
  textField: {
    borderBottomColor: theme.palette.background.light
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default withStyles(styles, { withTheme: true })(RegisterForm);
