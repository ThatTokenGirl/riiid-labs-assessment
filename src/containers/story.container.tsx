import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getItem } from "../backend/hackernews";
import { NewsItem } from "../components";
import { useBookmarks } from "../store";

type StoryContainerProps = { storyID: number };

export default function ({ storyID }: StoryContainerProps) {
  const [story, setStory] = useState<{
    id: number;
    title: string;
    url: string;
    author: string;
    bookmarked: boolean;
  } | null>(null);
  const { bookmark, unbookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    const fetch = async () => {
      const { title, url, by } = await getItem(storyID);
      setStory({
        id: storyID,
        title,
        url,
        author: by,
        bookmarked: isBookmarked(storyID),
      });
    };

    fetch();
  }, []);

  const bookmarkChange = async (bookmarked: boolean) => {
    bookmarked ? bookmark(story!.id) : unbookmark(story!.id);

    setStory({ ...story!, bookmarked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        {story && (
          <NewsItem {...story} onBookmarkChange={bookmarkChange}></NewsItem>
        )}
      </CardContent>
    </Card>
  );
}
