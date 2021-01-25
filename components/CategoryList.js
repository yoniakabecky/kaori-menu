import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import firebase from "@@/utils/firebaseConfig";
import TriangleIcon from "./icons/TriangleIcon";
import DraggableCard from "./DraggableCard";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    margin: "1rem auto",
    padding: "1rem",
    width: "80%",
    backgroundColor: theme.palette.primary.main,
    color: "#828282",
  },
  name: {
    flexGrow: 1,
    lineHeight: "unset",
  },
  icon: {
    fill: "#828282",
  },
}));

export default function CategoryList({ category, id }) {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);

  const handleClick = () => {
    firebase
      .firestore()
      .collection("items")
      .where("category", "==", id)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(data);
      });
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} onClick={handleClick}>
        <Typography variant="h3" className={classes.name}>
          {category}
        </Typography>

        <TriangleIcon className={classes.icon} />
      </Paper>

      {items.map((item) => (
        <DraggableCard type="item" {...item} key={`item-${item.id}`} />
      ))}
    </React.Fragment>
  );
}
