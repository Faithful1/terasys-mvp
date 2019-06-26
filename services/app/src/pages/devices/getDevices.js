import React, { Component } from "react";
import { InputLabel, TextField, Select, MenuItem } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";

import axios from "axios";
import DeviceResults from "./components/deviceResult";

class SearchImage extends Component {
  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/devices/",
    devices: []
  };

  componentDidMount() {
    axios
      .get(`${this.state.apiUrl}`)
      .then(response => this.setState({ devices: response.data }))
      .catch(error => console.log(error.response.data));
    console.log("Our data is fetched");
  }

  render() {
    const { devices } = this.state;
    return (
      <React.Fragment>
        <PageTitle title="All Devices" />

        <br />
        {this.state.devices.length > 0 ? (
          <DeviceResults devices={this.state.devices} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default SearchImage;
