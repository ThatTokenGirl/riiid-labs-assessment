import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useNotifications } from "../../store/notifications";
import CommentNotification from "./containers/comment-notification.containers";

const useStyles = makeStyles({
  label: {
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

const NotificationsPage = () => {
  const { notifications } = useNotifications();
  const classes = useStyles();

  return (
    <>
      {!notifications.length ? (
        <Typography className={classes.label} variant="h4">
          You have no notifications
        </Typography>
      ) : (
        notifications.map((noto) => (
          <Card key={noto.refID}>
            <CardContent>
              {noto.type === "comment" ? (
                <CommentNotification notification={noto} />
              ) : (
                false
              )}
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default NotificationsPage;
