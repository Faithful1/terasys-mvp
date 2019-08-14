import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";

import { Grid } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";
import {
  TextField,
  CircularProgress,
  Button,
  Select,
  FormHelperText,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";

import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

class Dashboard extends Component {
  state = {
    isLoading: false,
    getApiUrl: "https://www.terasyshub.io/api/v1/devices/",
    devices: [],
    deviceName: "",

    deviceData: [],
    error: "",
    metricsChoice: "",
    macAddress: ""
  };

  componentWillMount() {
    this._getDevices();
  }

  submitHandler = mac => {
    const { metricsChoice } = this.state;
    console.log(mac);

    console.log(this.state);

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .get(`https://www.terasyshub.io/api/v1/data/${metricsChoice}/${mac}`, {
        headers: headers
      })
      .then(
        response => console.log(response.data)
        // this.setState({
        //   deviceData: response.data,
        //   isLoading: false,
        //   metricsChoice: "",
        //   macAddress: ""
        // })
      )
      .catch(error =>
        this.setState({
          error: error.response.data,
          isLoading: false
        })
      );
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _getDevices() {
    axios
      .get(`${this.state.getApiUrl}`)
      .then(response => this.setState({ devices: response.data }))
      .catch(error => this.setState({ error: error.response.data }));
  }

  render() {
    const {
      deviceName,
      devices,
      deviceData,
      macAddress,
      error,
      metricsChoice,
      isLoading
    } = this.state;

    let optionItems = devices.map(device => (
      <option key={device._id} value={device.name}>
        {device.name}
      </option>
    ));

    return (
      <React.Fragment>
        <PageTitle title="Dashboard" />

        <Grid container spacing={32}>
          <Grid item xs={12}>
            <Widget
              header={
                <div>
                  <Typography variant="h5" color="textSecondary">
                    Search
                  </Typography>
                </div>
              }
            >
              <ResponsiveContainer width="100%" minWidth={500} height={250}>
                <form>
                  {error ? (
                    <Typography color="secondary" className="errors">
                      {error}
                    </Typography>
                  ) : null}

                  <FormControl required>
                    <InputLabel htmlFor="metric-native-required">
                      Metric
                    </InputLabel>
                    <Select
                      native
                      name="metricsChoice"
                      value={metricsChoice}
                      onChange={this.onChangeHandler}
                      margin="dense"
                      inputProps={{
                        id: "metric-native-required"
                      }}
                    >
                      <option value="" />
                      <option value="temperature">temperature</option>
                      <option value="humidity">humidity</option>
                    </Select>
                    <FormHelperText>Select Metrics</FormHelperText>
                  </FormControl>

                  <br />
                  <br />

                  <div>
                    <FormControl required>
                      <InputLabel htmlFor="device-native-required">
                        device
                      </InputLabel>
                      <Select
                        native
                        name="deviceName"
                        value={deviceName}
                        onChange={this.onChangeHandler}
                        margin="dense"
                        inputProps={{
                          id: "device-native-required"
                        }}
                      >
                        <option value="" />
                        {optionItems}
                      </Select>

                      <FormHelperText>Select Device</FormHelperText>
                    </FormControl>

                    <br />
                    <br />

                    <div className="creatingButtonContainer">
                      {isLoading ? (
                        <CircularProgress size={26} />
                      ) : (
                        <Button
                          type="submit"
                          size="large"
                          variant="contained"
                          color="primary"
                          onClick={this.submitHandler}
                        >
                          Search Device
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </ResponsiveContainer>
            </Widget>
          </Grid>

          <Grid item xs={12}>
            <Widget
              header={
                <div>
                  <Typography variant="h5" color="textSecondary">
                    Live Data From Device
                  </Typography>
                </div>
              }
            >
              <ResponsiveContainer width="100%" minWidth={500} height={500}>
                <Typography variant="h5" color="textSecondary">
                  Device
                </Typography>
              </ResponsiveContainer>
            </Widget>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Dashboard;
