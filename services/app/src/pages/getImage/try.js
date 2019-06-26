import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import DeviceResults from "./components/deviceResult";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class GetDevices extends Component {
  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/devices/",
    classes: useStyles(),
    bull: <span className={this.classes.bullet}>•</span>,
    devices: []
  };

  // componentDidMount() {
  //   axios
  //     .get(this.state.apiurl)
  //     .then(res => this.setState({ devices: res.data }))
  //     .catch(err => console.log(err));
  //   console.log("Our data is fetched");
  // }

  render() {
    let deviceListContent;
    const { classes, bull, devices } = this.state;

    if (devices) {
      deviceListContent = (
        <GridList cols={3}>
          {devices.map(device => (
            <GridListTile
              title={device.name}
              key={device.id}
              subtitle={
                <span>
                  description: <strong>{device.description}</strong>
                </span>
              }
            />
          ))}
        </GridList>
      );
    } else {
      deviceListContent = null;
    }
    return (
      <React.Fragment>
        {deviceListContent}

        <Card className={classes.card}>
          <CardContent className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="h2">
                be
                {bull}
                nev
                {bull}o{bull}
                lent
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </CardContent>
        </Card>
        <br />
        {this.state.devices.length > 0 ? (
          <DeviceResults devices={this.state.devices} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default GetDevices;
