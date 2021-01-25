import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import firebase from "../utils/firebaseConfig";
import AddListIcon from "./icons/AddListIcon";
import CategoryList from "./CategoryList";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    right: "1.5rem",
    bottom: "5rem",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function ItemsPage({ categories }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <React.Fragment>
      {categories.map((category) => (
        <CategoryList {...category} key={`category-${category.id}`} />
      ))}

      <Fab
        className={classes.fab}
        onClick={() => router.push("/admin/item/create")}
      >
        <AddListIcon />
      </Fab>
    </React.Fragment>
  );
}
