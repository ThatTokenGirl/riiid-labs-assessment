import React from "react";
import { PageHeader } from "../../components";
import { StoryContainer } from "../../containers";
import infiniteScroll from "../../hoc/infinitescroller";
import { useBookmarks } from "../../store";

const BookmarksContainer = infiniteScroll<number, {}>(({ item }) => (
  <StoryContainer storyID={item}></StoryContainer>
));

const BookmarksPage = () => {
  const { bookmarks } = useBookmarks();

  return bookmarks.length ? (
    <BookmarksContainer loader={(start, end) => bookmarks.slice(start, end)} />
  ) : (
    <PageHeader>Nothing has been bookmarked</PageHeader>
  );
};

export default BookmarksPage;
