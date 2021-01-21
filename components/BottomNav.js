import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import FolderIcon from "./icons/FolderIcon";
import FoodMenuIcon from "./icons/FoodMenuIcon";
import ListIcon from "./icons/ListIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    fill: "#828282",
  },

  selected: {
    color: theme.palette.secondary.main,
    fill: theme.palette.secondary.main,
  },
}));

export default function BottomNav() {
  const classes = useStyles();
  const router = useRouter();
  const [page, setPage] = React.useState(router.pathname);

  const handleChange = (_, newPage) => {
    setPage(newPage);
    router.push(newPage);
  };

  return (
    <BottomNavigation
      value={page}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Menu"
        value="/admin/menu"
        icon={<FoodMenuIcon />}
        classes={{ selected: classes.selected }}
      />
      <BottomNavigationAction
        label="Categories"
        value="/admin/categories"
        icon={<FolderIcon />}
        classes={{ selected: classes.selected }}
      />
      <BottomNavigationAction
        label="Items"
        value="/admin/items"
        icon={<ListIcon />}
        classes={{ selected: classes.selected }}
      />
    </BottomNavigation>
  );
}
