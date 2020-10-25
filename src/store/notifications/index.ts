import { add, CommentNotification } from "./actions";
import { useCallback, useContext } from "react";
import { StoreContext } from "../context";

export { default as notificationsReducer } from "./reducer";

export const useNotifications = () => {
  const [state, dispatch] = useContext(StoreContext);

  const { notifications } = state;
  const comment = useCallback(
    (refID: string, commentID: number) => {
      const noto: Omit<CommentNotification, "seen"> = {
        type: "comment",
        refID,
        commentID,
      };

      dispatch(add(noto));
    },
    [dispatch]
  );

  return {
    notifications,
    comment,
  };
};
