import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import DraggableIcon from "./icons/DraggableIcon";
import EditIcon from "./icons/EditIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: "1rem auto",
    padding: "1rem 0",
    width: "80%",
  },
  name: {
    margin: "0 2.5rem",
  },
  description: {
    marginTop: "1rem",
    padding: "0 1rem",
    paddingBottom: "0.5rem",
    color: "#828282",
  },
  drag: {
    position: "absolute",
    top: "0.875rem",
    left: "0.5rem",
    cursor: "not-allowed",
    // cursor: "grab",
  },
  edit: {
    position: "absolute",
    top: "0.375rem",
    right: "0.5rem",
  },
}));

export default function CategoryCard({ id, category, description }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <DraggableIcon className={classes.drag} />

      <Typography variant="h3" className={classes.name}>
        {category}
      </Typography>

      <IconButton className={classes.edit} onClick={() => console.log({ id })}>
        <EditIcon />
      </IconButton>

      {description && (
        <Typography variant="body1" className={classes.description}>
          {description}
        </Typography>
      )}
    </Paper>
  );
}
