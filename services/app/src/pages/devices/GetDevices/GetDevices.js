import React, { Component } from "react";

import PageTitle from "../../../components/PageTitle/PageTitle";

import DeviceResults from "../components/deviceResult/deviceResult";

class GetDevices extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle title="All Devices" />
        <br />
        <DeviceResults />
      </React.Fragment>
    );
  }
}

export default GetDevices;
