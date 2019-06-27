import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import Typography from "@material-ui/core/Typography";

import "./CreateDevice.css";

class CreateDeviceForm extends Component {
  state = {
    apiurl: "https://www.terasyshub.io/api/v1/devices",
    mac: "",
    name: "",
    description: "",
    properties: { color: "" },
    location: [],
    email: "",
    error: "",
    success: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post(`${this.state.apiurl}`, this.state)
      .then(response => this.setState({ success: response.data }))
      .catch(error => this.setState({ error: error.response.data }));
  };

  render() {
    const {
      mac,
      name,
      description,
      location,
      email,
      error,
      success,
      color
    } = this.state;

    return (
      <div>
        <PageTitle title="Add Device" />
        <form onSubmit={this.submitHandler}>
          <div>
            <TextField
              name="mac"
              value={mac}
              onChange={this.changeHandler}
              placeholder="mac"
              margin="normal"
            />
          </div>

          <div>
            <TextField
              name="name"
              value={name}
              onChange={this.changeHandler}
              placeholder="name"
              margin="normal"
            />
          </div>

          <div>
            <TextField
              name="description"
              value={description}
              onChange={this.changeHandler}
              placeholder="description"
              margin="normal"
            />
          </div>

          <div>
            <TextField
              name="color"
              value={color}
              onChange={this.changeHandler}
              placeholder="color"
              margin="normal"
            />
          </div>

          <div>
            <TextField
              name="location"
              value={location}
              onChange={this.changeHandler}
              placeholder="location"
              margin="normal"
            />
          </div>

          <div>
            <TextField
              name="email"
              value={email}
              onChange={this.changeHandler}
              placeholder="email"
              margin="normal"
            />
          </div>

          <br />

          <div>
            {success ? (
              <p className="success" variant="h5">
                {success}
              </p>
            ) : (
              <p className="error" variant="h5">
                {error}
              </p>
            )}
          </div>

          <div>
            <Button type="submit" variant="contained" color="primary">
              Register Device
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateDeviceForm;
