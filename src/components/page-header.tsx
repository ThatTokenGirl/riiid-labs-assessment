import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { PropsWithChildren } from "react";

const useStyles = makeStyles({
  label: {
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default function PageHeader({ children }: PropsWithChildren<{}>) {
  const classes = useStyles();
  return (
    <Typography className={classes.label} variant="h4">
      {children}
    </Typography>
  );
}
