import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import firebase from "../utils/firebaseConfig";
import AddFolderIcon from "./icons/AddFolderIcon";
import CategoryCard from "./CategoryCard";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  fab: {
    position: "absolute",
    right: "1.5rem",
    bottom: "1.5rem",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CategoriesPage() {
  const classes = useStyles();
  const router = useRouter();
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("categories")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(data);
      });
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h2" color="textSecondary" className={classes.title}>
        Categories
      </Typography>

      {categories.map((category) => (
        <CategoryCard {...category} key={`category-${category.id}`} />
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
