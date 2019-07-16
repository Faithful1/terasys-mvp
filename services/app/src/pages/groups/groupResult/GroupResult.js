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
  TextField,
  CircularProgress,
  FormControlLabel,
  Checkbox
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

  handleCloseUpdateGroupModal = () => {
    this.setState({
      openModalForUpdateGroup: false
    });
  };

  handleCloseAddDeviceToGroupModal = () => {
    this.setState({
      openModalForAddDevice: false
    });
  };

  handleCloseAddUserToGroupModal = () => {
    this.setState({
      openModalForAddUser: false
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
      .then(response =>
        this.setState({
          success: response.data,
          password: "",
          password_confirm: "",
          profile: {
            firstname: "",
            lastname: ""
          },
          admin: false
        })
      )
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

  handleIsUserAdmin = e => {
    this.setState({
      admin: e.target.checked
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
      error,
      isLoading,

      mac,
      name,
      description,
      email,
      properties: { color },
      location,

      password,
      password_confirm,
      profile: { firstname, lastname },
      admin
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
              onClose={this.handleCloseUpdateGroupModal}
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
                    <Button
                      size="small"
                      onClick={this.handleCloseUpdateGroupModal}
                    >
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
              onClose={this.handleCloseAddDeviceToGroupModal}
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
                          value={mac}
                          onChange={this.changeAddDeviceHandler}
                          placeholder="mac"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="name"
                          value={name}
                          onChange={this.changeAddDeviceHandler}
                          placeholder="name"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="description"
                          value={description}
                          onChange={this.changeAddDeviceHandler}
                          placeholder="description"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="color"
                          value={color}
                          onChange={e => {
                            let { properties } = this.state;
                            properties.color = e.target.value;
                            this.setState({ properties });
                          }}
                          placeholder="color"
                          margin="normal"
                        />
                      </div>

                      <div>
                        <TextField
                          name="location"
                          value={location}
                          onChange={this.changeAddDeviceHandler}
                          placeholder="location"
                          margin="normal"
                        />
                      </div>

                      <TextField
                        id="email"
                        name="email"
                        className="textFieldUnderline textField"
                        value={email}
                        onChange={this.changeAddDeviceHandler}
                        margin="normal"
                        placeholder="Email Address"
                        type="email"
                        fullWidth
                      />

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
                    </form>
                  </CardContent>
                  <CardActions>
                    <div className="creatingButtonContainer">
                      {isLoading ? (
                        <CircularProgress size={26} />
                      ) : (
                        <Button size="small" onClick={this.addDeviceHandler}>
                          add User
                        </Button>
                      )}
                    </div>

                    <Button
                      size="small"
                      onClick={this.handleCloseAddDeviceToGroupModal}
                    >
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
              onClose={this.handleCloseAddUserToGroupModal}
            >
              <div className="modal-paper">
                <Typography variant="h6" id="modal-title">
                  Add User to group
                </Typography>

                {error ? (
                  <Typography color="secondary" className="errorMessage">
                    {error}
                  </Typography>
                ) : (
                  <Typography color="primary" className="successMessage">
                    {success}
                  </Typography>
                )}

                <Card className="card">
                  <CardContent>
                    <form onSubmit={this.onSubmitUser}>
                      <div>
                        <TextField
                          id="email"
                          name="email"
                          className="textFieldUnderline textField"
                          value={email}
                          onChange={this.changeAddUserHandler}
                          margin="normal"
                          placeholder="Email Address"
                          type="email"
                          fullWidth
                        />
                      </div>

                      <div>
                        <TextField
                          id="password"
                          name="password"
                          value={password}
                          className="textFieldUnderline textField"
                          onChange={this.changeAddUserHandler}
                          margin="normal"
                          placeholder="Password"
                          type="password"
                          fullWidth
                        />
                      </div>

                      <div>
                        <TextField
                          id="password_confirm"
                          name="password_confirm"
                          value={password_confirm}
                          className="textFieldUnderline textField"
                          onChange={this.changeAddUserHandler}
                          margin="normal"
                          placeholder="Confirm Password"
                          type="password"
                          fullWidth
                        />
                      </div>

                      <div>
                        <TextField
                          id="firstname"
                          name="firstname"
                          className="textFieldUnderline textField"
                          value={firstname}
                          onChange={e => {
                            let { profile } = this.state;
                            profile.firstname = e.target.value;
                            this.setState({ profile });
                          }}
                          margin="normal"
                          placeholder="First Name"
                          type="text"
                          fullWidth
                        />
                      </div>

                      <div>
                        <TextField
                          id="lastname"
                          name="lastname"
                          className="textFieldUnderline textField"
                          value={lastname}
                          onChange={e => {
                            let { profile } = this.state;
                            profile.lastname = e.target.value;
                            this.setState({ profile });
                          }}
                          margin="normal"
                          placeholder="Last Name"
                          type="text"
                          fullWidth
                        />
                      </div>

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={admin}
                            onChange={this.handleIsUserAdmin}
                            value="admin"
                            color="primary"
                          />
                        }
                        label="Is Admin"
                      />

                      <br />
                    </form>
                  </CardContent>
                  <CardActions>
                    <div className="creatingButtonContainer">
                      {isLoading ? (
                        <CircularProgress size={26} />
                      ) : (
                        <Button size="small" onClick={this.onSubmitUser}>
                          add User
                        </Button>
                      )}
                    </div>

                    <Button
                      size="small"
                      onClick={this.handleCloseAddUserToGroupModal}
                    >
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
