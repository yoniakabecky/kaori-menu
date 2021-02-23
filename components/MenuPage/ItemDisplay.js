import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

import { getItemsByCategory, updateDisplay } from "@@/utils/handlers";
import { MainContext } from "@@/context/MainContext";
import { UPDATE_ITEMS } from "@@/context/types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "0.5rem auto",
    borderRadius: 5,
    padding: "0.25rem 0.5rem",
    backgroundColor: theme.palette.background.secondary,
  },
  name: {
    marginLeft: "0.5rem",
    flexGrow: 1,
    textTransform: "capitalize",
  },
}));

export default function ItemDisplay({
  id,
  name,
  order,
  display,
  category,
  filter,
}) {
  const classes = useStyles();
  const { dispatch } = React.useContext(MainContext);

  const handleUpdate = async (e) => {
    const res = await updateDisplay(id, e.target.checked);
    const items = await getItemsByCategory(category);

    if (res && items) {
      dispatch({
        type: UPDATE_ITEMS,
        payload: {
          category,
          items,
        },
      });
    } else {
      console.error("something went wrong");
    }
  };

  const checkFilter = () => {
    if (filter !== "") return name.toLowerCase().includes(filter.toLowerCase());

    return true;
  };

  return (
    checkFilter() && (
      <div className={classes.root}>
        <Typography className={classes.order} color="secondary">
          {order}
        </Typography>

        <Typography className={classes.name}>{name}</Typography>

        <Switch
          checked={display}
          name={name}
          size="small"
          onChange={handleUpdate}
        />
      </div>
    )
  );
}
