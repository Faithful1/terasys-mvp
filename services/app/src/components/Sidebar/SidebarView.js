import React from "react";
import { Drawer, IconButton, List, withStyles } from "@material-ui/core";
import {
  Home as HomeIcon,
  DataUsage as DataIcon,
  // People as UserIcon,
  Group as GroupsIcon,
  DeviceHub as DeviceIcon,
  // QuestionAnswer as SupportIcon,
  // KeyboardReturn as KeyIcon,
  // HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import classNames from "classnames";

import SidebarLink from "./components/SidebarLink/SidebarLinkContainer";
// import Dot from "./components/Dot";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Device Management",
    link: "/app/devices",
    icon: <DeviceIcon />,
    children: [
      { label: "Add Device", link: "/app/add-device" },
      { label: "View Devices", link: "/app/devices" }
    ]
  },
  // {
  //   id: 2,
  //   label: "User Management",
  //   link: "/app/typography",
  //   icon: <UserIcon />
  // },
  {
    id: 3,
    label: "Data Management",
    link: "/app/notifications",
    icon: <DataIcon />
  },
  // {
  //   id: 4,
  //   label: "Data",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" }
  //   ]
  // },
  { id: 4, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  {
    id: 5,
    label: "Admin",
    link: "/app/manage-group",
    icon: <GroupsIcon />,
    children: [
      { label: "Add Group", link: "/app/add-group" },
      { label: "Manage Group", link: "/app/manage-group" },
      { label: "Generate Key", link: "/app/gen-key" },
      { label: "Get Device Key", link: "/app/get-key" }
    ]
  },
  // { id: 6, label: "Admin", link: "/app/admin", icon: <SupportIcon /> },
  // { id: 7, label: "FAQ", link: "", icon: <FAQIcon /> },
  { id: 8, type: "divider" }
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="large" color="warning" />
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="large" color="primary" />
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="large" color="secondary" />
  // }
];

const SidebarView = ({
  classes,
  theme,
  toggleSidebar,
  isSidebarOpened,
  isPermanent,
  location
}) => {
  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened
        })
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={toggleSidebar}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );
};

const drawerWidth = 240;

const styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  sidebarList: {
    marginTop: theme.spacing.unit * 6
  },
  mobileBackButton: {
    marginTop: theme.spacing.unit * 0.5,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing.unit * 0.625
    },
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

export default withStyles(styles, { withTheme: true })(SidebarView);
