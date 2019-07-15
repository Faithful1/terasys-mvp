import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  ListItemText,
  ListItem,
  List,
  Modal,
  TextField
} from "@material-ui/core";

import "./GroupResult.css";

class GroupResult extends Component {
  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/groups",
    addDeviceUrl: "https://www.terasyshub.io/api/v1/devices",
    groups: [],
    openModalForUpdateGroup: false,
    openModalForAddDevice: false,
    error: "",
    success: "",
    isLoading: false,
    groupName: "",

    editGroupData: {
      groupID: "",
      name: "",
      description: ""
    },

    addDeviceToGroup: {
      gid: "",
      mac: "",
      name: "",
      description: "",
      email: "",
      location: [],
      properties: {
        color: ""
      },
      admin: false
    }
  };

  componentDidMount() {
    this._refreshGroups();
  }

  componentWillMount() {
    this._refreshGroups();
  }

  handleClose = () => {
    this.setState({
      openModalForUpdateGroup: false,
      openModalForAddDevice: false
    });
  };

  updateGroupHandler = e => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .patch(
        `/api/v1/groups/${this.state.editGroupData.groupID}`,
        this.state.editGroupData,
        { headers }
      )
      .then(response => {
        this._refreshGroups();
      })
      .catch(error => this.setState({ error: error.response.data }));
  };

  onEditHandler = (_id, name, description) => {
    this.setState({
      openModalForUpdateGroup: true,
      editGroupData: {
        groupID: _id,
        name: name,
        description: description
      }
    });
  };

  onDeviceAddHandler = (_id, name) => {
    this.setState({
      openModalForAddDevice: true,
      groupName: name,
      addDeviceToGroup: {
        gid: _id
      }
    });
  };

  onChangeHandler = e => {
    console.log(e.target.name);
    console.log(e.target.value);

    this.SetState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitDevice = e => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .post(`${this.state.addDeviceUrl}`, this.state.addDeviceToGroup, {
        headers: headers
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => this.setState({ errors: error.response.data }));
  };

  _refreshGroups() {
    axios
      .get(`${this.state.apiUrl}`)
      .then(response => this.setState({ groups: response.data }))
      .catch(error => this.setState({ error: error.response.data }));
  }

  render() {
    let groupListContent;
    const {
      openModalForUpdateGroup,
      openModalForAddDevice,
      groupName,
      groups,
      success,
      error
    } = this.state;

    if (groups) {
      groupListContent = (
        <React.Fragment>
          {/* Grid that displays all existing groups */}
          <Grid
            container
            spacing={24}
            style={{ padding: 24 }}
            justify="center"
            alignItems="stretch"
          >
            {groups.map(group => (
              <Grid key={group._id} item xs={12} sm={6} lg={4} xl={3}>
                <Card className="card">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {group.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Description: {group.description}
                    </Typography>
                    <br />
                    Admin:
                    {group.admins.map((admin, index) => (
                      <List key={index}>
                        <ListItem>
                          <ListItemText>{admin}</ListItemText>
                        </ListItem>
                      </List>
                    ))}
                    Devices:
                    {group.devices.map((device, index) => (
                      <List key={index}>
                        <ListItem>
                          <ListItemText>{device}</ListItemText>
                        </ListItem>
                      </List>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={this.onEditHandler.bind(
                        this,
                        group._id,
                        group.name,
                        group.description
                      )}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={this.onDeviceAddHandler.bind(
                        this,
                        group._id,
                        group.name
                      )}
                    >
                      Add Device
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* modal for handling group update */}
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={openModalForUpdateGroup}
              onClose={this.handleClose}
            >
              <div className="modal-paper">
                <Typography variant="h6" id="modal-title">
                  Update Group Info
                </Typography>

                <Card className="card">
                  <CardContent>
                    <div>
                      <Typography>Name</Typography>

                      <TextField
                        margin="normal"
                        placeholder="name"
                        onChange={e => {
                          let { editGroupData } = this.state;
                          editGroupData.name = e.target.value;
                          this.setState({ editGroupData });
                        }}
                        value={this.state.editGroupData.name}
                      />
                    </div>

                    <div>
                      <Typography>Description</Typography>
                      <TextField
                        margin="normal"
                        placeholder="description"
                        onChange={e => {
                          let { editGroupData } = this.state;
                          editGroupData.description = e.target.value;
                          this.setState({ editGroupData });
                        }}
                        value={this.state.editGroupData.description}
                      />
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={this.updateGroupHandler}>
                      Update Group
                    </Button>
                    <Button size="small" onClick={this.handleClose}>
                      close
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </Modal>
          </div>

          {/* modal for adding device to group */}
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={openModalForAddDevice}
              onClose={this.handleClose}
            >
              <div className="modal-paper">
                <Typography variant="h6" id="modal-title">
                  Add device to {groupName}
                </Typography>

                <Card className="card">
                  <CardContent>
                    <form onSubmit={this.onSubmitDevice}>
                      <div>
                        <TextField
                          name="mac"
                          value={this.state.addDeviceToGroup.mac}
                          onChange={this.changeHandler}
                          placeholder="mac"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="name"
                          value={this.state.addDeviceToGroup.name}
                          onChange={this.changeHandler}
                          placeholder="name"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="description"
                          value={this.state.addDeviceToGroup.description}
                          onChange={this.changeHandler}
                          placeholder="description"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="email"
                          value={this.state.addDeviceToGroup.email}
                          onChange={this.changeHandler}
                          placeholder="email"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="location"
                          value={this.state.addDeviceToGroup.location}
                          onChange={this.changeHandler}
                          placeholder="location"
                          margin="normal"
                        />
                      </div>

                      <br />

                      <div>
                        {success ? (
                          <p className="success" variant="h5">
                            {success}
                          </p>
                        ) : (
                          <p className="error" variant="h5">
                            {error}
                          </p>
                        )}
                      </div>

                      <Button type="submit" variant="contained" color="primary">
                        Add Device
                      </Button>
                    </form>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={this.addDeviceHandler}>
                      Update Group
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
      groupListContent = null;
    }
    return <React.Fragment>{groupListContent}</React.Fragment>;
  }
}

export default GroupResult;
