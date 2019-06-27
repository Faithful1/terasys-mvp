import React, { Component } from "react";
import propTypes from "prop-types";
import { GridList, GridListTile } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./deviceResults.css";

class DeviceResults extends Component {
  render() {
    let deviceListContent;
    const { devices } = this.props;

    if (devices) {
      deviceListContent = (
        <Card className="card">
          {devices.map(device => (
            <React.Fragment>
              <CardContent key={device._id}>
                <Typography
                  className="title"
                  color="textSecondary"
                  gutterBottom
                >
                  {device.mac}
                </Typography>
                <Typography variant="h5" component="h2">
                  {device.name}
                </Typography>
                <Typography className="pos" color="textSecondary">
                  {device.__v}
                </Typography>
                <Typography variant="body2" component="p">
                  {device.description}
                  <br />
                  {device.properties.color}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </React.Fragment>
          ))}
        </Card>
      );
    } else {
      deviceListContent = null;
    }

    return <React.Fragment>{deviceListContent}</React.Fragment>;
  }
}

DeviceResults.propTypes = {
  devices: propTypes.array.isRequired
};

export default DeviceResults;
