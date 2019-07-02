import React, { Component } from "react";
import propTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "./deviceResults.css";

class DeviceResults extends Component {
  render() {
    let deviceListContent;
    const { devices } = this.props;

    if (devices) {
      deviceListContent = (
        <Grid container direction="row" justify="center" alignItems="stretch">
          {devices.map(device => (
            <Grid key={device._id} item xs>
              <Paper className="paper">
                <Card className="card">
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
                        Version: {device.__v}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {device.color}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Description: {device.description}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Version: {device.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </React.Fragment>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
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
