import React, { Component, Fragment } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

export class navigation extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/devices">Devices</Link>
            </li>
          </ul>

          <Route exact path="/" render={() => <div>Home</div>} />
          <Route path="/devices" render={() => <div>devices</div>} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default navigation;
