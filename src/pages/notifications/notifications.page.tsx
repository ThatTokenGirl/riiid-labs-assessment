import { Card, CardContent } from "@material-ui/core";
import React from "react";
import { PageHeader } from "../../components";
import infiniteScroll from "../../hoc/infinitescroller";
import {
  CommentNotification,
  useNotifications,
} from "../../store/notifications";
import CommentNotificationContainer from "./containers/comment-notification.containers";

const NotificationsContainer = infiniteScroll<CommentNotification, {}>(
  ({ item: noto }) => (
    <Card key={noto.refID}>
      <CardContent>
        {noto.type === "comment" ? (
          <CommentNotificationContainer notification={noto} />
        ) : (
          false
        )}
      </CardContent>
    </Card>
  )
);

const NotificationsPage = () => {
  const { notifications } = useNotifications();

  return (
    <>
      {!notifications.length ? (
        <PageHeader>You have no notifications</PageHeader>
      ) : (
        <NotificationsContainer
          loader={(start, end) => notifications.slice(start, end)}
        ></NotificationsContainer>
      )}
    </>
  );
};

export default NotificationsPage;
