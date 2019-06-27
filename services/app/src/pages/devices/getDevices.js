import React, { Component } from "react";
import axios from "axios";

import PageTitle from "../../components/PageTitle";
import {
  GridList,
  GridListTile,
  Dialog,
  IconButton,
  Button,
  Zoom
} from "@material-ui/core";

import DeviceResults from "./components/deviceResult";

class GetDevices extends Component {
  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/devices/",
    devices: [],
    errors: ""
  };

  componentDidMount() {
    axios
      .get(`${this.state.apiUrl}`)
      // .then(response => console.log(response.data))
      .then(response => this.setState({ devices: response.data }))
      .catch(error => this.setState({ errors: error.response.data }));
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
