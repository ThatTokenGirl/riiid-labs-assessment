import React from "react";
import { useEffect, useState } from "react";
import {
  getItem,
  HackerNewItemComment,
  HackerNewItemStory,
} from "../../../backend/hackernews";
import { Comment, NewsItem } from "../../../components";
import { useBookmarks } from "../../../store";
import { CommentNotification as CommentNotificationFromStore } from "../../../store/notifications";

type CommentNotificationProps = { notification: CommentNotificationFromStore };

export default function CommentNotification({
  notification,
}: CommentNotificationProps) {
  const { isBookmarked, bookmark, unbookmark } = useBookmarks();
  const [comment, setComment] = useState<HackerNewItemComment | null>(null);
  const [story, setStory] = useState<HackerNewItemStory | null>(null);

  const toggleBookmark = (change: boolean) =>
    change ? bookmark(comment!.parent) : unbookmark(comment!.parent);

  useEffect(() => {
    const fetch = async () => {
      const comment = await getItem(notification.commentID, {
        type: "comment",
      });
      const story = await getItem(comment.parent, { type: "story" });

      setComment(comment);
      setStory(story);
    };

    fetch();
  }, [notification.commentID]);

  return (
    <>
      {story && (
        <NewsItem
          title={story.title}
          url={story.url}
          author={story.by}
          bookmarked={isBookmarked(story.id)}
          onBookmarkChange={toggleBookmark}
        />
      )}
      {comment !== null && <Comment text={comment.text} author={comment.by} />}
    </>
  );
}
