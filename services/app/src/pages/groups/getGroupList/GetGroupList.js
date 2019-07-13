import React, { Component } from "react";

import PageTitle from "../../../components/PageTitle/PageTitle";

import GroupResults from "../groupResult/GroupResult";

class GetGroups extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle title="Groups" />
        <br />

        <GroupResults />
      </React.Fragment>
    );
  }
}

export default GetGroups;
