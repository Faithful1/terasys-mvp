import React from "react";
import { withStyles, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import classnames from "classnames";

import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import CreateDevice from "../../pages/devices/CreateDevice/CreateDevice";
import GetDevices from "../../pages/devices/GetDevices/GetDevices";
import GenerateDeviceKey from "../../pages/devices/generateDeviceKey";
import GetDeviceKey from "../../pages/devices/getDeviceKey";
import AdminDashboard from "../../pages/adminDashboard/AdminDashboard";
import ManageGroup from "../../pages/groups/manageGroup/ManageGroup";
import AddGroup from "../../pages/groups/addGroup/AddGroup";

const Layout = ({ classes, isSidebarOpened, toggleSidebar }) => (
  <div className={classes.root}>
    <CssBaseline />
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: isSidebarOpened
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/admin" component={AdminDashboard} />
            <Route path="/app/manage-group" component={ManageGroup} />
            <Route path="/app/add-group" component={AddGroup} />
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/devices" component={GetDevices} />
            <Route path="/app/add-device" component={CreateDevice} />
            <Route path="/app/gen-key" component={GenerateDeviceKey} />
            <Route path="/app/get-key" component={GetDeviceKey} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  </div>
);

const styles = theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: `calc(100vw - 240px)`,
    minHeight: "100vh"
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing.unit * 6}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  fakeToolbar: {
    ...theme.mixins.toolbar
  }
});

export default withStyles(styles)(Layout);
