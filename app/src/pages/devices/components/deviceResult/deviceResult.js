import React, { Component } from "react";
import propTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import EditModal from "../editModal/editModal";

import "./deviceResults.css";

class DeviceResults extends Component {
  state = {
    editDeviceData: {
      editApiurl: "https://www.terasyshub.io/api/v1/devices/:mac-address",
      mac: "",
      name: "",
      description: "",
      properties: {
        color: ""
      }
    }
  };

  onEditHandler = (_id, name, description, color) => {
    console.log(_id);
  };

  render() {
    let deviceListContent;
    const { devices } = this.props;

    if (devices) {
      deviceListContent = (
        <React.Fragment>
          <Grid
            container
            spacing={24}
            style={{ padding: 24 }}
            justify="center"
            alignItems="stretch"
          >
            {devices.map(device => (
              <Grid item key={device._id} xs={12} sm={6} lg={4} xl={3}>
                <Card className="card">
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
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={this.onEditHandler.bind(
                        this,
                        device._id,
                        device.name,
                        device.description,
                        device.color
                      )}
                    >
                      Edit
                    </Button>
                    <Button size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
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
