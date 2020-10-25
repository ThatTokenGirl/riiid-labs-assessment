export const ActionTypes = {
  ADD: "[NOTIFICATIONS] Add",
  MARK_SEEN: "[NOTIFICATIONS] Mark Seen",
} as const;

interface _Notification {
  refID: string;
  seen: boolean;
}

type AddAction = {
  type: typeof ActionTypes["ADD"];
  notification: Notification;
};
type MarkSeenAction = { type: typeof ActionTypes["MARK_SEEN"]; refID: string };

export type CommentNotification = _Notification & {
  type: "comment";
  commentID: number;
};
export type Notification = CommentNotification;

export function add(notification: Omit<Notification, "seen">): AddAction {
  return {
    type: ActionTypes.ADD,
    notification: { ...notification, seen: false },
  };
}

export function markSeen(refID: string): MarkSeenAction {
  return { type: ActionTypes.MARK_SEEN, refID };
}

export type NotificationActions = AddAction | MarkSeenAction;
