import Head from "next/head";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.secondary,
    minHeight: "calc(100vh - 56px - 144px)",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>Menu | Kaori Izakaya</title>
      </Head>

      <TopNav />

      <Container component="main" className={classes.container}>
        <Typography variant="h2">Menu Top</Typography>
      </Container>

      <Footer />
    </React.Fragment>
  );
}
