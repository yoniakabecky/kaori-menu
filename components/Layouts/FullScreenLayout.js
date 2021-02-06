import Head from "next/head";
import Image from "next/image";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    position: "absolute",
    top: "25vh",
    left: "50%",
    transform: "translateX(-50%)",
  },
  contents: {
    position: "absolute",
    top: "45vh",
    left: "50%",
    transform: "translateX(-50%)",
    layout: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: 600,
    textAlign: "center",
  },
});

export default function FullScreenLayout({ children }) {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Head>
        <title>Admin | Kaori Izakaya</title>
      </Head>

      <div className={classes.logo}>
        <Image src="/static/logo.png" alt="logo" width="216" height="50" />
      </div>

      <div className={classes.contents}>{children}</div>
    </main>
  );
}
