import React, { Component } from "react";

import PageTitle from "../../components/PageTitle";

import AddGroup from "./components/addGroup/AddGroup";
import GroupList from "./components/getGroupList/GetGroupList";

import "./AdminDashboard.css";

import { Grid, Paper } from "@material-ui/core";

class AdminDashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle title="Admin Dashboard" />

        <div className="root">
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6} xl={3}>
              <Paper className="paper">
                <AddGroup />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className="paper">
                <GroupList />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
