import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

import ItemDisplay from "./ItemDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
  },
  filter: {
    padding: "0 0.5rem",
    width: "100%",
    color: theme.palette.text.secondary,
  },
  category: {
    margin: "1.5rem 0 0.5rem",
  },
}));

export default function MenuPage({ categories }) {
  const classes = useStyles();
  const [filter, setFilter] = React.useState("");

  return (
    <div className={classes.root}>
      <Input
        value={filter}
        placeholder="Search Items..."
        className={classes.filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {categories.map(({ id, name, items }) => (
        <div key={id}>
          <Typography
            variant="h4"
            color="textSecondary"
            className={classes.category}
          >
            {name}
          </Typography>

          {items.map((item) => (
            <ItemDisplay
              {...item}
              key={item.id}
              category={id}
              filter={filter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
