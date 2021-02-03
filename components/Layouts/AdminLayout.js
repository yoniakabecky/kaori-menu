import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import BottomNav from "./BottomNav";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    margin: "56px auto",
    padding: "2rem 0",
    backgroundColor: "#4F4F4F",
    overflowY: "scroll",
    minHeight: "calc(100vh - 56px - 56px)",
  },
  title: {
    marginBottom: "2rem",
    textAlign: "center",
  },
}));

export default function AdminLayout({ children, pageTitle }) {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <React.Fragment>
      <TopNav isAdmin={true} openMenu={openMenu} setOpenMenu={setOpenMenu} />

      <Container component="main" className={classes.container}>
        <Typography
          variant="h2"
          color="textSecondary"
          className={classes.title}
        >
          {pageTitle}
        </Typography>

        {children}
      </Container>

      <BottomNav />

      <SwipeableDrawer
        anchor="right"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        onOpen={() => setOpenMenu(true)}
      >
        <SideNav />
      </SwipeableDrawer>
    </React.Fragment>
  );
}
