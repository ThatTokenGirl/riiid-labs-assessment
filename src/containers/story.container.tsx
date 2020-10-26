import { Card, CardContent } from "@material-ui/core";
import React, { forwardRef, RefObject, useEffect, useState } from "react";
import { getItem, HackerNewItemStory } from "../backend/hackernews";
import { NewsItem } from "../components";
import { useBookmarks } from "../store";
import CommentSectionContainer from "./comment-section.container";

type StoryContainerProps = { ref?: RefObject<any>; storyID: number };

const StoryContainer = forwardRef<any, StoryContainerProps>(
  ({ storyID }: StoryContainerProps, ref) => {
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
      <Card ref={ref} variant="outlined">
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
              <CommentSectionContainer
                parent={story!}
              ></CommentSectionContainer>
            </>
          )}
        </CardContent>
      </Card>
    );
  }
);

export default StoryContainer;
