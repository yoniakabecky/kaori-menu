import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import BottomNav from "./BottomNav";
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
}));

export default function AdminLayout({ children }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TopNav isAdmin={true} />

      <Container component="main" className={classes.container}>
        {children}
      </Container>

      <BottomNav />
    </React.Fragment>
  );
}
