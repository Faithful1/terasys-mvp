import React, { Component } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  Card,
  CardContent
} from "@material-ui/core";
import { FixedSizeList } from "react-window";

import axios from "axios";

import "./GetGroupList.css";

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
      .catch(error => this.setState({ error: error.response.data }));
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
                  <FixedSizeList
                    button
                    key={group._id}
                    height={400}
                    width={360}
                    itemSize={10}
                    itemCount={200}
                  >
                    <ListItemText primary={group.name} />
                  </FixedSizeList>
                ))
              ) : (
                <p class="error">{error}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default GroupList;
