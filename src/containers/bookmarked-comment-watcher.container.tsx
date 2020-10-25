import React, { useEffect, useRef } from "react";
import { getItem } from "../backend/hackernews";
import { useBookmarks } from "../store";
import { useNotifications } from "../store/notifications";

export default function BookmarkedCommentWatcherContainer() {
  const { bookmarks } = useBookmarks();
  const { comment } = useNotifications();
  const mostRecentCommentsRef = useRef<{
    [id: string]: number;
  }>({});

  useEffect(() => {
    const updateState = async (
      bookmarks: number[],
      mostRecent: typeof mostRecentCommentsRef.current
    ) => {
      const items = await Promise.all(bookmarks.map((id) => getItem(id)));
      const commentsHash = items.reduce((hash, { id, kids }) => {
        hash[id] = (kids ?? []).sort((a, b) => b - a);
        return hash;
      }, {} as { [id: string]: number[] });

      const next: typeof mostRecent = {};

      for (const [id, kids] of Object.entries(commentsHash)) {
        if (id in mostRecent) {
          const mostRecentID = mostRecent[id];
          const new_comments = kids.filter(
            (x) => !mostRecentID || x > mostRecentID
          );

          for (let i = new_comments.length - 1; i >= 0; i--) {
            const commentID = new_comments[i];
            comment(`comment_${commentID}`, commentID);
          }
        }

        next[id] = kids[0];
      }

      mostRecentCommentsRef.current = next;
    };

    const timer = setInterval(() => {
      updateState(bookmarks, mostRecentCommentsRef.current);
    }, 5000);

    return () => clearInterval(timer);
  }, [bookmarks, comment]);

  return <></>;
}
