import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { StoryContainer } from "../../containers";
import infiniteScroll from "../../hoc/infinitescroller";
import { useBookmarks } from "../../store";

const useStyles = makeStyles({
  label: {
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

const BookmarksPage = () => {
  const classes = useStyles();
  const { bookmarks } = useBookmarks();

  const Component = infiniteScroll({
    loader: (start, end) => bookmarks.slice(start, end),
  })(({ item }) => <StoryContainer storyID={item}></StoryContainer>);

  return bookmarks.length ? (
    <Component />
  ) : (
    <Typography className={classes.label} variant="h4">
      Nothing has been bookmarked
    </Typography>
  );
};

export default BookmarksPage;
