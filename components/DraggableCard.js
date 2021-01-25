import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
    color: "#828282",
  },
  price: {
    padding: "0.5rem 1rem",
    fontWeight: 700,
  },
  display: {
    padding: "0 1rem",
  },
  image: {
    width: "85%",
    height: "100%",
    maxHeight: 80,
    borderRadius: 5,
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

export default function DraggableCard({ type, ...props }) {
  const classes = useStyles();
  const router = useRouter();
  const { id, description, price, image, askAvailability, display } = props;
  const name = type === "item" ? props.item : props.category;

  return (
    <Paper className={classes.root}>
      <DraggableIcon className={classes.drag} />

      <Typography variant="h3" className={classes.name}>
        {name}
      </Typography>

      <IconButton
        className={classes.edit}
        onClick={() => router.push(`/admin/${type}/${id}`)}
      >
        <EditIcon />
      </IconButton>

      {description && (
        <Typography variant="body1" className={classes.description}>
          {description}
        </Typography>
      )}

      {type === "item" && (
        <Grid container>
          <Grid item xs={6} sm={8}>
            <Typography variant="body1" className={classes.price}>
              $ {price}
            </Typography>

            <Typography
              variant="body2"
              color="secondary"
              className={classes.display}
            >
              Display: {display ? "On" : "Off"}
            </Typography>

            <Typography
              variant="body2"
              color="secondary"
              className={classes.display}
            >
              Ask Server: {askAvailability ? "On" : "Off"}
            </Typography>
          </Grid>

          {image && (
            <Grid item xs={6} sm={4}>
              <img className={classes.image} src={image} alt={name} />
            </Grid>
          )}
        </Grid>
      )}
    </Paper>
  );
}
