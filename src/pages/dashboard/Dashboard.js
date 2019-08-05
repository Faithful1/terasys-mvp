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
  FormHelperText
} from "@material-ui/core";

import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

import markerImage from "./device.svg";

class Dashboard extends Component {
  state = {
    deviceData: [],
    isLoading: false,
    error: "",
    metricsChoice: "",
    selectedDevice: "",
    macAddress: "",
    viewport: {
      latitude: 9.082,
      longitude: 8.6753,
      width: "100vw",
      height: "100vh",
      zoom: 5
    }
  };

  submitHandler = e => {
    e.preventDefault();

    const { metricsChoice, macAddress } = this.state;

    this.setState({
      isLoading: true
    });

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .get(
        `https://www.terasyshub.io/api/v1/data/${metricsChoice}/${macAddress}`,
        { headers: headers }
      )
      .then(response =>
        this.setState({
          deviceData: response.data,
          isLoading: false,
          metricsChoice: "",
          macAddress: ""
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

  render() {
    const {
      viewport,
      deviceData,
      macAddress,
      error,
      metricsChoice,
      isLoading,
      selectedDevice
    } = this.state;

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
                <form onSubmit={this.submitHandler}>
                  {error ? (
                    <Typography color="secondary" className="errors">
                      {error}
                    </Typography>
                  ) : null}

                  <TextField
                    required
                    id="standard-search"
                    name="macAddress"
                    value={macAddress}
                    onChange={this.onChangeHandler}
                    type="search"
                    margin="dense"
                    helperText="Enter Mac Address"
                  />
                  <br />
                  <br />
                  <Select
                    native
                    required
                    name="metricsChoice"
                    value={metricsChoice}
                    onChange={this.onChangeHandler}
                    inputProps={{ required: true }}
                    margin="dense"
                  >
                    <option value="none" />
                    <option value="temperature">temperature</option>
                    <option value="humidity">humidity</option>
                  </Select>
                  <FormHelperText>Select Metrics</FormHelperText>

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
                      >
                        Search Device
                      </Button>
                    )}
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
                <ReactMapGL
                  {...viewport}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  // mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapStyle="mapbox://styles/mapbox/light-v10"
                  onViewportChange={viewport => this.setState({ viewport })}
                >
                  {deviceData.map(data => (
                    <Marker
                      key={data._id}
                      longitude={data.location.lon}
                      latitude={data.location.lat}
                    >
                      <img
                        onClick={e => {
                          e.preventDefault();
                          this.setState({ selectedDevice: data });
                        }}
                        src={markerImage}
                        alt="devices"
                      />
                    </Marker>
                  ))}

                  {selectedDevice ? (
                    <Popup
                      tipSize={5}
                      anchor="top"
                      latitude={selectedDevice.location.lat}
                      longitude={selectedDevice.location.lon}
                      onClose={() => {
                        this.setState({ selectedDevice: null });
                      }}
                    >
                      <Typography>
                        Mac:{selectedDevice.mac} <br />
                        TimeStamp: {selectedDevice.timestamp} <br />
                        Longitude: {selectedDevice.location.lon} <br />
                        Latitude: {selectedDevice.location.lat} <br />
                        Type: {selectedDevice.type} <br />
                        Value: {selectedDevice.value}
                      </Typography>
                    </Popup>
                  ) : null}
                </ReactMapGL>
              </ResponsiveContainer>
            </Widget>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Dashboard;
