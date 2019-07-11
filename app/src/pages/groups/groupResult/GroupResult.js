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
    groups: [],
    editGroupData: {
      groupID: "",
      name: "",
      description: ""
    },
    open: false,
    error: ""
  };

  componentDidMount() {
    this._refreshGroups();
  }

  componentWillMount() {
    this._refreshGroups();
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  onEditHandler = (_id, name, description) => {
    this.setState({
      open: true,
      editGroupData: {
        groupID: _id,
        name: name,
        description: description
      }
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

  _refreshGroups() {
    axios
      .get(`${this.state.apiUrl}`)
      .then(response => this.setState({ groups: response.data }))
      .catch(error => this.setState({ error: error.response.data }));
  }

  render() {
    let groupListContent;
    const { error, open, groups } = this.state;

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
                    <Button size="small">Delete</Button>
                    <Button size="small">Read more</Button>
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
              open={open}
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
        </React.Fragment>
      );
    } else {
      groupListContent = null;
    }
    return <React.Fragment>{groupListContent}</React.Fragment>;
  }
}

export default GroupResult;
