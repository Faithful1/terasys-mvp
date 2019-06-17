import React, { Component, Fragment } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import NotFound from '../Errors/404';

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

          <hr />
          <Switch>
            <Route exact path="/" render={() => <div>Home</div>} />
            <Route path="/devices" render={() => <div>devices</div>} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default navigation;
