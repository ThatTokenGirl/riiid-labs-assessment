import { NotificationActions, ActionTypes, Notification } from "./actions";

const initialState: Notification[] = [];

export default function bookmarksReducer(
  state = initialState,
  action: NotificationActions
): Notification[] {
  switch (action.type) {
    case ActionTypes.ADD: {
      const { notification } = action;
      return [notification, ...state];
    }

    case ActionTypes.MARK_SEEN: {
      const { refID } = action;
      const index = state.findIndex((noto) => noto.refID === refID);

      if (!!~index) {
        state[index] = { ...state[index], seen: true };
        return [...state];
      }

      return state;
    }

    default:
      return state;
  }
}
