import React, { Component } from "react";
import propTypes from "prop-types";

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
    open: false,
    editDeviceData: {
      editApiurl: "https://www.terasyshub.io/api/v1/devices/:mac-address",
      mac: "",
      id: "_id",
      name: "",
      description: "",
      properties: {
        color: ""
      }
    }
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  onEditHandler = (_id, name, description, color) => {
    this.setState({
      open: true,
      editDeviceData: { _id, name, description, color }
    });
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

          <div>
            <Typography gutterBottom>
              Click to get the full Modal experience!
            </Typography>

            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={this.handleClose}
            >
              <div className="modal-paper">
                <Typography variant="h6" id="modal-title">
                  Text in a modal
                </Typography>

                <Card className="card">
                  <CardContent>
                    <div>
                      <TextField
                        value={this.state.editDeviceData.name}
                        onChange={e => {
                          let { editDeviceData } = this.state;
                          editDeviceData.name = e.target.value;
                        }}
                        margin="normal"
                        placeholder="name"
                      />
                    </div>

                    <div>
                      <TextField
                        name="mac"
                        value={this.state.editDeviceData.mac}
                        onChange={e => {
                          let { editDeviceData } = this.state;
                          editDeviceData.mac = e.target.value;
                        }}
                        margin="normal"
                        placeholder="mac"
                      />
                    </div>

                    <div>
                      <TextField
                        value={this.state.editDeviceData.description}
                        onChange={e => {
                          let { editDeviceData } = this.state;
                          editDeviceData.description = e.target.value;
                        }}
                        margin="normal"
                        placeholder="description"
                      />
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Update</Button>
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
