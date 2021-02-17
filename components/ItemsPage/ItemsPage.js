import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import AddListIcon from "../Icons/AddListIcon";
import CategoryList from "./CategoryList";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    right: "1.5rem",
    bottom: "5rem",
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.up("sm")]: { right: "27%" },
    [theme.breakpoints.up("lg")]: { right: "30%" },
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
