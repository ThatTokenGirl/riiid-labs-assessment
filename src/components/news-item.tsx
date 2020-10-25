import { IconButton, makeStyles, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import IconBookmark from "@material-ui/icons/Bookmark";
import IconBookmarkBorder from "@material-ui/icons/BookmarkBorder";

type NewsItemProps = {
  title: string;
  url: string;
  author: string;
  bookmarked: boolean;
  onBookmarkChange: (bookmarked: boolean) => void;
};

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 70px",
    gridTemplateRows: "max-content",
    gap: "1rem",
    alignItems: "start",
  },

  bookmark: {
    textAlign: "center",
  },

  bookmarkChecked: {
    color: "#483577",
  },

  bookmarkedLabel: {
    color: "#483577",
    fontSize: ".75rem",
  },
});
export default function NewsItem(props: NewsItemProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h5" component="h3">
          <a href={props.url} target="_blank" rel="noreferrer">
            {props.title}
          </a>
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Submitted by {props.author}
        </Typography>
      </div>
      <div className={classes.bookmark}>
        {props.bookmarked ? (
          <Fragment>
            <IconButton
              className={classes.bookmarkChecked}
              onClick={() =>
                props.onBookmarkChange && props.onBookmarkChange(false)
              }
            >
              <IconBookmark></IconBookmark>
            </IconButton>
            <Typography
              variant="h6"
              component="h6"
              color="textSecondary"
              className={classes.bookmarkedLabel}
            >
              Bookmarked!
            </Typography>
          </Fragment>
        ) : (
          <IconButton
            onClick={() =>
              props.onBookmarkChange && props.onBookmarkChange(true)
            }
          >
            <IconBookmarkBorder></IconBookmarkBorder>
          </IconButton>
        )}
      </div>
    </div>
  );
}
