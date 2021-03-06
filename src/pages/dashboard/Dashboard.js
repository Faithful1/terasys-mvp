import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";

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
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import DeviceStat from "./components/DeviceStat/DeviceStat";

class Dashboard extends Component {
  state = {
    isLoading: false,
    getApiUrl: "https://www.terasyshub.io/api/v1/devices/",

    devices: [],
    deviceTemperatureData: [],
    deviceHumidityData: [],

    deviceTemperatureMetric: "temperature",
    deviceHumidityMetric: "humidity",
    metricsChoice: "",
    macAddress: "",
    error: ""
  };

  componentWillMount() {
    this._getDevices();
  }

  submitHandler = e => {
    e.preventDefault();
    const {
      deviceTemperatureMetric,
      deviceHumidityMetric,
      macAddress
    } = this.state;

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .get(
        `https://www.terasyshub.io/api/v1/data/${deviceTemperatureMetric}/${macAddress}`,
        { headers }
      )
      .then(response => {
        const newTemperatureDevice = _.map(response.data, tempData => ({
          ...tempData,
          timestamp: moment.unix(tempData.timestamp).format("YYYY-MM-DD HH:mm")
        }));

        const tempRecord = newTemperatureDevice.reverse();

        this.setState({
          deviceTemperatureData: tempRecord,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({
          error: error.response.data,
          isLoading: false
        })
      );

    axios
      .get(
        `https://www.terasyshub.io/api/v1/data/${deviceHumidityMetric}/${macAddress}`,
        { headers }
      )
      .then(response => {
        const newHumidityDevice = _.map(response.data, tempData => ({
          ...tempData,
          timestamp: moment.unix(tempData.timestamp).format("YYYY-MM-DD HH:mm")
        }));

        const humidityRecord = newHumidityDevice.reverse();
        this.setState({
          deviceHumidityData: humidityRecord,
          isLoading: false
        });
      })
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
      error,
      devices,
      isLoading,
      deviceName,
      deviceHumidityData,
      deviceTemperatureData
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
              <ResponsiveContainer width="100%" minWidth={500} height={150}>
                <form>
                  {error ? (
                    <Typography color="secondary" className="errors">
                      Login with an admin account to view details
                    </Typography>
                  ) : null}

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
            <DeviceStat
              TemperatureContent={deviceTemperatureData}
              HumidityContent={deviceHumidityData}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Dashboard;
