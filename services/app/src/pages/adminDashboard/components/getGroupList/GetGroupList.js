import React, { Component } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  Card,
  CardContent
} from "@material-ui/core";

import axios from "axios";

class GroupList extends Component {
  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/groups",
    groups: [],
    error: ""
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .get(`${this.state.apiUrl}`)
      .then(response => this.setState({ groups: response.data }))
      .catch(error => this.setState({ errors: error.response.data }));
  };

  render() {
    const { groups, error } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardContent>
            <div>
              <Button
                type="submit"
                onClick={this.submitHandler}
                variant="contained"
                color="primary"
              >
                View all groups
              </Button>
            </div>

            <br />

            <div>
              {groups.length ? (
                groups.map(group => (
                  <ListItem button key={group._id}>
                    <ListItemText primary={group.name} />
                  </ListItem>
                ))
              ) : (
                <div>{error}</div>
              )}
            </div>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default GroupList;
