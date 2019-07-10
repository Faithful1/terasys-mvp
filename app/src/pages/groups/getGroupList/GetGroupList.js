import React, { Component } from "react";
import axios from "axios";

import PageTitle from "../../../components/PageTitle/PageTitle";

import GroupResults from "../groupResult/GroupResult";

class GetGroups extends Component {
  _isMounted = false;

  state = {
    apiUrl: "https://www.terasyshub.io/api/v1/groups",
    groups: [],
    errors: ""
  };

  componentDidMount() {
    this._isMounted = true;

    axios
      .get(`${this.state.apiUrl}`)
      .then(response => this.setState({ groups: response.data }))
      .catch(error => this.setState({ errors: error.response.data }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { groups, error } = this.state;

    return (
      <React.Fragment>
        <PageTitle title="Groups" />
        <br />
        {groups.length > 0 ? (
          <GroupResults groups={groups} />
        ) : (
          <div>{error}</div>
        )}
      </React.Fragment>
    );
  }
}

export default GetGroups;
