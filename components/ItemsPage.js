import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import firebase from "../utils/firebaseConfig";
import AddListIcon from "./icons/AddListIcon";
import CategoryList from "./CategoryList";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  fab: {
    position: "fixed",
    right: "1.5rem",
    bottom: "5rem",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function ItemsPage() {
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
  });

  return (
    <React.Fragment>
      <Typography variant="h2" color="textSecondary" className={classes.title}>
        Items
      </Typography>

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
