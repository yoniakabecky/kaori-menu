import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import AddFolderIcon from "../icons/AddFolderIcon";
import DraggableCard from "../DraggableCard";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    right: "1.5rem",
    bottom: "5rem",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CategoriesPage({ categories }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <React.Fragment>
      {categories.map((category) => (
        <DraggableCard
          {...category}
          type="category"
          key={`category-${category.id}`}
        />
      ))}

      <Fab
        className={classes.fab}
        onClick={() => router.push("/admin/category/create")}
      >
        <AddFolderIcon />
      </Fab>
    </React.Fragment>
  );
}
