import React, { Component } from "react";
import ReactMapGL, { marker } from "react-map-gl";
import axios from "axios";

import { Grid } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";
import { TextField } from "@material-ui/core";

import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

class Dashboard extends Component {
  state = {
    getApiUrl: "https://www.terasyshub.io/api/v1/data/:temperature:mac-address",
    deviceData: [],
    error: "",
    metricsChoice: "",
    metric: [
      {
        type: "temperature"
      },
      {
        type: "humidity"
      }
    ],
    macAddress: "",
    viewport: {
      latitude: 6.5244,
      longitude: 3.3792,
      width: "100vw",
      height: "100vh",
      zoom: 10
    }
  };

  componentDidMount() {
    axios
      .get(`${this.state.getApiUrl}`)
      .then(response => this.setState({ devices: response.data }))
      .then(response => console.log(response.data))
      .catch(error => this.setState({ error: error.response.data }))
      .catch(error => console.log(error.response.data));
  }

  onChangeHandler = e => {
    this.setState({
      metricsChoice: e.target.value
    });
  };

  handleOptionChange = (e, index, value) => {
    this.setState({
      metricsChoice: value
    });
    console.log(this.state.metricsChoice);
  };

  render() {
    const { viewport, macAddress, metric, metricsChoice } = this.state;

    return (
      <React.Fragment>
        <PageTitle title="Terasys IoT Dashboard" />
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
                <form
                  onSubmit={this.submitHandler}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-search"
                    label="Enter Mac Address"
                    name="macAddress"
                    value={macAddress}
                    onChange={this.onChangeHandler}
                    type="search"
                    margin="normal"
                    helperText="Enter Mac Address"
                  />
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
                  mapStyle="mapbox://styles/faithfulanere/cjypfi4ql51wk1dm04hs0y102"
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onViewportChange={viewport => this.setState({ viewport })}
                >
                  Markers here
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
