import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { getItemsByCategory } from "@@/utils/handlers";
import TriangleIcon from "../Icons/TriangleIcon";
import DraggableCard from "../DraggableCard";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    margin: "1rem auto",
    padding: "0.5rem 1rem",
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

export default function CategoryList({ name, id }) {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);

  const handleClick = async () => {
    try {
      const data = await getItemsByCategory(id);
      setItems(data);
    } catch (err) {
      console.error("Failed to get items: ", err);
    }
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} onClick={handleClick}>
        <Typography variant="h3" className={classes.name}>
          {name}
        </Typography>

        <TriangleIcon className={classes.icon} />
      </Paper>

      {items.map((item) => (
        <DraggableCard type="item" {...item} key={`item-${item.id}`} />
      ))}
    </React.Fragment>
  );
}
