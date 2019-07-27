import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import PageTitle from "../../components/PageTitle";

import { Grid, Paper, Card, CardContent } from "@material-ui/core";

class GenerateDeviceKey extends Component {
  state = {
    apiurl: "https://www.terasyshub.io/api/v1/keys",
    key: "",
    searchText: "",
    success: "",
    error: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // onTextChange = e => {
  //   const val = e.target.value;
  //   this.setState(
  //     {
  //       [e.target.name]: e.target.value
  //     },
  //     () => {
  //       if (val === "") {
  //         this.setState({ key: "" });
  //       } else {
  //         axios
  //           .post(`${this.state.apiurl}/:${this.state.searchText}`)
  //           .then(response => this.setState({ key: response.data }))
  //           .then(response => console.log(response.data))
  //           .then(response => this.setState({ success: response.data }))
  //           .catch(error => this.setState({ error: error.response.data }))
  //           .catch(err => console.log(err));
  //       }
  //     }
  //   );
  // };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post(`${this.state.apiurl}/:${this.state.searchText}`)
      .then(response => this.setState({ key: response.data }))
      .then(response => this.setState({ success: response.data }))
      .catch(error => this.setState({ error: error.response.data }));
  };

  render() {
    const { key, searchText, success, error } = this.state;

    return (
      <React.Fragment>
        <PageTitle title="Generate Key" />

        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} xl={3}>
            <Paper className="paper">
              <Card>
                <CardContent>
                  <form onSubmit={this.submitHandler}>
                    <TextField
                      name="searchText"
                      value={searchText}
                      onChange={this.changeHandler}
                      fullWidth={true}
                      placeholder="Enter Mac Address"
                    />

                    <br />
                    <br />

                    <Button type="submit" variant="contained" color="primary">
                      Generate Key
                    </Button>
                  </form>

                  <div>
                    <p>{key}</p>
                  </div>

                  <br />
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
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default GenerateDeviceKey;
