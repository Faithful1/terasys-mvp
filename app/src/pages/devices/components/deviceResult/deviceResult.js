import React, { Component } from "react";
import propTypes from "prop-types";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

import "./deviceResults.css";

class DeviceResults extends Component {
  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/devices/",
    editApiurl: "https://www.terasyshub.io/api/v1/devices",
    open: false,
    error: "",
    editDeviceData: {
      id: "",
      mac: "",
      name: "",
      description: "",
      properties: {
        color: ""
      }
    }
  };

  componentWillMount() {
    this._refreshDevices();
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  onEditHandler = (id, name, mac, description, color) => {
    this.setState({
      open: true,
      devices: [],
      editDeviceData: {
        id: id,
        name: name,
        mac: mac,
        description: description,
        properties: {
          color
        }
      }
    });
  };

  _refreshDevices() {
    axios
      .get(`${this.state.apiUrl}`)
      .then(response => this.setState({ devices: response.data }))
      .catch(error => this.setState({ errors: error.response.data }));
  }

  upDateDeviceHandler = e => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json"
    };
    axios
      .put(
        "https://www.terasyshub.io/api/v1/devices/:" +
          this.state.editDeviceData.mac,
        this.state.editDeviceData,
        { headers: headers }
      )
      .then(response => {
        this._refreshDevices();
        this.setState({
          success: response.data,
          open: false
        });
      })

      .catch(error => this.setState({ error: error.response.data }));
  };

  render() {
    let deviceListContent;
    const { devices } = this.props;
    const { open } = this.state;

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
                    <Button size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

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
                    <Button size="small" onClick={this.upDateDeviceHandler}>
                      Update Device
                    </Button>
                    <Button size="small">cancel</Button>
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

DeviceResults.propTypes = {
  devices: propTypes.array.isRequired
};

export default DeviceResults;
