import React, { Component } from "react";
import ReactMapGL, { marker } from "react-map-gl";
import axios from "axios";

import { Grid } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";

import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

class Dashboard extends Component {
  state = {
    getApiUrl: "https://www.terasyshub.io/api/v1/data/",
    deviceData: [],
    error: "",
    metric: "",
    macAddress: "",
    viewport: {
      latitude: 9.082,
      longitude: 8.6753,
      width: "100vw",
      height: "100vh",
      zoom: 10
    }
  };

  async componentDidMount() {
    const { getApiUrl } = this.state;
    axios
      .get(`${getApiUrl}`)
      .then(response => this.setState({ devices: response.data }))
      .then(response => console.log(response.data))
      .catch(error => this.setState({ error: error.response.data }));
  }

  render() {
    const { viewport } = this.state;
    return (
      <React.Fragment>
        <PageTitle title="Terasys IoT Dashboard" />
        <Grid container spacing={32}>
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
