import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";

import { Grid } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";
import {
  CircularProgress,
  Button,
  Select,
  FormHelperText,
  FormControl,
  InputLabel
} from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import DeviceStat from "./components/DeviceStat/DeviceStat";

class Dashboard extends Component {
  state = {
    isLoading: false,
    getApiUrl: "https://www.terasyshub.io/api/v1/devices/",
    devices: [],
    deviceViewData: [],
    deviceName: "",

    error: "",
    metricsChoice: "",
    macAddress: ""
  };

  componentWillMount() {
    this._getDevices();
  }

  submitHandler = e => {
    e.preventDefault();
    const { metricsChoice, macAddress } = this.state;

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .get(
        `https://www.terasyshub.io/api/v1/data/${metricsChoice}/${macAddress}`,
        {
          headers: headers
        }
      )
      .then(response =>
        this.setState({
          deviceViewData: response.data,
          isLoading: false
        })
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
      deviceViewData,
      error,
      metricsChoice,
      isLoading
    } = this.state;

    let optionItems = devices.map(device => (
      <option key={device._id} value={device.mac}>
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
                      value={metricsChoice}
                      onChange={e =>
                        this.setState({
                          metricsChoice: e.target.value
                        })
                      }
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
                        value={deviceName}
                        onChange={e =>
                          this.setState({
                            deviceName: e.target.value,
                            macAddress: _.find(
                              devices,
                              device => device.mac === e.target.value
                            ).mac
                          })
                        }
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
            <DeviceStat Content={deviceViewData} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Dashboard;
