import { Button, Divider, makeStyles } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import {
  getItem,
  HackerNewItemComment,
  HackerNewsItem,
} from "../backend/hackernews";
import { Comment } from "../components";

type CommentSectionProps = { parent: HackerNewsItem };

const useStyles = makeStyles({
  commentSectionContainer: {
    display: "flex",
  },

  commentSection: {
    padding: "1rem",
  },
});

export default function CommentSectionContainer({
  parent,
}: CommentSectionProps) {
  const classes = useStyles();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<HackerNewItemComment[]>([]);

  useEffect(() => {
    if (showComments) {
      const fetch = async () => {
        const comments = await Promise.all(
          (parent.kids || []).map((id) => getItem(id, { type: "comment" }))
        );

        setComments(comments);
      };

      fetch();
    }
  }, [showComments, parent.kids]);

  const elements = !showComments ? (
    <Button onClick={() => setShowComments(true)}>VIEW COMMENTS</Button>
  ) : showComments && comments.length ? (
    <>
      <Button onClick={() => setShowComments(false)}>HIDE COMMENTS</Button>
      {comments.map((c, index, array) => (
        <div key={c.id} className={classes.commentSectionContainer}>
          <Divider orientation="vertical" flexItem />

          <div className={classes.commentSection}>
            <Comment text={c.text} author={c.by}></Comment>
            <CommentSectionContainer parent={c}></CommentSectionContainer>
            {index !== array.length - 1 && <Divider />}
          </div>
        </div>
      ))}
    </>
  ) : (
    <></>
  );
  return <>{elements}</>;
}
