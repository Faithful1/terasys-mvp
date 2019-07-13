import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  TextField,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Modal
} from "@material-ui/core";

import "./deviceResults.css";

class DeviceResults extends Component {
  state = {
    getApiUrl: "https://www.terasyshub.io/api/v1/devices/",
    devices: [],
    editDeviceData: {
      id: "",
      mac: "",
      name: "",
      description: "",
      properties: {
        color: ""
      }
    },
    open: false,
    error: ""
  };
  componentDidMount() {
    this._refreshDevices();
  }

  componentWillMount() {
    this._refreshDevices();
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  onEditHandler = (_id, name, mac, description, color) => {
    this.setState({
      open: true,
      editDeviceData: {
        id: _id,
        name: name,
        mac: mac,
        description: description,
        properties: {
          color
        }
      }
    });
  };

  onDeleteHandler = mac => {
    axios.delete("/api/v1/devices/:" + mac).then(response => {
      this._refreshDevices();
    });
  };

  updateDeviceHandler = e => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json"
    };
    axios
      .patch(
        "/api/v1/devices/:" + this.state.editDeviceData.mac,
        this.state.editDeviceData,
        { headers }
      )
      .then(response => {
        this._refreshDevices();
      })
      .catch(error => this.setState({ error: error.response.data }));
  };

  _refreshDevices() {
    axios
      .get(`${this.state.getApiUrl}`)
      .then(response => this.setState({ devices: response.data }))
      .catch(error => this.setState({ error: error.response.data }));
  }

  render() {
    let deviceListContent;
    const { open, devices } = this.state;

    if (devices) {
      deviceListContent = (
        <React.Fragment>
          {/* Grid for getting all devices */}

          <Grid
            container
            spacing={24}
            style={{ padding: 24 }}
            justify="center"
            alignItems="stretch"
          >
            {devices.map(device => (
              <Grid key={device._id} item xs={12} sm={6} lg={4} xl={3}>
                <Card className="card">
                  <CardContent>
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
                      {device.properties.color}
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
                        device.mac,
                        device.description,
                        device.properties.color
                      )}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={this.onDeleteHandler.bind(this, device.mac)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* modal for handling device update */}
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={this.handleClose}
            >
              <div className="modal-paper">
                <Typography variant="h6" id="modal-title">
                  Update Device
                </Typography>

                <Card className="card">
                  <CardContent>
                    <div>
                      <Typography>Name</Typography>

                      <TextField
                        margin="normal"
                        placeholder="name"
                        onChange={e => {
                          let { editDeviceData } = this.state;
                          editDeviceData.name = e.target.value;
                          this.setState({ editDeviceData });
                        }}
                        value={this.state.editDeviceData.name}
                      />
                    </div>

                    <div>
                      <Typography>Mac</Typography>

                      <TextField
                        margin="normal"
                        placeholder="mac"
                        onChange={e => {
                          let { editDeviceData } = this.state;
                          editDeviceData.mac = e.target.value;
                          this.setState({ editDeviceData });
                        }}
                        value={this.state.editDeviceData.mac}
                      />
                    </div>

                    <div>
                      <Typography>Description</Typography>
                      <TextField
                        margin="normal"
                        placeholder="description"
                        onChange={e => {
                          let { editDeviceData } = this.state;
                          editDeviceData.description = e.target.value;
                          this.setState({ editDeviceData });
                        }}
                        value={this.state.editDeviceData.description}
                      />
                    </div>

                    <div>
                      <Typography>Color</Typography>

                      <TextField
                        margin="normal"
                        placeholder="color"
                        value={this.state.editDeviceData.properties.color}
                        onChange={e => {
                          let { editDeviceData } = this.state;
                          editDeviceData.properties.color = e.target.value;
                          this.setState({ editDeviceData });
                        }}
                      />
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={this.updateDeviceHandler}>
                      Update Device
                    </Button>
                    <Button size="small" onClick={this.handleClose}>
                      close
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </Modal>
          </div>
        </React.Fragment>
      );
    } else {
      deviceListContent = null;
    }

    return <React.Fragment>{deviceListContent}</React.Fragment>;
  }
}

export default DeviceResults;
