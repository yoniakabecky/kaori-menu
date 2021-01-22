import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import AddListIcon from "./icons/AddListIcon";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: "1.5rem",
    bottom: "1.5rem",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function ItemsPage() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <React.Fragment>
      <Typography variant="h2" color="textSecondary" className={classes.title}>
        Items
      </Typography>

      <Fab
        className={classes.fab}
        onClick={() => router.push("/admin/item/create")}
      >
        <AddListIcon />
      </Fab>
    </React.Fragment>
  );
}
