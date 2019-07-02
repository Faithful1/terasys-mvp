import React, { Component } from "react";

import PageTitle from "../../components/PageTitle";

import AddGroup from "./components/AddGoup";

class AdminDashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle title="Admin Dashboard" />
        <AddGroup />
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
