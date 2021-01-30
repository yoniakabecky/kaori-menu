import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem auto",
    padding: "1rem 1.5rem",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    width: "100%",
    color: "#4F4F4F",
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",

    "& h2": { flexGrow: 1, color: "#333" },
    "& h3": {},
  },
  content: {
    marginTop: "0.5rem",
  },
  availability: {
    marginTop: "0.5rem",
    color: theme.palette.secondary.main,
  },
  image: {
    "& img": {
      maxWidth: 120,
      maxHeight: 120,
      borderRadius: 5,
    },
  },
}));

export default function MenuCard({ ...data }) {
  const classes = useStyles();
  const { item, price, description, askAvailability, image } = data;

  return (
    <Box component="article" className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h2">{item}</Typography>
        <Typography variant="h3">$ {price}</Typography>
      </Box>

      {(description || askAvailability || image) && (
        <Grid container className={classes.content}>
          {image && (
            <Grid item xs={6} className={classes.image}>
              <img src={image} alt={data.item} />
            </Grid>
          )}

          <Grid item xs={image ? 6 : 12}>
            <Typography variant="body1">{description}</Typography>
            {askAvailability && (
              <Typography variant="body2" className={classes.availability}>
                Please ask your server for availability
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
