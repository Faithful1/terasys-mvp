import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import Typography from "@material-ui/core/Typography";

import "./CreateDevice.css";

class GetDeviceKey extends Component {
  render() {
    return (
      <div>
        <PageTitle title="Get Device Key" />
      </div>
    );
  }
}

export default GetDeviceKey;
