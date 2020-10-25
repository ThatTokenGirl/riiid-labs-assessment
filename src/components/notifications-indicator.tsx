import React from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

type NotificationsIndicatorProps = { count: number };
export default function NotificationsIndicator({
  count,
}: NotificationsIndicatorProps) {
  return !!count ? (
    <Badge badgeContent={count}>
      <NotificationsIcon />
    </Badge>
  ) : (
    <NotificationsIcon />
  );
}
