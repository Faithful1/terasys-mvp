import React, { Component } from "react";
import axios from "axios";

import {
  Grid,
  Paper,
  Button,
  TextField,
  Card,
  CardContent
} from "@material-ui/core";

import "./AddGroup.css";

class AddGroup extends Component {
  state = {
    apiurl: "https://www.terasyshub.io/api/v1/groups",
    name: "",
    description: "",
    admins: [],
    users: [],
    devices: [],
    error: "",
    success: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post(`${this.state.apiurl}`, this.state)
      .then(response => this.setState({ success: response.data.name }))
      .catch(error => this.setState({ error: error.response.data }));
  };

  render() {
    const { name, description, success, error } = this.state;

    return (
      <React.Fragment>
        <div className="root">
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6} xl={3}>
              <Paper className="paper">
                <Card>
                  <CardContent>
                    Add Group
                    <form onSubmit={this.submitHandler}>
                      <div>
                        <TextField
                          name="name"
                          value={name}
                          onChange={this.changeHandler}
                          placeholder="name"
                          margin="normal"
                        />
                      </div>
                      <div>
                        <TextField
                          name="description"
                          value={description}
                          onChange={this.changeHandler}
                          placeholder="description"
                          margin="normal"
                        />
                      </div>

                      <br />

                      <div>
                        {success ? (
                          <p className="success" variant="h5">
                            Group name {success} Has been added
                          </p>
                        ) : (
                          <p className="error" variant="h5">
                            {error}
                          </p>
                        )}
                      </div>

                      <div>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Add Group
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default AddGroup;
