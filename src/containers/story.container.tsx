import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getItem, HackerNewItemStory } from "../backend/hackernews";
import { NewsItem } from "../components";
import { useBookmarks } from "../store";
import CommentSectionContainer from "./comment-section.container";

type StoryContainerProps = { storyID: number };

export default function StoryContainer({ storyID }: StoryContainerProps) {
  const [story, setStory] = useState<
    (HackerNewItemStory & { bookmarked: boolean }) | null
  >(null);
  const { bookmark, unbookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    const fetch = async () => {
      const story = await getItem(storyID, { type: "story" });
      setStory({
        ...story,
        bookmarked: isBookmarked(story.id),
      });
    };

    fetch();
  }, [storyID]); // eslint-disable-line react-hooks/exhaustive-deps

  const bookmarkChange = async (bookmarked: boolean) => {
    bookmarked ? bookmark(story!.id) : unbookmark(story!.id);

    setStory({ ...story!, bookmarked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        {story && (
          <>
            <NewsItem
              title={story.title}
              author={story.by}
              url={story.url}
              bookmarked={story.bookmarked}
              onBookmarkChange={bookmarkChange}
            ></NewsItem>
            <CommentSectionContainer parent={story!}></CommentSectionContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}
