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
  Legend,
  Brush,
  AreaChart,
  Area
} from "recharts";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

const data = [
  {
    _id: "59cb88a08b7bad4aae8bd5d5",
    mac: "5c:cf:7f:c4:10:36",
    value: 28.3,
    unit: "C",
    timestamp: 1506510995,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb7bd38b7bad4aae8bd5bd",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.9,
    unit: "C",
    timestamp: 1506507720,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb7b908b7bad4aae8bd5bb",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.9,
    unit: "C",
    timestamp: 1506507660,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb7b548b7bad4aae8bd5b9",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.9,
    unit: "C",
    timestamp: 1506507600,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb7b178b7bad4aae8bd5b5",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.8,
    unit: "C",
    timestamp: 1506507540,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb7adb8b7bad4aae8bd5b3",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.8,
    unit: "C",
    timestamp: 1506507480,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb7ab68b7bad4aae8bd5b1",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.8,
    unit: "C",
    timestamp: 1506507420,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb7a2b8b7bad4aae8bd5af",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.8,
    unit: "C",
    timestamp: 1506507300,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb79ef8b7bad4aae8bd5ab",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.8,
    unit: "C",
    timestamp: 1506507240,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  },
  {
    _id: "59cb78838b7bad4aae8bd5a4",
    mac: "5c:cf:7f:c4:10:36",
    value: 27.5,
    unit: "C",
    timestamp: 1506506880,
    type: "temperature",
    __v: 0,
    location: {
      lon: 3.38236,
      lat: 6.497492
    }
  }
];
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
    let viewDeviceDataContent;

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

    if (deviceViewData) {
      viewDeviceDataContent = (
        <ResponsiveContainer width="100%" minWidth={500} height={500}>
          <Typography variant="h5" color="textSecondary">
            <LineChart
              width={500}
              height={300}
              data={deviceViewData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </Typography>
        </ResponsiveContainer>
      );
    } else {
      viewDeviceDataContent = null;
    }

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
            <Widget
              header={
                <div>
                  <Typography variant="h5" color="textSecondary">
                    Live Data From Device
                  </Typography>
                </div>
              }
            >
              {viewDeviceDataContent}
            </Widget>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Dashboard;
