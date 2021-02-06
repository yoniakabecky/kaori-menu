import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { signOut } from "@@/utils/handlers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    backgroundColor: "#4F4F4F",
    width: "16rem",
    height: "100%",
    textAlign: "center",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginTop: "3rem",

    "& a": {
      textDecoration: "none",
      margin: "0.75rem auto",
      fontSize: "1.125rem",
      fontWeight: 700,
      color: theme.palette.text.secondary,
    },
  },
  btn: {
    margin: "1rem auto",
    padding: "0.75rem",
    width: "10rem",
  },
  logo: { margin: "2rem auto" },
}));

export default function SideNav() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box className={classes.links}>
        <Link href="/admin/menu">Admin Top</Link>
        <Link href="/admin/categories">Categories</Link>
        <Link href="/admin/items">Items</Link>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        className={classes.btn}
        onClick={() => router.push("/")}
      >
        Back to Menu
      </Button>

      <Button
        variant="contained"
        color="default"
        className={classes.btn}
        onClick={() => signOut()}
      >
        Log out
      </Button>

      <Box className={classes.logo}>
        <Image src="/static/logo.png" alt="logo" width="138" height="32" />
      </Box>
    </Box>
  );
}
