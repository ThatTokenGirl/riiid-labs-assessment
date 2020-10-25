import { Typography } from "@material-ui/core";

import React from "react";

type CommentProps = { text: string; author: string };
export default function Comment({ text, author }: CommentProps) {
  return (
    <>
      <Typography color="textSecondary" gutterBottom>
        {author}
      </Typography>

      <Typography gutterBottom>
        <span dangerouslySetInnerHTML={{ __html: text }}></span>
      </Typography>
    </>
  );
}
