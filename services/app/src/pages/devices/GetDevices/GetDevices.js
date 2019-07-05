import React, { Component } from "react";
import axios from "axios";

import PageTitle from "../../../components/PageTitle/PageTitle";

import DeviceResults from "../components/deviceResult";

import { Grid, Paper } from "@material-ui/core";

class GetDevices extends Component {
  _isMounted = false;

  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/devices/",
    devices: [],
    errors: ""
  };

  componentDidMount() {
    this._isMounted = true;

    axios
      .get(`${this.state.apiUrl}`)
      .then(response => this.setState({ devices: response.data }))
      .catch(error => this.setState({ errors: error.response.data }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { devices } = this.state;

    return (
      <React.Fragment>
        <PageTitle title="All Devices" />

        <br />

        {devices.length > 0 ? <DeviceResults devices={devices} /> : null}
      </React.Fragment>
    );
  }
}

export default GetDevices;
