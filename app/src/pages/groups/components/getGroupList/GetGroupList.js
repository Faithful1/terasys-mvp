import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  ListItemText,
  ListItem,
  List
} from "@material-ui/core";

import axios from "axios";
import PageTitle from "../../../../components/PageTitle/PageTitle";

import "./GetGroupList.css";

class GroupList extends Component {
  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/groups",
    groups: [],
    error: ""
  };

  componentDidMount() {
    axios
      .get(`${this.state.apiUrl}`)
      .then(response => this.setState({ groups: response.data }))
      .catch(error => this.setState({ error: error.response.data }));
  }

  render() {
    const { groups, error } = this.state;
    return (
      <React.Fragment>
        <PageTitle title="Groups" />
        <br />
        <Grid
          container
          spacing={24}
          style={{ padding: 24 }}
          justify="center"
          alignItems="stretch"
        >
          {groups.length ? (
            groups.map(group => (
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
                    <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button>
                    <Button size="small">Read more</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <p className="error">{error}</p>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default GroupList;
