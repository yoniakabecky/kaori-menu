import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
}));

export default function MenuPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h2" color="textSecondary" className={classes.title}>
        Your Menu
      </Typography>
    </React.Fragment>
  );
}
