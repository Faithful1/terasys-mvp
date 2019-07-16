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
    addUserUrl: "https://www.terasyshub.io/api/v1/register",

    openModalForUpdateGroup: false,
    openModalForAddDevice: false,
    openModalForAddUser: false,
    isLoading: false,

    groups: [],
    groupName: "",
    error: "",
    success: "",

    editGroupData: {
      groupID: "",
      name: "",
      description: ""
    },

    gid: "",
    mac: "",
    name: "",
    description: "",
    email: "",
    properties: {
      color: ""
    },
    location: [],

    password: " ",
    password_confirm: "",
    profile: {
      firstname: "",
      lastname: ""
    },
    admin: false
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
      openModalForAddDevice: false,
      openModalForAdduser: false
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

  onSubmitDevice = e => {
    e.preventDefault();

    console.log(this.state);

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .post(`${this.state.addDeviceUrl}`, this.state, {
        headers: headers
      })
      .then(response => {
        this._refreshGroups();
      })
      .catch(error => this.setState({ errors: error.response.data }));
  };

  onSubmitUser = e => {
    e.preventDefault();

    console.log(this.state);

    const headers = {
      "Content-Type": "application/json"
    };

    axios
      .post(`${this.state.addUserUrl}`, this.state, {
        headers: headers
      })
      .then(response => {
        this._refreshGroups();
      })
      .catch(error => this.setState({ errors: error.response.data }));
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

  onDeviceAddHandler = (_id, name, email) => {
    this.setState({
      openModalForAddDevice: true,
      groupName: name,
      gid: _id,
      email: email
    });
  };

  onUserAddHandler = _id => {
    this.setState({
      openModalForAddUser: true,
      gid: _id
    });
  };

  changeAddDeviceHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeAddUserHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
      openModalForAddUser,
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
                      onClick={this.onDeviceAddHandler.bind(this, group._id)}
                    >
                      Add Device
                    </Button>
                    <Button
                      size="small"
                      onClick={this.onUserAddHandler.bind(this, group._id)}
                    >
                      Add User
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
                  Add device to group
                </Typography>

                <Card className="card">
                  <CardContent>
                    <form onSubmit={this.onSubmitDevice}>
                      <div>
                        <TextField
                          name="mac"
                          value={this.state.mac}
                          onChange={this.changeAddDeviceHandler}
                          placeholder="mac"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="name"
                          value={this.state.name}
                          onChange={this.changeAddDeviceHandler}
                          placeholder="name"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="description"
                          value={this.state.description}
                          onChange={this.changeAddDeviceHandler}
                          placeholder="description"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="email"
                          value={this.state.email}
                          onChange={this.changeAddDeviceHandler}
                          placeholder="email"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="location"
                          value={this.state.location}
                          onChange={this.changeAddDeviceHandler}
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

          {/* modal for adding user/admin to group */}
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={openModalForAddUser}
              onClose={this.handleClose}
            >
              <div className="modal-paper">
                <Typography variant="h6" id="modal-title">
                  Add User to group
                </Typography>

                <Card className="card">
                  <CardContent>
                    <form onSubmit={this.onSubmitUser}>
                      <div>
                        <TextField
                          name="email"
                          value={this.state.email}
                          onChange={this.changeAddUserHandler}
                          placeholder="email"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="password"
                          value={this.state.password}
                          onChange={this.changeAddUserHandler}
                          placeholder="password"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="password_confirm"
                          value={this.state.password_confirm}
                          onChange={this.changeAddUserHandler}
                          placeholder="confirm password"
                          margin="normal"
                        />
                      </div>
                      <div>
                        <TextField
                          name="firstname"
                          value={this.state.profile.firstname}
                          onChange={this.changeAddUserHandler}
                          placeholder="firstname"
                          margin="normal"
                        />
                      </div>
                      <div>
                        <TextField
                          name="lastname"
                          value={this.state.profile.lastname}
                          onChange={this.changeAddUserHandler}
                          placeholder="lastname"
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
                        Add User
                      </Button>
                    </form>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={this.onSubmitUser}>
                      add User
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
