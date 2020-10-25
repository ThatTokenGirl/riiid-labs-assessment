import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React, { Fragment } from "react";

import HomeIcon from "@material-ui/icons/Home";
import BookmarkIcon from "@material-ui/icons/BookmarkBorder";
import HistoryIcon from "@material-ui/icons/History";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import NotificationsIndicator from "../components/notifications-indicator";
import { useNotifications } from "../store/notifications";

const useStyles = makeStyles({
  drawerPaper: {
    width: 250,
  },

  selected: {
    fontWeight: "bold",
  },
});

const NotificationsContainer = () => {
  const { notifications } = useNotifications();
  return (
    <NotificationsIndicator
      count={notifications.filter((x) => !x.seen).length}
    ></NotificationsIndicator>
  );
};

const routes = [
  { name: "Home", icon: <HomeIcon />, path: "/home" },
  { name: "Bookmarks", icon: <BookmarkIcon />, path: "/bookmarks" },
  {
    name: "Notifications",
    icon: <NotificationsContainer />,
    path: "/notifications",
  },
  { name: "History", icon: <HistoryIcon />, path: "/history" },
];

export default function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar></Toolbar>
      <Divider></Divider>
      <List>
        {routes.map(({ name, icon, path }) => {
          const matches = matchPath(pathname, path);

          return (
            <Fragment key={name}>
              <ListItem button onClick={() => history.push(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  classes={{ primary: matches ? classes.selected : "" }}
                >
                  {name}
                </ListItemText>
              </ListItem>
              <Divider />
            </Fragment>
          );
        })}
      </List>
    </Drawer>
  );
}
