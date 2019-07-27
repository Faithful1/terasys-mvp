import React, { Component } from "react";

import PageTitle from "../../components/PageTitle";

import AddGroup from "../groups/addGroup/AddGroup";

import "./AdminDashboard.css";

import { Grid, Paper } from "@material-ui/core";

class AdminDashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle title="Admin" />

        <div className="root">
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6} xl={3}>
              <Paper className="paper">
                <AddGroup />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
